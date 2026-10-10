/**
 * Unit Test Suite for Deterministic Merge Rules (Two Devices Conflict Resolution)
 *
 * Verifies:
 * 1. Saved words union by word, later update wins, deletions use tombstones
 * 2. Read stories union
 * 3. Quiz scores: best score is max, last score is latest attempt, attempts add up
 * 4. Review history & activity log: union by date without double counting
 * 5. Streaks and longest streak recomputed from merged activity log
 * 6. Settings: later update wins
 * 7. Leitner box & next review date: latest review time wins
 */

import {
  mergeSavedWords,
  mergeUserStats,
  mergeAppSettings,
  calculateStreaksFromActivity
} from '../src/firebase/merge';
import { SavedWord, UserStats, AppSettings } from '../src/types';

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`  ✓ ${message}`);
}

console.log('====================================================');
console.log('       DETERMINISTIC MERGE RULES TEST SUITE        ');
console.log('====================================================\n');

// -----------------------------------------------------------------
// TEST 1: Saved words union, later update wins, and tombstones
// -----------------------------------------------------------------
console.log('TEST 1: Saved Words Merge & Tombstone Deletion');

const deviceAWords: SavedWord[] = [
  {
    id: 'w1',
    word: 'pomme',
    lemma: 'pomme',
    en: 'apple',
    bn: 'আপেল',
    pos: 'noun',
    gender: 'feminine',
    sentence: 'Une pomme.',
    storyId: 'au-supermarche',
    storyTitle: 'Au supermarché',
    dateAdded: '2026-10-01T10:00:00Z',
    updatedAt: '2026-10-01T10:00:00Z',
    srsStage: 2,
    nextReviewDate: '2026-10-05T00:00:00Z',
    timesReviewed: 2,
    timesCorrect: 2
  },
  {
    id: 'w2',
    word: 'pain',
    lemma: 'pain',
    en: 'bread (fresh)',
    bn: 'রুটি',
    pos: 'noun',
    sentence: 'Du pain frais.',
    storyId: 'au-supermarche',
    storyTitle: 'Au supermarché',
    dateAdded: '2026-10-01T10:00:00Z',
    updatedAt: '2026-10-05T14:00:00Z', // Device A updated bread later
    srsStage: 3,
    nextReviewDate: '2026-10-12T00:00:00Z',
    lastReviewedDate: '2026-10-05T14:00:00Z',
    timesReviewed: 3,
    timesCorrect: 3
  },
  {
    id: 'w3',
    word: 'fromage',
    lemma: 'fromage',
    en: 'cheese',
    bn: 'পনির',
    pos: 'noun',
    sentence: 'Un fromage.',
    storyId: 'au-supermarche',
    storyTitle: 'Au supermarché',
    dateAdded: '2026-10-01T10:00:00Z',
    updatedAt: '2026-10-02T10:00:00Z',
    deletedAt: '2026-10-06T12:00:00Z', // Device A deleted cheese on Oct 6
    srsStage: 1,
    nextReviewDate: '2026-10-02T00:00:00Z',
    timesReviewed: 1,
    timesCorrect: 1
  }
];

const deviceBWords: SavedWord[] = [
  {
    id: 'w2-b',
    word: 'pain',
    lemma: 'pain',
    en: 'bread',
    bn: 'রুটি',
    pos: 'noun',
    sentence: 'Du pain.',
    storyId: 'au-supermarche',
    storyTitle: 'Au supermarché',
    dateAdded: '2026-10-01T10:00:00Z',
    updatedAt: '2026-10-02T10:00:00Z', // Older than Device A
    srsStage: 1,
    nextReviewDate: '2026-10-03T00:00:00Z',
    lastReviewedDate: '2026-10-02T10:00:00Z',
    timesReviewed: 1,
    timesCorrect: 1
  },
  {
    id: 'w3-b',
    word: 'fromage',
    lemma: 'fromage',
    en: 'cheese',
    bn: 'পনির',
    pos: 'noun',
    sentence: 'Un fromage.',
    storyId: 'au-supermarche',
    storyTitle: 'Au supermarché',
    dateAdded: '2026-10-01T10:00:00Z',
    updatedAt: '2026-10-04T10:00:00Z', // Updated Oct 4, but deleted on Device A Oct 6!
    srsStage: 2,
    nextReviewDate: '2026-10-08T00:00:00Z',
    timesReviewed: 2,
    timesCorrect: 2
  },
  {
    id: 'w4',
    word: 'eau',
    lemma: 'eau',
    en: 'water',
    bn: 'পানি',
    pos: 'noun',
    sentence: 'De l\'eau.',
    storyId: 'au-supermarche',
    storyTitle: 'Au supermarché',
    dateAdded: '2026-10-03T10:00:00Z',
    updatedAt: '2026-10-03T10:00:00Z',
    srsStage: 1,
    nextReviewDate: '2026-10-04T00:00:00Z',
    timesReviewed: 0,
    timesCorrect: 0
  }
];

const mergedWords = mergeSavedWords(deviceAWords, deviceBWords);

assert(mergedWords.length === 4, 'Merged word count is 4 (union of pomme, pain, fromage, eau)');

const painMerged = mergedWords.find(w => w.word === 'pain')!;
assert(painMerged.en === 'bread (fresh)', 'Later update wins for "pain" (en is "bread (fresh)")');
assert(painMerged.srsStage === 3, 'Later Leitner box wins (box 3)');
assert(painMerged.lastReviewedDate === '2026-10-05T14:00:00Z', 'Latest review date preserved');

const fromageMerged = mergedWords.find(w => w.word === 'fromage')!;
assert(!!fromageMerged.deletedAt, 'Tombstone deletion honored for "fromage" (deleted on Oct 6)');

const eauMerged = mergedWords.find(w => w.word === 'eau')!;
assert(eauMerged.word === 'eau' && !eauMerged.deletedAt, 'New word from Device B "eau" added cleanly');

const pommeMerged = mergedWords.find(w => w.word === 'pomme')!;
assert(pommeMerged.word === 'pomme' && !pommeMerged.deletedAt, 'Device A word "pomme" preserved');

// -----------------------------------------------------------------
// TEST 2: Read stories union & Quiz scores resolution
// -----------------------------------------------------------------
console.log('\nTEST 2: Read Stories Union & Quiz Scores Resolution');

const statsA: UserStats = {
  storiesReadIds: ['au-supermarche', 'au-restaurant'],
  totalWordsRead: 400,
  lastActiveDate: '2026-10-08',
  streakDays: 4,
  longestStreak: 4,
  quizScores: {
    'au-supermarche': 80,
    'au-restaurant': 100
  },
  quizHistory: {
    'au-supermarche': {
      bestScore: 80,
      lastScore: 80,
      attempts: 1,
      lastAttemptDate: '2026-10-05'
    },
    'au-restaurant': {
      bestScore: 100,
      lastScore: 100,
      attempts: 2,
      lastAttemptDate: '2026-10-07'
    }
  },
  reviewHistory: [
    { date: '2026-10-05', cardsReviewed: 10, cardsCorrect: 9, accuracyPercentage: 90 }
  ],
  activityLog: {
    '2026-10-05': { reviews: 10, storiesRead: 1, quizzesTaken: 1 },
    '2026-10-06': { reviews: 5, storiesRead: 0, quizzesTaken: 0 },
    '2026-10-07': { reviews: 15, storiesRead: 1, quizzesTaken: 1 },
    '2026-10-08': { reviews: 8, storiesRead: 0, quizzesTaken: 0 }
  },
  recommendedLevel: 'A1',
  hasSeenPlacementPrompt: true
};

const statsB: UserStats = {
  storiesReadIds: ['au-restaurant', 'chez-le-medecin'],
  totalWordsRead: 450,
  lastActiveDate: '2026-10-09',
  streakDays: 2,
  longestStreak: 5,
  quizScores: {
    'au-supermarche': 100, // Higher score on device B!
    'chez-le-medecin': 75
  },
  quizHistory: {
    'au-supermarche': {
      bestScore: 100,
      lastScore: 100,
      attempts: 1,
      lastAttemptDate: '2026-10-06'
    },
    'chez-le-medecin': {
      bestScore: 75,
      lastScore: 75,
      attempts: 1,
      lastAttemptDate: '2026-10-09'
    }
  },
  reviewHistory: [
    { date: '2026-10-06', cardsReviewed: 12, cardsCorrect: 11, accuracyPercentage: 92 },
    { date: '2026-10-09', cardsReviewed: 10, cardsCorrect: 10, accuracyPercentage: 100 }
  ],
  activityLog: {
    '2026-10-06': { reviews: 12, storiesRead: 0, quizzesTaken: 1 },
    '2026-10-08': { reviews: 5, storiesRead: 0, quizzesTaken: 0 },
    '2026-10-09': { reviews: 10, storiesRead: 1, quizzesTaken: 1 }
  },
  recommendedLevel: 'A2',
  hasSeenPlacementPrompt: true
};

const mergedStats = mergeUserStats(statsA, statsB);

assert(
  mergedStats.storiesReadIds.length === 3 &&
  mergedStats.storiesReadIds.includes('au-supermarche') &&
  mergedStats.storiesReadIds.includes('au-restaurant') &&
  mergedStats.storiesReadIds.includes('chez-le-medecin'),
  'Read stories is union of both devices (3 stories)'
);

assert(mergedStats.quizScores['au-supermarche'] === 100, 'Best score is max (100 for au-supermarche)');
assert(mergedStats.quizHistory['au-supermarche'].attempts === 2, 'Quiz attempts sum (1 + 1 = 2)');
assert(mergedStats.quizHistory['au-supermarche'].lastAttemptDate === '2026-10-06', 'Last attempt date is newer (Oct 6)');

// -----------------------------------------------------------------
// TEST 3: Review history & Activity log union without double counting
// -----------------------------------------------------------------
console.log('\nTEST 3: Review History & Activity Log Union');

assert(mergedStats.reviewHistory.length === 3, 'Review history merged cleanly by date (3 distinct dates)');
const oct6Review = mergedStats.reviewHistory.find(r => r.date === '2026-10-06')!;
assert(oct6Review.cardsReviewed === 12, 'Cards reviewed deduplicated and max taken');

assert(Object.keys(mergedStats.activityLog).length === 5, 'Activity log contains union of 5 dates (Oct 5, 6, 7, 8, 9)');

// -----------------------------------------------------------------
// TEST 4: Streaks recomputed accurately from merged activity log
// -----------------------------------------------------------------
console.log('\nTEST 4: Streaks Recomputation from Activity Log');

// Active dates: Oct 5, 6, 7, 8, 9 (5 consecutive days!)
// If today is 2026-10-09, streak should be 5 days!
const streaks = calculateStreaksFromActivity(mergedStats.activityLog, '2026-10-09');
assert(streaks.currentStreak === 5, 'Current streak recomputed as 5 consecutive days');
assert(streaks.longestStreak === 5, 'Longest streak recomputed as 5 days');

// -----------------------------------------------------------------
// TEST 5: Settings merge with later timestamp winning
// -----------------------------------------------------------------
console.log('\nTEST 5: App Settings Conflict Resolution');

const settingsA: AppSettings = {
  playbackRate: 0.85,
  fontSize: 'large',
  lineSpacing: 'relaxed',
  theme: 'sepia',
  showParallelTranslation: true,
  activeLanguageTab: 'both',
  dailyReviewLimit: 30,
  dailyNewWordsLimit: 15,
  playEnglishAudio: true
};

const settingsB: AppSettings = {
  playbackRate: 1.0,
  fontSize: 'small',
  lineSpacing: 'normal',
  theme: 'dark',
  showParallelTranslation: false,
  activeLanguageTab: 'bn',
  dailyReviewLimit: 20,
  dailyNewWordsLimit: 10,
  playEnglishAudio: false
};

const mergedSettings = mergeAppSettings(
  settingsA,
  settingsB,
  '2026-10-08T18:00:00Z', // Settings A is newer
  '2026-10-07T12:00:00Z'  // Settings B is older
);

assert(mergedSettings.fontSize === 'large', 'Later settings timestamp wins (large font size)');
assert(mergedSettings.theme === 'sepia', 'Later theme wins (sepia)');
assert(mergedSettings.dailyReviewLimit === 30, 'Later daily review limit wins (30)');

console.log('\n====================================================');
console.log('       ALL DETERMINISTIC MERGE TESTS PASSED!       ');
console.log('====================================================\n');
