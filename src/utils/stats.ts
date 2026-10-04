import { Story, SavedWord, UserStats, StoryRecommendation, CEFRLevel } from '../types';

/**
 * Normalizes a date to YYYY-MM-DD
 */
export function formatDayKey(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

/**
 * Computes 16 weeks of days (112 days) ending today for the activity heatmap.
 */
export interface HeatmapDay {
  date: string;
  dayOfWeek: number; // 0 (Sun) to 6 (Sat)
  totalActivity: number; // sum of reviews, stories, quizzes
  level: 0 | 1 | 2 | 3 | 4; // intensity level for color
  reviews: number;
  storiesRead: number;
  quizzes: number;
}

export function generate16WeekHeatmap(activityLog: UserStats['activityLog']): HeatmapDay[] {
  const days: HeatmapDay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // We want 16 full weeks ending this Saturday or today
  // 16 weeks = 112 days
  const totalDays = 112;

  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = formatDayKey(d);
    const log = activityLog?.[dateStr] || { reviews: 0, storiesRead: 0, quizzesTaken: 0 };
    const totalActivity = log.reviews + log.storiesRead * 5 + log.quizzesTaken * 3;

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (totalActivity === 0) level = 0;
    else if (totalActivity <= 5) level = 1;
    else if (totalActivity <= 15) level = 2;
    else if (totalActivity <= 30) level = 3;
    else level = 4;

    days.push({
      date: dateStr,
      dayOfWeek: d.getDay(),
      totalActivity,
      level,
      reviews: log.reviews,
      storiesRead: log.storiesRead,
      quizzes: log.quizzesTaken
    });
  }

  return days;
}

/**
 * Computes "This Week" (last 7 days) summary
 */
export function getThisWeekSummary(activityLog: UserStats['activityLog']): {
  daysActive: number;
  cardsReviewed: number;
  storiesRead: number;
  quizzesTaken: number;
} {
  const today = new Date();
  let daysActive = 0;
  let cardsReviewed = 0;
  let storiesRead = 0;
  let quizzesTaken = 0;

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = formatDayKey(d);
    const log = activityLog?.[dateStr];
    if (log && (log.reviews > 0 || log.storiesRead > 0 || log.quizzesTaken > 0)) {
      daysActive++;
      cardsReviewed += log.reviews;
      storiesRead += log.storiesRead;
      quizzesTaken += log.quizzesTaken;
    }
  }

  return { daysActive, cardsReviewed, storiesRead, quizzesTaken };
}

/**
 * Computes 30-day review volume for the SVG bar chart
 */
export interface DailyReviewData {
  date: string;
  dayLabel: string;
  count: number;
}

export function getLast30DaysReviewChart(activityLog: UserStats['activityLog']): DailyReviewData[] {
  const data: DailyReviewData[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = formatDayKey(d);
    const log = activityLog?.[dateStr];
    const count = log?.reviews || 0;
    const dayLabel = `${d.getDate()}/${d.getMonth() + 1}`;

    data.push({ date: dateStr, dayLabel, count });
  }

  return data;
}

/**
 * Organic story recommender following the user's specific rules:
 * - Prefer unread stories.
 * - Rank by how many of user's Boîte 1-2 words appear in the story.
 * - Only suggest stories at user's recommended level or one level above.
 * - Shows WHY ("Contains 4 of your words: ...").
 */
export function getRecommendedStory(
  stories: Story[],
  userStats: UserStats,
  savedWords: SavedWord[]
): StoryRecommendation | null {
  if (stories.length === 0) return null;

  // Words currently being learned in Box 1 or Box 2
  const learningWords = savedWords.filter(w => w.srsStage <= 2);
  const learningSet = new Map<string, string>();
  learningWords.forEach(w => {
    learningSet.set(w.word.toLowerCase().trim(), w.word);
    if (w.lemma) {
      learningSet.set(w.lemma.toLowerCase().trim(), w.lemma);
    }
  });

  const levelHierarchy: Record<CEFRLevel, number> = { A1: 1, A2: 2, B1: 3 };
  const userLevelNum = levelHierarchy[userStats.recommendedLevel || 'A1'];

  // Candidate stories: matching level or 1 level above
  const candidateStories = stories.filter(story => {
    const storyLevelNum = levelHierarchy[story.level] || 1;
    return storyLevelNum <= userLevelNum + 1;
  });

  // Calculate score for each story
  const scoredStories = candidateStories.map(story => {
    const isUnread = !userStats.storiesReadIds.includes(story.id);

    // Find overlapping words from Box 1-2
    const matched: string[] = [];
    Object.keys(story.vocabulary).forEach(vocabKey => {
      const cleanKey = vocabKey.toLowerCase();
      if (learningSet.has(cleanKey)) {
        const originalWord = learningSet.get(cleanKey)!;
        if (!matched.includes(originalWord)) {
          matched.push(originalWord);
        }
      }
    });

    // Ranking score: unread gets large boost (+100), plus 10 per matched word
    const score = (isUnread ? 100 : 0) + matched.length * 10;

    return {
      story,
      isUnread,
      matched,
      score
    };
  });

  // Sort descending by score
  scoredStories.sort((a, b) => b.score - a.score);
  const best = scoredStories[0];
  if (!best) return null;

  // Build human-friendly explanation string
  let reason = '';
  if (best.matched.length > 0) {
    const sampleWords = best.matched.slice(0, 4).join(', ');
    reason = `Contient ${best.matched.length} de vos mots en apprentissage (Boîte 1-2) : ${sampleWords}${best.matched.length > 4 ? '...' : ''}.`;
  } else if (best.isUnread) {
    reason = `Nouvelle histoire à votre niveau (${best.story.level}) prête à être découverte.`;
  } else {
    reason = `Histoire recommandée pour consolider votre vocabulaire pratique.`;
  }

  return {
    story: best.story,
    matchedWords: best.matched,
    reason
  };
}

/**
 * Calculates overall review accuracy across all recorded history
 */
export function calculateOverallAccuracy(reviewHistory: UserStats['reviewHistory']): number {
  if (!reviewHistory || reviewHistory.length === 0) return 0;
  const totalReviewed = reviewHistory.reduce((acc, h) => acc + h.cardsReviewed, 0);
  const totalCorrect = reviewHistory.reduce((acc, h) => acc + h.cardsCorrect, 0);
  if (totalReviewed === 0) return 0;
  return Math.round((totalCorrect / totalReviewed) * 100);
}

/**
 * Calculates average quiz score across all completed quizzes
 */
export function calculateAverageQuizScore(quizHistory: UserStats['quizHistory']): number {
  if (!quizHistory) return 0;
  const records = Object.values(quizHistory);
  if (records.length === 0) return 0;
  const sum = records.reduce((acc, r) => acc + r.bestScore, 0);
  return Math.round(sum / records.length);
}
