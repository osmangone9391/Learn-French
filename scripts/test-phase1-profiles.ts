/**
 * Data Safety and Account Isolation Test Suite
 *
 * Verifies:
 * 1. Guest data safety: Pre-existing data under canonical keys (lirefacile_user_stats,
 *    lirefacile_saved_words, lirefacile_settings) is preserved with zero loss or renaming.
 * 2. Account data isolation: Signed-in account cache uses __<uid> and is completely separated
 *    from guest data and from other accounts.
 * 3. Sign-out cleanup: Clears only that account's cached keys, leaving guest data untouched.
 * 4. Guest migration: Safely merges browser guest progress into the account without overwriting.
 * 5. Legacy backup import: Restores into active learner cache without errors.
 */

const storageMap = new Map<string, string>();
(global as any).localStorage = {
  getItem: (k: string) => storageMap.get(k) ?? null,
  setItem: (k: string, v: string) => storageMap.set(k, String(v)),
  removeItem: (k: string) => storageMap.delete(k),
  clear: () => storageMap.clear(),
  get length() { return storageMap.size; },
  key: (i: number) => Array.from(storageMap.keys())[i] ?? null
};

import {
  getSavedWords,
  saveWord,
  getUserStats,
  markStoryAsRead,
  getAppSettings,
  updateAppSettings,
  hasExistingUserData,
  hasGuestData,
  getGuestSavedWords,
  getGuestUserStats,
  getGuestAppSettings,
  setActiveAccountUid,
  clearAccountLocalCache,
  importAllData,
  getStorageKey
} from '../src/utils/storage';
import { mergeSavedWords, mergeUserStats, mergeAppSettings } from '../src/firebase/merge';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${msg}`);
    process.exit(1);
  }
  console.log(`  ✓ ${msg}`);
}

console.log('====================================================');
console.log('     DATA SAFETY & ACCOUNT ISOLATION TEST SUITE     ');
console.log('====================================================\n');

// -----------------------------------------------------------------
// TEST 1: Existing User Data Unchanged (Pre-existing keys before/after)
// -----------------------------------------------------------------
console.log('TEST 1: Existing Guest Data Preservation & Key Stability');

storageMap.clear();
const existingStats = {
  storiesReadIds: ['au-supermarche'],
  totalWordsRead: 180,
  streakDays: 7,
  longestStreak: 14,
  quizScores: { 'au-supermarche': 100 },
  hasSeenPlacementPrompt: true
};
const existingWords = [
  {
    id: 'w1',
    word: 'pomme',
    lemma: 'pomme',
    en: 'apple',
    bn: 'আপেল',
    pos: 'noun',
    gender: 'feminine',
    sentence: 'Une pomme rouge.',
    storyId: 'au-supermarche',
    storyTitle: 'Au supermarché',
    dateAdded: '2026-10-01T00:00:00Z',
    srsStage: 2,
    nextReviewDate: '2026-10-10T00:00:00Z',
    timesReviewed: 3,
    timesCorrect: 3
  }
];
const existingSettings = {
  fontSize: 'large',
  dailyReviewLimit: 25,
  dailyNewWordsLimit: 15
};

// Seed exact canonical keys
storageMap.set('lirefacile_user_stats', JSON.stringify(existingStats));
storageMap.set('lirefacile_saved_words', JSON.stringify(existingWords));
storageMap.set('lirefacile_settings', JSON.stringify(existingSettings));

const keysBefore = Array.from(storageMap.keys()).sort();
console.log('Keys before update:', keysBefore);

assert(hasExistingUserData() === true, 'hasExistingUserData() detects pre-existing data');
assert(hasGuestData() === true, 'hasGuestData() detects guest progress');

// Read stats, words, and settings in guest mode (uid = null)
setActiveAccountUid(null);
const loadedStats = getUserStats();
const loadedWords = getSavedWords();
const loadedSettings = getAppSettings();

assert(loadedStats.streakDays === 7, 'Streak days preserved (7)');
assert(loadedStats.longestStreak === 14, 'Longest streak preserved (14)');
assert(loadedStats.storiesReadIds.includes('au-supermarche'), 'Stories read preserved');
assert(loadedWords.length === 1 && loadedWords[0].word === 'pomme', 'Saved word preserved');
assert(loadedSettings.fontSize === 'large', 'Settings font size preserved (large)');
assert(loadedSettings.dailyReviewLimit === 25, 'Daily review limit preserved (25)');

// Modify guest progress
markStoryAsRead('au-restaurant', 200);
updateAppSettings({ playbackRate: 0.9 });

const keysAfter = Array.from(storageMap.keys()).sort();
console.log('Keys after updating guest mode:', keysAfter);

assert(storageMap.has('lirefacile_user_stats'), 'lirefacile_user_stats key still exists directly');
assert(storageMap.has('lirefacile_saved_words'), 'lirefacile_saved_words key still exists directly');
assert(storageMap.has('lirefacile_settings'), 'lirefacile_settings key still exists directly');

// -----------------------------------------------------------------
// TEST 2: Account Data Isolation (Signed-in Account Cache)
// -----------------------------------------------------------------
console.log('\nTEST 2: Signed-in Account Data Isolation');

const userUid = 'usr_alice_789';
setActiveAccountUid(userUid);

// Verify Alice starts with fresh, isolated data
const aliceWords = getSavedWords(userUid);
const aliceStats = getUserStats(userUid);
const aliceSettings = getAppSettings(userUid);

assert(aliceWords.length === 0, 'Alice has 0 words (does not see guest words)');
assert(aliceStats.storiesReadIds.length === 0, 'Alice has 0 stories read (does not see guest stories)');

// Alice reads a story and saves a word
saveWord({
  word: 'croissant',
  lemma: 'croissant',
  en: 'croissant',
  bn: 'ক্রোয়েসাঁ',
  pos: 'noun',
  sentence: 'Un bon croissant.',
  storyId: 'au-supermarche',
  storyTitle: 'Au supermarché'
}, userUid);

markStoryAsRead('bonjour-voisin', 150, userUid);
updateAppSettings({ fontSize: 'small', theme: 'sepia' }, userUid);

assert(storageMap.has(`lirefacile_saved_words__${userUid}`), `Account key lirefacile_saved_words__${userUid} created`);
assert(storageMap.has(`lirefacile_user_stats__${userUid}`), `Account key lirefacile_user_stats__${userUid} created`);
assert(storageMap.has(`lirefacile_settings__${userUid}`), `Account key lirefacile_settings__${userUid} created`);

// Switch back to Guest mode and verify Guest progress is pristine
setActiveAccountUid(null);
const guestWords = getSavedWords();
const guestStats = getUserStats();

assert(guestWords.length === 1 && guestWords[0].word === 'pomme', 'Guest mode still has only "pomme"');
assert(!guestStats.storiesReadIds.includes('bonjour-voisin'), 'Guest mode did not inherit Alice\'s read stories');

// -----------------------------------------------------------------
// TEST 3: Sign-out Cleanup
// -----------------------------------------------------------------
console.log('\nTEST 3: Account Sign-out Cleanup');

clearAccountLocalCache(userUid);

assert(!storageMap.has(`lirefacile_saved_words__${userUid}`), 'Alice account cache removed on signout');
assert(!storageMap.has(`lirefacile_user_stats__${userUid}`), 'Alice stats cache removed on signout');
assert(!storageMap.has(`lirefacile_settings__${userUid}`), 'Alice settings cache removed on signout');

// Guest keys remain completely untouched
assert(storageMap.has('lirefacile_saved_words'), 'Guest saved words key intact');
assert(storageMap.has('lirefacile_user_stats'), 'Guest stats key intact');
assert(storageMap.has('lirefacile_settings'), 'Guest settings key intact');

// -----------------------------------------------------------------
// TEST 4: Guest Progress Migration on First Sign-in
// -----------------------------------------------------------------
console.log('\nTEST 4: Guest Progress Migration to Account');

const newAccountUid = 'usr_bob_456';
setActiveAccountUid(newAccountUid);

// Pre-existing cloud/account data for Bob
const bobInitialWords = [
  {
    id: 'w-bob',
    word: 'salut',
    lemma: 'salut',
    en: 'hi',
    bn: 'হাই',
    pos: 'interjection' as const,
    sentence: 'Salut !',
    storyId: 'bonjour-voisin',
    storyTitle: 'Bonjour voisin !',
    dateAdded: '2026-10-02T00:00:00Z',
    srsStage: 1,
    nextReviewDate: '2026-10-03T00:00:00Z',
    timesReviewed: 0,
    timesCorrect: 0
  }
];

// Perform safe merge of guest data into Bob's account
const guestWordsForMigration = getGuestSavedWords();
const guestStatsForMigration = getGuestUserStats();
const guestSettingsForMigration = getGuestAppSettings();

const mergedWords = mergeSavedWords(guestWordsForMigration, bobInitialWords);
const mergedStats = mergeUserStats(guestStatsForMigration, getUserStats(newAccountUid));
const mergedSettings = mergeAppSettings(guestSettingsForMigration, getAppSettings(newAccountUid));

storageMap.set(getStorageKey('SAVED_WORDS', newAccountUid), JSON.stringify(mergedWords));
storageMap.set(getStorageKey('STATS', newAccountUid), JSON.stringify(mergedStats));
storageMap.set(getStorageKey('SETTINGS', newAccountUid), JSON.stringify(mergedSettings));

const bobMergedWords = getSavedWords(newAccountUid);
assert(bobMergedWords.some(w => w.word === 'pomme'), 'Guest word "pomme" merged into Bob account');
assert(bobMergedWords.some(w => w.word === 'salut'), 'Bob account word "salut" preserved');
assert(getSavedWords().some(w => w.word === 'pomme'), 'Browser guest word "pomme" was not deleted');

// -----------------------------------------------------------------
// TEST 5: Legacy Backup Import
// -----------------------------------------------------------------
console.log('\nTEST 5: Legacy Backup Import');

const legacyBackup = JSON.stringify({
  version: 4,
  exportDate: '2026-09-01T12:00:00Z',
  savedWords: [
    {
      id: 'legacy-1',
      word: 'café',
      lemma: 'café',
      en: 'coffee',
      bn: 'কফি',
      pos: 'noun',
      sentence: 'Un café.',
      storyId: 'au-restaurant',
      storyTitle: 'Au restaurant',
      dateAdded: '2026-09-01T12:00:00Z',
      srsStage: 1
    }
  ],
  userStats: {
    storiesReadIds: ['au-restaurant'],
    totalWordsRead: 250,
    streakDays: 12,
    longestStreak: 15,
    quizScores: { 'au-restaurant': 100 }
  },
  settings: {
    fontSize: 'xlarge',
    dailyReviewLimit: 30
  }
});

const importRes = importAllData(legacyBackup);
assert(importRes.success === true, 'Legacy backup imported successfully');

console.log('\n====================================================');
console.log('    ALL DATA SAFETY & ISOLATION TESTS PASSED!      ');
console.log('====================================================\n');
