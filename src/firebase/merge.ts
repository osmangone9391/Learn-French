/**
 * Deterministic Cloud & Local Merge Engine
 *
 * Implements deterministic conflict resolution for cross-device sync:
 * - Saved words: Union by word form. Later update time wins. Tombstones (deletedAt) delete words if newer.
 * - Read stories: Union of story IDs.
 * - Quiz scores: Best score is max. Last score is from latest attempt. Attempts sum uniquely.
 * - Review history & Activity log: Union by date/event ID without double counting.
 * - Streaks: Accurately recomputed from the merged activity log.
 * - Settings: Later update wins per field.
 * - Leitner box & Next review date: Record with latest review time wins.
 */

import { SavedWord, UserStats, AppSettings, DayActivity, ReviewHistoryEntry, StoryQuizRecord } from '../types';

/**
 * Calculates current streak and longest streak from an activity log.
 */
export function calculateStreaksFromActivity(
  activityLog: Record<string, DayActivity>,
  referenceDateStr: string = new Date().toISOString().split('T')[0]
): { currentStreak: number; longestStreak: number } {
  const activeDates = Object.entries(activityLog)
    .filter(([_, act]) => (act.reviews || 0) > 0 || (act.storiesRead || 0) > 0 || (act.quizzesTaken || 0) > 0)
    .map(([date]) => date)
    .sort();

  if (activeDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const activeDateSet = new Set(activeDates);

  // Calculate longest streak in historical sequence
  let longestStreak = 0;
  let currentRun = 0;
  let prevDate: Date | null = null;

  for (const dateStr of activeDates) {
    const curDate = new Date(dateStr + 'T00:00:00Z');
    if (!prevDate) {
      currentRun = 1;
    } else {
      const diffMs = curDate.getTime() - prevDate.getTime();
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        currentRun += 1;
      } else if (diffDays > 1) {
        currentRun = 1;
      }
    }
    if (currentRun > longestStreak) {
      longestStreak = currentRun;
    }
    prevDate = curDate;
  }

  // Calculate current streak backwards from referenceDateStr (today) or yesterday
  let streak = 0;
  const today = new Date(referenceDateStr + 'T00:00:00Z');
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let checkDate: Date;
  if (activeDateSet.has(referenceDateStr)) {
    checkDate = today;
  } else if (activeDateSet.has(yesterdayStr)) {
    checkDate = yesterday;
  } else {
    // Inactive today and yesterday -> streak is 0 (or 1 if user just started today)
    return { currentStreak: 0, longestStreak: Math.max(longestStreak, 1) };
  }

  while (true) {
    const dateStr = checkDate.toISOString().split('T')[0];
    if (activeDateSet.has(dateStr)) {
      streak += 1;
      checkDate = new Date(checkDate.getTime() - 24 * 60 * 60 * 1000);
    } else {
      break;
    }
  }

  return {
    currentStreak: Math.max(streak, 1),
    longestStreak: Math.max(longestStreak, streak, 1)
  };
}

/**
 * Merges two arrays of SavedWords (local & cloud) deterministically.
 * Handles tombstones (deletedAt) and conflict resolution by update timestamp.
 */
export function mergeSavedWords(localWords: SavedWord[], cloudWords: SavedWord[]): SavedWord[] {
  const wordMap = new Map<string, SavedWord>();

  // Process all words into a unified map keyed by normalized word form
  const allWords = [...localWords, ...cloudWords];

  for (const item of allWords) {
    const key = (item.word || '').toLowerCase().trim();
    if (!key) continue;

    const existing = wordMap.get(key);
    if (!existing) {
      wordMap.set(key, { ...item });
      continue;
    }

    // Determine the update time of both records
    const itemTime = new Date(item.updatedAt || item.lastReviewedDate || item.dateAdded || 0).getTime();
    const existingTime = new Date(existing.updatedAt || existing.lastReviewedDate || existing.dateAdded || 0).getTime();

    // Check tombstones: deletedAt timestamp
    const itemDeletedTime = item.deletedAt ? new Date(item.deletedAt).getTime() : 0;
    const existingDeletedTime = existing.deletedAt ? new Date(existing.deletedAt).getTime() : 0;

    // Both records might have different review history or Leitner boxes
    const itemReviewTime = item.lastReviewedDate ? new Date(item.lastReviewedDate).getTime() : 0;
    const existingReviewTime = existing.lastReviewedDate ? new Date(existing.lastReviewedDate).getTime() : 0;

    // Determine winning Leitner box & review stats: later review time wins
    let winningSrsStage = existing.srsStage;
    let winningNextReview = existing.nextReviewDate;
    let winningTimesReviewed = Math.max(existing.timesReviewed || 0, item.timesReviewed || 0);
    let winningTimesCorrect = Math.max(existing.timesCorrect || 0, item.timesCorrect || 0);
    let winningLastReviewed = existing.lastReviewedDate;

    if (itemReviewTime > existingReviewTime) {
      winningSrsStage = item.srsStage;
      winningNextReview = item.nextReviewDate;
      winningLastReviewed = item.lastReviewedDate;
    }

    // Determine if item or existing has the overall later update
    const isItemNewer = itemTime >= existingTime;
    const baseWin = isItemNewer ? { ...item } : { ...existing };

    // Apply the review stats
    baseWin.srsStage = winningSrsStage;
    baseWin.nextReviewDate = winningNextReview;
    baseWin.timesReviewed = winningTimesReviewed;
    baseWin.timesCorrect = winningTimesCorrect;
    baseWin.lastReviewedDate = winningLastReviewed || baseWin.lastReviewedDate;

    // Check if the most recent action was a deletion
    const maxActiveUpdateTime = Math.max(
      item.deletedAt ? 0 : itemTime,
      existing.deletedAt ? 0 : existingTime
    );
    const maxDeletionTime = Math.max(itemDeletedTime, existingDeletedTime);

    if (maxDeletionTime > maxActiveUpdateTime) {
      // The deletion is newer than the last active update -> record is tombstoned
      baseWin.deletedAt = new Date(maxDeletionTime).toISOString();
    } else {
      // An update happened after or at the same time as deletion -> resurrection/active
      delete baseWin.deletedAt;
    }

    baseWin.updatedAt = new Date(Math.max(itemTime, existingTime, maxDeletionTime)).toISOString();
    wordMap.set(key, baseWin);
  }

  // Return list of words (including or excluding tombstones)
  return Array.from(wordMap.values());
}

/**
 * Merges UserStats deterministically.
 */
export function mergeUserStats(localStats: UserStats, cloudStats: UserStats): UserStats {
  // 1. Stories read: union
  const storiesReadSet = new Set<string>([
    ...(localStats.storiesReadIds || []),
    ...(cloudStats.storiesReadIds || [])
  ]);
  const storiesReadIds = Array.from(storiesReadSet);

  // 2. Quiz scores & history
  const quizScores: Record<string, number> = { ...(cloudStats.quizScores || {}), ...(localStats.quizScores || {}) };
  const quizHistory: Record<string, StoryQuizRecord> = {};

  const allStoryQuizKeys = new Set<string>([
    ...Object.keys(localStats.quizHistory || {}),
    ...Object.keys(cloudStats.quizHistory || {}),
    ...Object.keys(quizScores)
  ]);

  for (const storyId of allStoryQuizKeys) {
    const lHist = localStats.quizHistory?.[storyId];
    const cHist = cloudStats.quizHistory?.[storyId];

    if (lHist && cHist) {
      const bestScore = Math.max(lHist.bestScore, cHist.bestScore);
      const lDate = new Date(lHist.lastAttemptDate || 0).getTime();
      const cDate = new Date(cHist.lastAttemptDate || 0).getTime();
      const lastScore = lDate >= cDate ? lHist.lastScore : cHist.lastScore;
      const lastAttemptDate = lDate >= cDate ? lHist.lastAttemptDate : cHist.lastAttemptDate;
      const attempts = (lHist.attempts || 1) + (cHist.attempts || 1);

      quizHistory[storyId] = { bestScore, lastScore, attempts, lastAttemptDate };
      quizScores[storyId] = bestScore;
    } else if (lHist) {
      quizHistory[storyId] = { ...lHist };
      quizScores[storyId] = lHist.bestScore;
    } else if (cHist) {
      quizHistory[storyId] = { ...cHist };
      quizScores[storyId] = cHist.bestScore;
    } else {
      const score = quizScores[storyId] || 0;
      quizHistory[storyId] = {
        bestScore: score,
        lastScore: score,
        attempts: 1,
        lastAttemptDate: new Date().toISOString().split('T')[0]
      };
    }
  }

  // 3. Activity log: union and combine stats per date
  const activityLog: Record<string, DayActivity> = {};
  const allDates = new Set<string>([
    ...Object.keys(localStats.activityLog || {}),
    ...Object.keys(cloudStats.activityLog || {})
  ]);

  for (const date of allDates) {
    const lAct = localStats.activityLog?.[date] || { reviews: 0, storiesRead: 0, quizzesTaken: 0 };
    const cAct = cloudStats.activityLog?.[date] || { reviews: 0, storiesRead: 0, quizzesTaken: 0 };

    activityLog[date] = {
      reviews: Math.max(lAct.reviews || 0, cAct.reviews || 0),
      storiesRead: Math.max(lAct.storiesRead || 0, cAct.storiesRead || 0),
      quizzesTaken: Math.max(lAct.quizzesTaken || 0, cAct.quizzesTaken || 0)
    };
  }

  // 4. Review history: union by date (deduplicating entries)
  const reviewHistoryMap = new Map<string, ReviewHistoryEntry>();
  for (const entry of cloudStats.reviewHistory || []) {
    reviewHistoryMap.set(entry.date, { ...entry });
  }
  for (const entry of localStats.reviewHistory || []) {
    const existing = reviewHistoryMap.get(entry.date);
    if (!existing) {
      reviewHistoryMap.set(entry.date, { ...entry });
    } else {
      // Pick higher cards reviewed or average accuracy
      const cardsReviewed = Math.max(existing.cardsReviewed, entry.cardsReviewed);
      const cardsCorrect = Math.max(existing.cardsCorrect, entry.cardsCorrect);
      reviewHistoryMap.set(entry.date, {
        date: entry.date,
        cardsReviewed,
        cardsCorrect,
        accuracyPercentage: cardsReviewed > 0 ? Math.round((cardsCorrect / cardsReviewed) * 100) : 100
      });
    }
  }
  const reviewHistory = Array.from(reviewHistoryMap.values()).sort((a, b) => a.date.localeCompare(b.date));

  // 5. Streaks: accurately recomputed from merged activity log
  const todayStr = new Date().toISOString().split('T')[0];
  const { currentStreak, longestStreak } = calculateStreaksFromActivity(activityLog, todayStr);

  // 6. Placement test result
  const lPlaceDate = localStats.placementResult?.date ? new Date(localStats.placementResult.date).getTime() : 0;
  const cPlaceDate = cloudStats.placementResult?.date ? new Date(cloudStats.placementResult.date).getTime() : 0;
  const placementResult = lPlaceDate >= cPlaceDate
    ? (localStats.placementResult || cloudStats.placementResult)
    : (cloudStats.placementResult || localStats.placementResult);

  // 7. Recommended level
  const recommendedLevel = placementResult?.level || localStats.recommendedLevel || cloudStats.recommendedLevel || 'A1';

  return {
    storiesReadIds,
    totalWordsRead: Math.max(localStats.totalWordsRead || 0, cloudStats.totalWordsRead || 0),
    lastActiveDate: (localStats.lastActiveDate || '') > (cloudStats.lastActiveDate || '')
      ? localStats.lastActiveDate
      : (cloudStats.lastActiveDate || localStats.lastActiveDate || todayStr),
    streakDays: currentStreak,
    longestStreak: Math.max(longestStreak, localStats.longestStreak || 0, cloudStats.longestStreak || 0),
    quizScores,
    quizHistory,
    reviewHistory,
    activityLog,
    placementResult,
    hasSeenPlacementPrompt: !!(localStats.hasSeenPlacementPrompt || cloudStats.hasSeenPlacementPrompt),
    recommendedLevel
  };
}

/**
 * Merges AppSettings deterministically.
 * Later updatedAt timestamp wins field-by-field.
 */
export function mergeAppSettings(
  localSettings: AppSettings,
  cloudSettings: AppSettings,
  localTimestamp?: string,
  cloudTimestamp?: string
): AppSettings {
  const lTime = localTimestamp ? new Date(localTimestamp).getTime() : 0;
  const cTime = cloudTimestamp ? new Date(cloudTimestamp).getTime() : 0;

  // Primary preference to whichever has later timestamp
  const primary = lTime >= cTime ? localSettings : cloudSettings;
  const fallback = lTime >= cTime ? cloudSettings : localSettings;

  return {
    playbackRate: primary.playbackRate ?? fallback.playbackRate ?? 0.85,
    fontSize: primary.fontSize ?? fallback.fontSize ?? 'medium',
    lineSpacing: primary.lineSpacing ?? fallback.lineSpacing ?? 'normal',
    theme: primary.theme ?? fallback.theme,
    showParallelTranslation: primary.showParallelTranslation ?? fallback.showParallelTranslation ?? false,
    activeLanguageTab: primary.activeLanguageTab ?? fallback.activeLanguageTab ?? 'both',
    dailyReviewLimit: primary.dailyReviewLimit ?? fallback.dailyReviewLimit ?? 20,
    dailyNewWordsLimit: primary.dailyNewWordsLimit ?? fallback.dailyNewWordsLimit ?? 10,
    preferredVoiceURI: primary.preferredVoiceURI ?? fallback.preferredVoiceURI,
    playEnglishAudio: primary.playEnglishAudio ?? fallback.playEnglishAudio ?? true
  };
}
