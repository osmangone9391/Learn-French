import {
  SavedWord,
  UserStats,
  AppSettings,
  ReviewHistoryEntry,
  StoryQuizRecord,
  CEFRLevel,
  PlacementResult,
  Story,
  ReportedVocabItem
} from '../types';

const STORAGE_KEYS = {
  SAVED_WORDS: 'lirefacile_saved_words',
  STATS: 'lirefacile_user_stats',
  SETTINGS: 'lirefacile_settings',
  CUSTOM_STORIES: 'lirefacile_custom_stories',
  GEMINI_API_KEY: 'lirefacile_gemini_api_key',
  REPORTED_VOCAB: 'lirefacile_reported_vocab'
} as const;

const DEFAULT_SETTINGS: AppSettings = {
  playbackRate: 0.85,
  fontSize: 'medium',
  showParallelTranslation: false,
  activeLanguageTab: 'both',
  dailyReviewLimit: 20,
  dailyNewWordsLimit: 10,
  playEnglishAudio: true
};

const DEFAULT_STATS: UserStats = {
  storiesReadIds: [],
  totalWordsRead: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  streakDays: 1,
  longestStreak: 1,
  quizScores: {},
  quizHistory: {},
  reviewHistory: [],
  activityLog: {},
  recommendedLevel: 'A1',
  hasSeenPlacementPrompt: false
};

/**
 * Migrates older saved words to ensure 1-based Leitner boxes and required fields.
 */
function migrateSavedWords(words: any[]): SavedWord[] {
  return words.map(w => {
    let stage = typeof w.srsStage === 'number' ? w.srsStage : 1;
    if (stage < 1) stage = 1;
    if (stage > 5) stage = 5;

    return {
      ...w,
      srsStage: stage,
      nextReviewDate: w.nextReviewDate || new Date().toISOString(),
      timesReviewed: typeof w.timesReviewed === 'number' ? w.timesReviewed : 0,
      timesCorrect: typeof w.timesCorrect === 'number' ? w.timesCorrect : 0
    };
  });
}

/**
 * Migrates UserStats for Milestone 3 (quizHistory, activityLog, longestStreak)
 */
function migrateUserStats(stats: any): UserStats {
  const base = { ...DEFAULT_STATS, ...stats };

  if (!base.quizHistory) base.quizHistory = {};
  if (!base.activityLog) base.activityLog = {};
  if (!base.reviewHistory) base.reviewHistory = [];
  if (!base.recommendedLevel) base.recommendedLevel = 'A1';
  if (typeof base.longestStreak !== 'number') {
    base.longestStreak = Math.max(1, base.streakDays || 1);
  }

  // Populate quizHistory from existing quizScores if needed
  if (base.quizScores) {
    Object.entries(base.quizScores).forEach(([storyId, score]) => {
      const numScore = Number(score);
      if (!base.quizHistory[storyId]) {
        base.quizHistory[storyId] = {
          bestScore: numScore,
          lastScore: numScore,
          attempts: 1,
          lastAttemptDate: base.lastActiveDate || new Date().toISOString().split('T')[0]
        };
      }
    });
  }

  return base;
}

export function getSavedWords(): SavedWord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_WORDS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return migrateSavedWords(parsed);
  } catch (error) {
    console.error('Failed to load saved words from localStorage:', error);
    return [];
  }
}

export function saveWord(
  item: {
    word: string;
    lemma: string;
    en: string;
    bn: string;
    pos: SavedWord['pos'];
    sentence: string;
    storyId: string;
    storyTitle: string;
    gender?: SavedWord['gender'];
    number?: SavedWord['number'];
    person?: string;
    tense?: string;
    lemmaWithArticle?: string;
  }
): { success: boolean; isNew: boolean; item: SavedWord } {
  try {
    const words = getSavedWords();
    const cleanKey = item.lemma.toLowerCase().trim() || item.word.toLowerCase().trim();
    const existingIndex = words.findIndex(
      w => w.lemma.toLowerCase().trim() === cleanKey || w.word.toLowerCase().trim() === cleanKey
    );

    const now = new Date();
    const nextReview = new Date(now);

    let savedItem: SavedWord;

    if (existingIndex >= 0) {
      const isPluralArt = item.pos === 'article' && (item.number === 'plural' || item.word.toLowerCase() === 'les' || item.word.toLowerCase() === 'des');
      const isNum = item.pos === 'number';

      savedItem = {
        ...words[existingIndex],
        pos: item.pos || words[existingIndex].pos,
        sentence: item.sentence || words[existingIndex].sentence,
        storyId: item.storyId || words[existingIndex].storyId,
        storyTitle: item.storyTitle || words[existingIndex].storyTitle,
        gender: isPluralArt || isNum ? undefined : (item.gender ?? words[existingIndex].gender),
        number: isNum ? undefined : (isPluralArt ? 'plural' : (item.number ?? words[existingIndex].number)),
        person: item.person || words[existingIndex].person,
        tense: item.tense || words[existingIndex].tense,
        lemmaWithArticle: item.lemmaWithArticle || words[existingIndex].lemmaWithArticle
      };
      words[existingIndex] = savedItem;
    } else {
      const isPluralArt = item.pos === 'article' && (item.number === 'plural' || item.word.toLowerCase() === 'les' || item.word.toLowerCase() === 'des');
      const isNum = item.pos === 'number';

      savedItem = {
        id: `vocab_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        word: item.word,
        lemma: item.lemma,
        en: item.en,
        bn: item.bn,
        pos: item.pos,
        sentence: item.sentence,
        storyId: item.storyId,
        storyTitle: item.storyTitle,
        dateAdded: now.toISOString(),
        srsStage: 1,
        nextReviewDate: nextReview.toISOString(),
        timesReviewed: 0,
        timesCorrect: 0,
        gender: isPluralArt || isNum ? undefined : item.gender,
        number: isNum ? undefined : (isPluralArt ? 'plural' : item.number),
        person: item.person,
        tense: item.tense,
        lemmaWithArticle: item.lemmaWithArticle
      };
      words.unshift(savedItem);
    }

    localStorage.setItem(STORAGE_KEYS.SAVED_WORDS, JSON.stringify(words));
    return { success: true, isNew: existingIndex === -1, item: savedItem };
  } catch (error) {
    console.error('Failed to save word in localStorage:', error);
    return {
      success: false,
      isNew: false,
      item: {
        id: 'temp',
        ...item,
        dateAdded: new Date().toISOString(),
        srsStage: 1,
        nextReviewDate: new Date().toISOString(),
        timesReviewed: 0,
        timesCorrect: 0
      }
    };
  }
}

export function updateBatchSavedWords(updatedList: SavedWord[]): boolean {
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_WORDS, JSON.stringify(updatedList));
    return true;
  } catch (error) {
    console.error('Failed to batch update saved words:', error);
    return false;
  }
}

export function removeSavedWord(id: string): boolean {
  try {
    const words = getSavedWords().filter(w => w.id !== id);
    localStorage.setItem(STORAGE_KEYS.SAVED_WORDS, JSON.stringify(words));
    return true;
  } catch (error) {
    console.error('Failed to remove saved word from localStorage:', error);
    return false;
  }
}

export function isWordSaved(cleanWordOrLemma: string): boolean {
  try {
    const words = getSavedWords();
    const needle = cleanWordOrLemma.toLowerCase().trim();
    return words.some(
      w => w.lemma.toLowerCase().trim() === needle || w.word.toLowerCase().trim() === needle
    );
  } catch {
    return false;
  }
}

export function getUserStats(): UserStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STATS);
    if (!raw) return DEFAULT_STATS;
    const parsed = JSON.parse(raw);
    const stats = migrateUserStats(parsed);

    // Compute streak
    const today = new Date().toISOString().split('T')[0];
    const lastActive = stats.lastActiveDate || today;

    if (lastActive !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (lastActive === yesterdayStr) {
        stats.streakDays = (stats.streakDays || 1) + 1;
      } else {
        stats.streakDays = 1;
      }
      stats.longestStreak = Math.max(stats.longestStreak || 1, stats.streakDays);
      stats.lastActiveDate = today;
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    }

    return stats;
  } catch (error) {
    console.error('Failed to get user stats:', error);
    return DEFAULT_STATS;
  }
}

export function recordActivity(type: 'reviews' | 'storiesRead' | 'quizzesTaken', count: number = 1): UserStats {
  try {
    const stats = getUserStats();
    const today = new Date().toISOString().split('T')[0];

    if (!stats.activityLog) stats.activityLog = {};
    if (!stats.activityLog[today]) {
      stats.activityLog[today] = { reviews: 0, storiesRead: 0, quizzesTaken: 0 };
    }

    stats.activityLog[today][type] += count;
    stats.lastActiveDate = today;

    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    return stats;
  } catch (error) {
    console.error('Failed to record activity:', error);
    return getUserStats();
  }
}

export function markStoryAsRead(storyId: string, wordCount: number): UserStats {
  try {
    const stats = getUserStats();
    const alreadyRead = stats.storiesReadIds.includes(storyId);

    const updatedReadIds = alreadyRead
      ? stats.storiesReadIds
      : [...stats.storiesReadIds, storyId];

    const updatedWords = alreadyRead
      ? stats.totalWordsRead
      : stats.totalWordsRead + wordCount;

    const today = new Date().toISOString().split('T')[0];
    if (!stats.activityLog) stats.activityLog = {};
    if (!stats.activityLog[today]) {
      stats.activityLog[today] = { reviews: 0, storiesRead: 0, quizzesTaken: 0 };
    }
    if (!alreadyRead) {
      stats.activityLog[today].storiesRead += 1;
    }

    const newStats: UserStats = {
      ...stats,
      storiesReadIds: updatedReadIds,
      totalWordsRead: updatedWords,
      lastActiveDate: today
    };

    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(newStats));
    return newStats;
  } catch (error) {
    console.error('Failed to mark story as read in localStorage:', error);
    return getUserStats();
  }
}

export function unmarkStoryAsRead(storyId: string, wordCount: number): UserStats {
  try {
    const stats = getUserStats();
    const updatedReadIds = stats.storiesReadIds.filter(id => id !== storyId);
    const updatedWords = Math.max(0, stats.totalWordsRead - wordCount);

    const newStats: UserStats = {
      ...stats,
      storiesReadIds: updatedReadIds,
      totalWordsRead: updatedWords
    };

    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(newStats));
    return newStats;
  } catch (error) {
    console.error('Failed to unmark story as read:', error);
    return getUserStats();
  }
}

export function recordReviewSession(cardsReviewed: number, cardsCorrect: number): UserStats {
  try {
    const stats = getUserStats();
    const today = new Date().toISOString().split('T')[0];
    const accuracy = cardsReviewed > 0 ? Math.round((cardsCorrect / cardsReviewed) * 100) : 100;

    // Review history
    const existingEntryIndex = stats.reviewHistory.findIndex(h => h.date === today);
    if (existingEntryIndex >= 0) {
      const existing = stats.reviewHistory[existingEntryIndex];
      const totalRev = existing.cardsReviewed + cardsReviewed;
      const totalCor = existing.cardsCorrect + cardsCorrect;
      stats.reviewHistory[existingEntryIndex] = {
        date: today,
        cardsReviewed: totalRev,
        cardsCorrect: totalCor,
        accuracyPercentage: Math.round((totalCor / totalRev) * 100)
      };
    } else {
      stats.reviewHistory.push({
        date: today,
        cardsReviewed,
        cardsCorrect,
        accuracyPercentage: accuracy
      });
    }

    // Activity log
    if (!stats.activityLog) stats.activityLog = {};
    if (!stats.activityLog[today]) {
      stats.activityLog[today] = { reviews: 0, storiesRead: 0, quizzesTaken: 0 };
    }
    stats.activityLog[today].reviews += cardsReviewed;
    stats.lastActiveDate = today;

    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    return stats;
  } catch (error) {
    console.error('Failed to record review session:', error);
    return getUserStats();
  }
}

export function recordQuizScore(storyId: string, score: number): UserStats {
  try {
    const stats = getUserStats();
    const today = new Date().toISOString().split('T')[0];

    // Maintain backwards-compatible quizScores map (keeps best score)
    const previousBest = stats.quizScores[storyId] || 0;
    const bestScore = Math.max(previousBest, score);
    stats.quizScores[storyId] = bestScore;

    // Maintain detailed quizHistory
    const previousHistory = stats.quizHistory?.[storyId];
    if (previousHistory) {
      stats.quizHistory[storyId] = {
        bestScore: Math.max(previousHistory.bestScore, score),
        lastScore: score,
        attempts: previousHistory.attempts + 1,
        lastAttemptDate: today
      };
    } else {
      if (!stats.quizHistory) stats.quizHistory = {};
      stats.quizHistory[storyId] = {
        bestScore: score,
        lastScore: score,
        attempts: 1,
        lastAttemptDate: today
      };
    }

    // Record activity
    if (!stats.activityLog) stats.activityLog = {};
    if (!stats.activityLog[today]) {
      stats.activityLog[today] = { reviews: 0, storiesRead: 0, quizzesTaken: 0 };
    }
    stats.activityLog[today].quizzesTaken += 1;
    stats.lastActiveDate = today;

    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    return stats;
  } catch (error) {
    console.error('Failed to record quiz score:', error);
    return getUserStats();
  }
}

export function savePlacementResult(level: CEFRLevel, score: number, total: number): UserStats {
  try {
    const stats = getUserStats();
    const today = new Date().toISOString().split('T')[0];

    stats.placementResult = {
      level,
      score,
      total,
      date: today
    };
    stats.recommendedLevel = level;
    stats.hasSeenPlacementPrompt = true;
    stats.lastActiveDate = today;

    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    return stats;
  } catch (error) {
    console.error('Failed to save placement result:', error);
    return getUserStats();
  }
}

export function dismissPlacementPrompt(): UserStats {
  try {
    const stats = getUserStats();
    stats.hasSeenPlacementPrompt = true;
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    return stats;
  } catch (error) {
    return getUserStats();
  }
}

export function getAppSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (error) {
    console.error('Failed to get app settings:', error);
    return DEFAULT_SETTINGS;
  }
}

export function updateAppSettings(partial: Partial<AppSettings>): AppSettings {
  try {
    const current = getAppSettings();
    const updated = { ...current, ...partial };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to update app settings:', error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Custom Stories Storage (AI-generated stories)
 */
export function getCustomStories(): Story[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_STORIES);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to get custom stories:', error);
    return [];
  }
}

export function saveCustomStory(story: Story): void {
  try {
    const current = getCustomStories();
    const existingIndex = current.findIndex(s => s.id === story.id);
    if (existingIndex >= 0) {
      current[existingIndex] = story;
    } else {
      current.unshift(story);
    }
    localStorage.setItem(STORAGE_KEYS.CUSTOM_STORIES, JSON.stringify(current));
  } catch (error) {
    console.error('Failed to save custom story:', error);
  }
}

export function deleteCustomStory(storyId: string): void {
  try {
    const current = getCustomStories();
    const filtered = current.filter(s => s.id !== storyId);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_STORIES, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete custom story:', error);
  }
}

/**
 * Gemini API Key Storage
 * Stored strictly in browser localStorage under a dedicated key.
 * Never in logs, never in backup files, never committed to git.
 */
export function getGeminiApiKey(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEYS.GEMINI_API_KEY) || null;
  } catch {
    return null;
  }
}

export function saveGeminiApiKey(key: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.GEMINI_API_KEY, key.trim());
  } catch (error) {
    console.error('Failed to save API key:', error);
  }
}

export function deleteGeminiApiKey(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.GEMINI_API_KEY);
  } catch (error) {
    console.error('Failed to delete API key:', error);
  }
}

/**
 * Reported Vocabulary (for user-flagged AI story errors)
 */
export function getReportedVocab(): ReportedVocabItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REPORTED_VOCAB);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function reportVocabItem(item: Omit<ReportedVocabItem, 'id' | 'dateReported'>): ReportedVocabItem {
  try {
    const items = getReportedVocab();
    const newItem: ReportedVocabItem = {
      ...item,
      id: `report_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      dateReported: new Date().toISOString()
    };
    items.unshift(newItem);
    localStorage.setItem(STORAGE_KEYS.REPORTED_VOCAB, JSON.stringify(items));
    return newItem;
  } catch (error) {
    console.error('Failed to report vocab item:', error);
    return {
      ...item,
      id: `report_${Date.now()}`,
      dateReported: new Date().toISOString()
    };
  }
}

export function deleteReportedVocabItem(id: string): void {
  try {
    const items = getReportedVocab().filter(i => i.id !== id);
    localStorage.setItem(STORAGE_KEYS.REPORTED_VOCAB, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to delete reported vocab item:', error);
  }
}

/**
 * Selects up to 8 of the user's saved words from Box 1 or Box 2,
 * preferring those least recently seen, for inclusion in a personalized story.
 */
export function getWordsForPersonalizedStory(savedWords: SavedWord[], maxWords: number = 8): SavedWord[] {
  const eligible = savedWords.filter(w => w.srsStage === 1 || w.srsStage === 2);
  eligible.sort((a, b) => {
    const aDate = a.lastReviewedDate || a.dateAdded || '';
    const bDate = b.lastReviewedDate || b.dateAdded || '';
    return aDate.localeCompare(bDate);
  });
  return eligible.slice(0, maxWords);
}

/**
 * Backup: Exports all application data into a JSON string.
 * CRITICAL: The user's Gemini API key is intentionally excluded.
 */
export function exportAllData(): string {
  try {
    const backup = {
      version: 4,
      exportDate: new Date().toISOString(),
      savedWords: getSavedWords(),
      userStats: getUserStats(),
      settings: getAppSettings(),
      customStories: getCustomStories(),
      reportedVocab: getReportedVocab()
    };
    return JSON.stringify(backup, null, 2);
  } catch (error) {
    console.error('Failed to export data:', error);
    return '{}';
  }
}

/**
 * Backup: Imports application data from a JSON string with safe validation.
 * CRITICAL: Restores custom stories and progress without touching the user's API key.
 */
export function importAllData(jsonString: string): { success: boolean; message: string } {
  try {
    const data = JSON.parse(jsonString);

    if (!data || typeof data !== 'object') {
      return { success: false, message: 'Invalid JSON backup file' };
    }

    if (Array.isArray(data.savedWords)) {
      localStorage.setItem(STORAGE_KEYS.SAVED_WORDS, JSON.stringify(data.savedWords));
    }

    if (data.userStats && typeof data.userStats === 'object') {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(data.userStats));
    }

    if (data.settings && typeof data.settings === 'object') {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data.settings));
    }

    if (Array.isArray(data.customStories)) {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_STORIES, JSON.stringify(data.customStories));
    }

    if (Array.isArray(data.reportedVocab)) {
      localStorage.setItem(STORAGE_KEYS.REPORTED_VOCAB, JSON.stringify(data.reportedVocab));
    }

    return { success: true, message: 'Data imported successfully!' };
  } catch (error) {
    console.error('Failed to import data:', error);
    return { success: false, message: 'Error reading backup file.' };
  }
}
