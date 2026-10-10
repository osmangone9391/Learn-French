import {
  SavedWord,
  UserStats,
  AppSettings,
  UserProfile,
  ProfilesState,
  ReviewHistoryEntry,
  StoryQuizRecord,
  CEFRLevel,
  PlacementResult,
  Story
} from '../types';

/**
 * Storage keys:
 * - Default profile ('default') continues reading and writing existing canonical keys:
 *     'lirefacile_saved_words', 'lirefacile_user_stats', 'lirefacile_settings'
 * - Additional profiles append '__<profileId>' to the canonical keys:
 *     'lirefacile_saved_words__<profileId>', etc.
 * - Global profiles registry:
 *     'lirefacile_profiles_state'
 */
const BASE_STORAGE_KEYS = {
  SAVED_WORDS: 'lirefacile_saved_words',
  STATS: 'lirefacile_user_stats',
  SETTINGS: 'lirefacile_settings',
  CUSTOM_STORIES: 'lirefacile_custom_stories',
  REPORTED_VOCAB: 'lirefacile_reported_vocab',
  ANONYMOUS_UID: 'lirefacile_anon_uid'
} as const;

export const PROFILES_REGISTRY_KEY = 'lirefacile_profiles_state';

// In-memory active profile / account ID tracker (initialized on startup)
let currentActiveProfileId = 'default';
let currentAccountUid: string | null = null;

export function setActiveAccountUid(uid: string | null): void {
  currentAccountUid = uid;
  currentActiveProfileId = uid || 'default';
}

export function getActiveAccountUid(): string | null {
  return currentAccountUid;
}

export function clearAccountLocalCache(uid: string): void {
  try {
    localStorage.removeItem(`${BASE_STORAGE_KEYS.SAVED_WORDS}__${uid}`);
    localStorage.removeItem(`${BASE_STORAGE_KEYS.STATS}__${uid}`);
    localStorage.removeItem(`${BASE_STORAGE_KEYS.SETTINGS}__${uid}`);
    localStorage.removeItem(`${BASE_STORAGE_KEYS.SETTINGS}__${uid}_updatedAt`);
  } catch (e) {
    console.error('Failed to clear account local cache:', e);
  }
}

export function hasGuestData(): boolean {
  try {
    const rawWords = localStorage.getItem(BASE_STORAGE_KEYS.SAVED_WORDS);
    const rawStats = localStorage.getItem(BASE_STORAGE_KEYS.STATS) || localStorage.getItem('lirefacile_stats');
    if (rawWords) {
      const parsed = JSON.parse(rawWords);
      if (Array.isArray(parsed) && parsed.length > 0) return true;
    }
    if (rawStats) {
      const parsed = JSON.parse(rawStats);
      if (parsed) {
        if (Array.isArray(parsed.storiesReadIds) && parsed.storiesReadIds.length > 0) return true;
        if (parsed.quizScores && Object.keys(parsed.quizScores).length > 0) return true;
        if (parsed.reviewHistory && parsed.reviewHistory.length > 0) return true;
        if (parsed.totalWordsRead > 0) return true;
      }
    }
    return false;
  } catch {
    return false;
  }
}

export function getGuestSavedWords(): SavedWord[] {
  return getSavedWords('default');
}

export function getGuestUserStats(): UserStats {
  return getUserStats('default');
}

export function getGuestAppSettings(): AppSettings {
  return getAppSettings('default');
}

export const DEFAULT_SETTINGS: AppSettings = {
  playbackRate: 0.85,
  fontSize: 'medium',
  lineSpacing: 'normal',
  theme: undefined,
  showParallelTranslation: false,
  activeLanguageTab: 'both',
  dailyReviewLimit: 20,
  dailyNewWordsLimit: 10,
  playEnglishAudio: true
};

export const DEFAULT_STATS: UserStats = {
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
 * Generates the storage key for the given or active profile.
 * When profileId is 'default', returns base key unchanged!
 */
export function getStorageKey(baseKey: keyof typeof BASE_STORAGE_KEYS, profileId?: string): string {
  const resolvedProfileId = profileId !== undefined ? profileId : getActiveProfileId();
  const root = BASE_STORAGE_KEYS[baseKey];
  if (!resolvedProfileId || resolvedProfileId === 'default') {
    return root;
  }
  return `${root}__${resolvedProfileId}`;
}

/**
 * Gets the current active profile ID from state.
 */
export function getActiveProfileId(): string {
  try {
    const raw = localStorage.getItem(PROFILES_REGISTRY_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.activeProfileId) {
        currentActiveProfileId = parsed.activeProfileId;
        return parsed.activeProfileId;
      }
    }
  } catch {}
  return currentActiveProfileId;
}

/**
 * Sets the active profile ID in memory and persists active profile in registry.
 */
export function setActiveProfileId(profileId: string): void {
  currentActiveProfileId = profileId;
  try {
    const raw = localStorage.getItem(PROFILES_REGISTRY_KEY);
    if (raw) {
      const state = JSON.parse(raw);
      state.activeProfileId = profileId;
      saveProfilesState(state);
    }
  } catch (e) {
    console.error('Failed to set active profile id:', e);
  }
}

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

// -------------------------------------------------------------
// PROFILE MANAGEMENT
// -------------------------------------------------------------

/**
 * Checks whether this is an existing browser user with data under original keys.
 */
export function hasExistingUserData(): boolean {
  try {
    return !!(
      localStorage.getItem(BASE_STORAGE_KEYS.STATS) ||
      localStorage.getItem('lirefacile_stats') ||
      localStorage.getItem(BASE_STORAGE_KEYS.SAVED_WORDS) ||
      localStorage.getItem(BASE_STORAGE_KEYS.SETTINGS)
    );
  } catch {
    return false;
  }
}

/**
 * Loads the profiles state registry.
 * If not present, creates default profile "Me" with id "default".
 */
export function getProfilesState(): ProfilesState {
  try {
    const raw = localStorage.getItem(PROFILES_REGISTRY_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.profiles) && parsed.profiles.length > 0) {
        // Ensure active profile exists
        const activeExists = parsed.profiles.some((p: UserProfile) => p.id === parsed.activeProfileId);
        const activeId = activeExists ? parsed.activeProfileId : parsed.profiles[0].id;
        currentActiveProfileId = activeId;
        return {
          profiles: parsed.profiles,
          activeProfileId: activeId,
          hasPromptedInitialName: parsed.hasPromptedInitialName ?? true
        };
      }
    }

    // First time initializing profiles: create default profile "Me"
    const hasData = hasExistingUserData();
    const defaultProfile: UserProfile = {
      id: 'default',
      name: 'Me',
      createdAt: new Date().toISOString()
    };
    const initialState: ProfilesState = {
      profiles: [defaultProfile],
      activeProfileId: 'default',
      // If user had existing data from previous versions, mark prompted as true so they are never asked
      hasPromptedInitialName: hasData
    };
    currentActiveProfileId = 'default';
    localStorage.setItem(PROFILES_REGISTRY_KEY, JSON.stringify(initialState));
    return initialState;
  } catch (e) {
    console.error('Failed to get profiles state:', e);
    const fallback: ProfilesState = {
      profiles: [{ id: 'default', name: 'Me', createdAt: new Date().toISOString() }],
      activeProfileId: 'default'
    };
    currentActiveProfileId = 'default';
    return fallback;
  }
}

export function saveProfilesState(state: ProfilesState): void {
  try {
    localStorage.setItem(PROFILES_REGISTRY_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save profiles state:', e);
  }
}

/**
 * Adds a new profile (up to 5 profiles allowed).
 */
export function addProfile(name: string): { success: boolean; profile?: UserProfile; message?: string } {
  try {
    const state = getProfilesState();
    if (state.profiles.length >= 5) {
      return { success: false, message: 'Maximum of 5 profiles reached on this device.' };
    }
    const cleanName = name.trim();
    if (!cleanName) {
      return { success: false, message: 'Please enter a name for the profile.' };
    }

    const id = 'prof_' + Math.random().toString(36).substring(2, 8) + Date.now().toString(36);
    const newProfile: UserProfile = {
      id,
      name: cleanName,
      createdAt: new Date().toISOString()
    };

    state.profiles.push(newProfile);
    state.activeProfileId = id;
    currentActiveProfileId = id;
    saveProfilesState(state);

    return { success: true, profile: newProfile };
  } catch (e) {
    console.error('Failed to add profile:', e);
    return { success: false, message: 'Could not create profile.' };
  }
}

/**
 * Renames an existing profile.
 */
export function renameProfile(profileId: string, newName: string): boolean {
  try {
    const cleanName = newName.trim();
    if (!cleanName) return false;

    const state = getProfilesState();
    const target = state.profiles.find(p => p.id === profileId);
    if (!target) return false;

    target.name = cleanName;
    saveProfilesState(state);
    return true;
  } catch (e) {
    console.error('Failed to rename profile:', e);
    return false;
  }
}

/**
 * Deletes a profile, wiping ONLY its keys.
 * Cannot delete the last remaining profile.
 */
export function deleteProfile(profileId: string): { success: boolean; newActiveId?: string; message?: string } {
  try {
    const state = getProfilesState();
    if (state.profiles.length <= 1) {
      return { success: false, message: 'Cannot delete the only profile.' };
    }

    // Wipe profile keys
    if (profileId === 'default') {
      localStorage.removeItem(BASE_STORAGE_KEYS.SAVED_WORDS);
      localStorage.removeItem(BASE_STORAGE_KEYS.STATS);
      localStorage.removeItem('lirefacile_stats');
      localStorage.removeItem(BASE_STORAGE_KEYS.SETTINGS);
    } else {
      localStorage.removeItem(`${BASE_STORAGE_KEYS.SAVED_WORDS}__${profileId}`);
      localStorage.removeItem(`${BASE_STORAGE_KEYS.STATS}__${profileId}`);
      localStorage.removeItem(`${BASE_STORAGE_KEYS.SETTINGS}__${profileId}`);
    }

    // Filter out profile
    state.profiles = state.profiles.filter(p => p.id !== profileId);
    if (state.activeProfileId === profileId) {
      state.activeProfileId = state.profiles[0].id;
      currentActiveProfileId = state.profiles[0].id;
    }
    saveProfilesState(state);

    return { success: true, newActiveId: state.activeProfileId };
  } catch (e) {
    console.error('Failed to delete profile:', e);
    return { success: false, message: 'Could not delete profile.' };
  }
}

// -------------------------------------------------------------
// SAVED WORDS (PROFILE-AWARE)
// -------------------------------------------------------------

export function getAllSavedWordsWithTombstones(profileId?: string): SavedWord[] {
  try {
    const key = getStorageKey('SAVED_WORDS', profileId);
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return migrateSavedWords(parsed);
  } catch {
    return [];
  }
}

export function getSavedWords(profileId?: string): SavedWord[] {
  try {
    const key = getStorageKey('SAVED_WORDS', profileId);
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return migrateSavedWords(parsed).filter(w => !w.deletedAt);
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
  },
  profileId?: string
): { success: boolean; isNew: boolean; item: SavedWord } {
  try {
    const words = getSavedWords(profileId);
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
        lemmaWithArticle: item.lemmaWithArticle || words[existingIndex].lemmaWithArticle,
        updatedAt: now.toISOString(),
        deletedAt: undefined
      };
      words[existingIndex] = savedItem;
    } else {
      const isPluralArt = item.pos === 'article' && (item.number === 'plural' || item.word.toLowerCase() === 'les' || item.word.toLowerCase() === 'des');
      const isNum = item.pos === 'number';

      savedItem = {
        id: `word_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        word: item.word,
        lemma: item.lemma,
        en: item.en,
        bn: item.bn,
        pos: item.pos,
        gender: isPluralArt || isNum ? undefined : item.gender,
        number: isNum ? undefined : (isPluralArt ? 'plural' : item.number),
        person: item.person,
        tense: item.tense,
        lemmaWithArticle: item.lemmaWithArticle,
        sentence: item.sentence,
        storyId: item.storyId,
        storyTitle: item.storyTitle,
        dateAdded: now.toISOString(),
        updatedAt: now.toISOString(),
        srsStage: 1,
        nextReviewDate: nextReview.toISOString(),
        timesReviewed: 0,
        timesCorrect: 0
      };
      words.unshift(savedItem);
    }

    const key = getStorageKey('SAVED_WORDS', profileId);
    localStorage.setItem(key, JSON.stringify(words));
    return { success: true, isNew: existingIndex < 0, item: savedItem };
  } catch (error) {
    console.error('Failed to save word to localStorage:', error);
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

export function updateBatchSavedWords(updatedList: SavedWord[], profileId?: string): boolean {
  try {
    const key = getStorageKey('SAVED_WORDS', profileId);
    localStorage.setItem(key, JSON.stringify(updatedList));
    return true;
  } catch (error) {
    console.error('Failed to batch update saved words:', error);
    return false;
  }
}

export function removeSavedWord(id: string, profileId?: string): boolean {
  try {
    const allWords = getAllSavedWordsWithTombstones(profileId);
    const now = new Date().toISOString();
    const updated = allWords.map(w => {
      if (w.id === id) {
        return { ...w, deletedAt: now, updatedAt: now };
      }
      return w;
    });
    const key = getStorageKey('SAVED_WORDS', profileId);
    localStorage.setItem(key, JSON.stringify(updated));
    return true;
  } catch (error) {
    console.error('Failed to remove saved word from localStorage:', error);
    return false;
  }
}

export function isWordSaved(cleanWordOrLemma: string, profileId?: string): boolean {
  try {
    const words = getSavedWords(profileId);
    const needle = cleanWordOrLemma.toLowerCase().trim();
    return words.some(
      w => w.lemma.toLowerCase().trim() === needle || w.word.toLowerCase().trim() === needle
    );
  } catch {
    return false;
  }
}

// -------------------------------------------------------------
// USER STATS (PROFILE-AWARE)
// -------------------------------------------------------------

export function getUserStats(profileId?: string): UserStats {
  try {
    const targetId = profileId !== undefined ? profileId : getActiveProfileId();
    const key = getStorageKey('STATS', targetId);
    let raw = localStorage.getItem(key);

    // Fallback for default profile only: read legacy 'lirefacile_stats' and migrate
    if (!raw && targetId === 'default') {
      const legacyRaw = localStorage.getItem('lirefacile_stats');
      if (legacyRaw) {
        raw = legacyRaw;
        localStorage.setItem(key, legacyRaw);
      }
    }

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
      localStorage.setItem(key, JSON.stringify(stats));
    }

    return stats;
  } catch (error) {
    console.error('Failed to get user stats:', error);
    return DEFAULT_STATS;
  }
}

export function recordActivity(type: 'reviews' | 'storiesRead' | 'quizzesTaken', count: number = 1, profileId?: string): UserStats {
  try {
    const targetId = profileId !== undefined ? profileId : getActiveProfileId();
    const stats = getUserStats(targetId);
    const today = new Date().toISOString().split('T')[0];

    if (!stats.activityLog) stats.activityLog = {};
    if (!stats.activityLog[today]) {
      stats.activityLog[today] = { reviews: 0, storiesRead: 0, quizzesTaken: 0 };
    }

    stats.activityLog[today][type] += count;
    stats.lastActiveDate = today;

    const key = getStorageKey('STATS', targetId);
    localStorage.setItem(key, JSON.stringify(stats));
    return stats;
  } catch (error) {
    console.error('Failed to record activity:', error);
    return getUserStats(profileId);
  }
}

export function markStoryAsRead(storyId: string, wordCount: number, profileId?: string): UserStats {
  try {
    const targetId = profileId !== undefined ? profileId : getActiveProfileId();
    const stats = getUserStats(targetId);
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

    const key = getStorageKey('STATS', targetId);
    localStorage.setItem(key, JSON.stringify(newStats));
    return newStats;
  } catch (error) {
    console.error('Failed to mark story as read in localStorage:', error);
    return getUserStats(profileId);
  }
}

export function unmarkStoryAsRead(storyId: string, wordCount: number, profileId?: string): UserStats {
  try {
    const targetId = profileId !== undefined ? profileId : getActiveProfileId();
    const stats = getUserStats(targetId);
    const updatedReadIds = stats.storiesReadIds.filter(id => id !== storyId);
    const updatedWords = Math.max(0, stats.totalWordsRead - wordCount);

    const newStats: UserStats = {
      ...stats,
      storiesReadIds: updatedReadIds,
      totalWordsRead: updatedWords
    };

    const key = getStorageKey('STATS', targetId);
    localStorage.setItem(key, JSON.stringify(newStats));
    return newStats;
  } catch (error) {
    console.error('Failed to unmark story as read:', error);
    return getUserStats(profileId);
  }
}

export function recordReviewSession(cardsReviewed: number, cardsCorrect: number, profileId?: string): UserStats {
  try {
    const targetId = profileId !== undefined ? profileId : getActiveProfileId();
    const stats = getUserStats(targetId);
    const today = new Date().toISOString().split('T')[0];
    const accuracy = cardsReviewed > 0 ? Math.round((cardsCorrect / cardsReviewed) * 100) : 100;

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

    if (!stats.activityLog) stats.activityLog = {};
    if (!stats.activityLog[today]) {
      stats.activityLog[today] = { reviews: 0, storiesRead: 0, quizzesTaken: 0 };
    }
    stats.activityLog[today].reviews += cardsReviewed;
    stats.lastActiveDate = today;

    const key = getStorageKey('STATS', targetId);
    localStorage.setItem(key, JSON.stringify(stats));
    return stats;
  } catch (error) {
    console.error('Failed to record review session:', error);
    return getUserStats(profileId);
  }
}

export function recordQuizScore(storyId: string, score: number, profileId?: string): UserStats {
  try {
    const targetId = profileId !== undefined ? profileId : getActiveProfileId();
    const stats = getUserStats(targetId);
    const today = new Date().toISOString().split('T')[0];

    const previousBest = stats.quizScores[storyId] || 0;
    const bestScore = Math.max(previousBest, score);
    stats.quizScores[storyId] = bestScore;

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

    if (!stats.activityLog) stats.activityLog = {};
    if (!stats.activityLog[today]) {
      stats.activityLog[today] = { reviews: 0, storiesRead: 0, quizzesTaken: 0 };
    }
    stats.activityLog[today].quizzesTaken += 1;
    stats.lastActiveDate = today;

    const key = getStorageKey('STATS', targetId);
    localStorage.setItem(key, JSON.stringify(stats));
    return stats;
  } catch (error) {
    console.error('Failed to record quiz score:', error);
    return getUserStats(profileId);
  }
}

export function savePlacementResult(level: CEFRLevel, score: number, total: number, profileId?: string): UserStats {
  try {
    const targetId = profileId !== undefined ? profileId : getActiveProfileId();
    const stats = getUserStats(targetId);
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

    const key = getStorageKey('STATS', targetId);
    localStorage.setItem(key, JSON.stringify(stats));
    return stats;
  } catch (error) {
    console.error('Failed to save placement result:', error);
    return getUserStats(profileId);
  }
}

export function dismissPlacementPrompt(profileId?: string): UserStats {
  try {
    const targetId = profileId !== undefined ? profileId : getActiveProfileId();
    const stats = getUserStats(targetId);
    stats.hasSeenPlacementPrompt = true;
    const key = getStorageKey('STATS', targetId);
    localStorage.setItem(key, JSON.stringify(stats));
    return stats;
  } catch (error) {
    return getUserStats(profileId);
  }
}

// -------------------------------------------------------------
// APP SETTINGS (PROFILE-AWARE)
// -------------------------------------------------------------

export function getAppSettings(profileId?: string): AppSettings {
  try {
    const targetId = profileId !== undefined ? profileId : getActiveProfileId();
    const key = getStorageKey('SETTINGS', targetId);
    const raw = localStorage.getItem(key);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (error) {
    console.error('Failed to get app settings:', error);
    return DEFAULT_SETTINGS;
  }
}

export function updateAppSettings(partial: Partial<AppSettings>, profileId?: string): AppSettings {
  try {
    const targetId = profileId !== undefined ? profileId : getActiveProfileId();
    const current = getAppSettings(targetId);
    const updated = { ...current, ...partial };
    const key = getStorageKey('SETTINGS', targetId);
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Failed to update app settings:', error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Cleans up legacy browser-stored API key on app start.
 */
export function cleanupOldApiKey(): void {
  try {
    localStorage.removeItem('lirefacile_gemini_api_key');
  } catch {
    // Ignore storage errors
  }
}

// -------------------------------------------------------------
// BACKUP EXPORT & IMPORT (PER PROFILE & ALL PROFILES)
// -------------------------------------------------------------

/**
 * Backup: Exports active profile data into JSON string.
 */
export function exportActiveProfileData(profileId: string = currentActiveProfileId): string {
  try {
    const state = getProfilesState();
    const currentProfile = state.profiles.find(p => p.id === profileId) || { id: profileId, name: 'Learner' };

    const backup = {
      version: 5,
      type: 'single_profile',
      exportDate: new Date().toISOString(),
      profile: {
        id: currentProfile.id,
        name: currentProfile.name
      },
      savedWords: getSavedWords(profileId),
      userStats: getUserStats(profileId),
      settings: getAppSettings(profileId)
    };
    return JSON.stringify(backup, null, 2);
  } catch (error) {
    console.error('Failed to export data:', error);
    return '{}';
  }
}

/**
 * Backward compatibility alias for single profile export.
 */
export function exportAllData(): string {
  return exportActiveProfileData(currentActiveProfileId);
}

/**
 * Backup: Exports ALL profiles and their data into a single bundle JSON.
 */
export function exportAllProfilesBundle(): string {
  try {
    const state = getProfilesState();
    const profilesData = state.profiles.map(p => ({
      profile: p,
      savedWords: getSavedWords(p.id),
      userStats: getUserStats(p.id),
      settings: getAppSettings(p.id)
    }));

    const bundle = {
      version: 5,
      type: 'all_profiles_bundle',
      exportDate: new Date().toISOString(),
      activeProfileId: state.activeProfileId,
      profilesData
    };
    return JSON.stringify(bundle, null, 2);
  } catch (error) {
    console.error('Failed to export all profiles:', error);
    return '{}';
  }
}

/**
 * Backup: Imports data from JSON string.
 * Supports:
 * - Old backups (version 4 or earlier, with or without profile field): imports into active profile
 * - Single profile backups: imports into active profile
 * - All profiles bundle: restores all profiles and their data
 */
export function importAllData(jsonString: string, targetProfileId: string = currentActiveProfileId): { success: boolean; message: string; isBundle?: boolean } {
  try {
    const data = JSON.parse(jsonString);

    if (!data || typeof data !== 'object') {
      return { success: false, message: 'Invalid JSON backup file' };
    }

    // Check if this is an "all profiles bundle"
    if (data.type === 'all_profiles_bundle' && Array.isArray(data.profilesData)) {
      const state = getProfilesState();
      for (const item of data.profilesData) {
        if (!item.profile || !item.profile.id) continue;
        const pId = item.profile.id;

        // Ensure profile is in state
        if (!state.profiles.some(p => p.id === pId)) {
          if (state.profiles.length < 5) {
            state.profiles.push({
              id: pId,
              name: item.profile.name || 'Learner',
              createdAt: item.profile.createdAt || new Date().toISOString()
            });
          }
        }

        // Save data for pId
        if (Array.isArray(item.savedWords)) {
          localStorage.setItem(getStorageKey('SAVED_WORDS', pId), JSON.stringify(item.savedWords));
        }
        const stats = item.userStats || item.stats;
        if (stats && typeof stats === 'object') {
          localStorage.setItem(getStorageKey('STATS', pId), JSON.stringify(stats));
        }
        if (item.settings && typeof item.settings === 'object') {
          localStorage.setItem(getStorageKey('SETTINGS', pId), JSON.stringify(item.settings));
        }
      }

      if (data.activeProfileId && state.profiles.some(p => p.id === data.activeProfileId)) {
        state.activeProfileId = data.activeProfileId;
        currentActiveProfileId = data.activeProfileId;
      }
      saveProfilesState(state);
      return { success: true, message: `Successfully restored ${data.profilesData.length} profile(s)!`, isBundle: true };
    }

    // Single profile or legacy backup: imports into active/target profile
    const savedWordsKey = getStorageKey('SAVED_WORDS', targetProfileId);
    const statsKey = getStorageKey('STATS', targetProfileId);
    const settingsKey = getStorageKey('SETTINGS', targetProfileId);

    if (Array.isArray(data.savedWords)) {
      localStorage.setItem(savedWordsKey, JSON.stringify(data.savedWords));
    }

    const importedStats = data.userStats || data.stats;
    if (importedStats && typeof importedStats === 'object') {
      localStorage.setItem(statsKey, JSON.stringify(importedStats));
    }

    if (data.settings && typeof data.settings === 'object') {
      localStorage.setItem(settingsKey, JSON.stringify(data.settings));
    }

    return { success: true, message: 'Data imported into active profile successfully!' };
  } catch (error) {
    console.error('Failed to import data:', error);
    return { success: false, message: 'Error reading backup file.' };
  }
}
