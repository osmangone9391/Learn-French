/**
 * Cloud Firestore Local-First Synchronization Engine
 *
 * Architecture:
 * - Documents under users/{uid}/ only:
 *   - users/{uid}/data/settings  (~1 KB)
 *   - users/{uid}/data/stats     (~10-25 KB for 2 years of activity log)
 *   - users/{uid}/data/vocab_index
 *   - users/{uid}/vocabulary/{shardId} (chunked to 200 words each, ~20 KB each, 2% of 1 MiB limit)
 * - Local-first: UI reads/writes local cache immediately.
 * - Background pull: on sign-in & tab visibilitychange.
 * - Background push: debounced (~30s) after changes & on tab hide/beforeunload.
 * - Sync statuses: 'synced' | 'syncing' | 'offline' | 'error'.
 * - Clean deletion on account removal.
 */

import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  deleteDoc,
  writeBatch
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import { SavedWord, UserStats, AppSettings, SyncStatus } from '../types';
import { mergeSavedWords, mergeUserStats, mergeAppSettings } from './merge';
import {
  getSavedWords,
  getUserStats,
  getAppSettings,
  getStorageKey
} from '../utils/storage';

const SHARD_SIZE = 200; // 200 words per shard (~20-25 KB per doc, 2% of 1 MiB limit)
const DEBOUNCE_PUSH_DELAY_MS = 25000; // ~25-30s debounce

let currentSyncStatus: SyncStatus = 'synced';
const syncListeners = new Set<(status: SyncStatus) => void>();
let pushDebounceTimer: NodeJS.Timeout | null = null;
let activeUid: string | null = null;

export function getSyncStatus(): SyncStatus {
  return currentSyncStatus;
}

export function subscribeSyncStatus(listener: (status: SyncStatus) => void): () => void {
  syncListeners.add(listener);
  listener(currentSyncStatus);
  return () => syncListeners.delete(listener);
}

function updateSyncStatus(newStatus: SyncStatus) {
  if (currentSyncStatus !== newStatus) {
    currentSyncStatus = newStatus;
    syncListeners.forEach(fn => fn(newStatus));
  }
}

/**
 * Splits words into shards of <= SHARD_SIZE
 */
function chunkWords(words: SavedWord[]): SavedWord[][] {
  const chunks: SavedWord[][] = [];
  for (let i = 0; i < words.length; i += SHARD_SIZE) {
    chunks.push(words.slice(i, i + SHARD_SIZE));
  }
  return chunks;
}

/**
 * PULL from Cloud Firestore and merge into local cache for the specified user
 */
export async function pullCloudData(uid: string): Promise<{
  success: boolean;
  mergedWords: SavedWord[];
  mergedStats: UserStats;
  mergedSettings: AppSettings;
}> {
  if (!isFirebaseConfigured() || !db) {
    updateSyncStatus('offline');
    return {
      success: false,
      mergedWords: getSavedWords(uid),
      mergedStats: getUserStats(uid),
      mergedSettings: getAppSettings(uid)
    };
  }

  if (!navigator.onLine) {
    updateSyncStatus('offline');
    return {
      success: false,
      mergedWords: getSavedWords(uid),
      mergedStats: getUserStats(uid),
      mergedSettings: getAppSettings(uid)
    };
  }

  updateSyncStatus('syncing');

  try {
    // 1. Fetch cloud settings
    const settingsDocRef = doc(db, 'users', uid, 'data', 'settings');
    const settingsSnap = await getDoc(settingsDocRef);
    const cloudSettingsData = settingsSnap.exists() ? settingsSnap.data() : null;

    // 2. Fetch cloud stats
    const statsDocRef = doc(db, 'users', uid, 'data', 'stats');
    const statsSnap = await getDoc(statsDocRef);
    const cloudStatsData = statsSnap.exists() ? statsSnap.data() : null;

    // 3. Fetch cloud vocabulary shards
    const vocabColRef = collection(db, 'users', uid, 'vocabulary');
    const vocabSnap = await getDocs(vocabColRef);
    const cloudWords: SavedWord[] = [];
    vocabSnap.forEach(d => {
      const data = d.data();
      if (Array.isArray(data?.words)) {
        cloudWords.push(...data.words);
      }
    });

    // 4. Load local user data
    const localWords = getSavedWords(uid);
    const localStats = getUserStats(uid);
    const localSettings = getAppSettings(uid);

    // 5. Merge deterministically
    const mergedWords = cloudWords.length > 0 ? mergeSavedWords(localWords, cloudWords) : localWords;
    const mergedStats = cloudStatsData?.stats ? mergeUserStats(localStats, cloudStatsData.stats as UserStats) : localStats;
    const mergedSettings = cloudSettingsData?.settings
      ? mergeAppSettings(
          localSettings,
          cloudSettingsData.settings as AppSettings,
          localStorage.getItem(getStorageKey('SETTINGS', uid) + '_updatedAt') || undefined,
          cloudSettingsData.updatedAt
        )
      : localSettings;

    // 6. Write merged result into local cache
    localStorage.setItem(getStorageKey('SAVED_WORDS', uid), JSON.stringify(mergedWords));
    localStorage.setItem(getStorageKey('STATS', uid), JSON.stringify(mergedStats));
    localStorage.setItem(getStorageKey('SETTINGS', uid), JSON.stringify(mergedSettings));
    localStorage.setItem(getStorageKey('SETTINGS', uid) + '_updatedAt', new Date().toISOString());

    updateSyncStatus('synced');

    return {
      success: true,
      mergedWords,
      mergedStats,
      mergedSettings
    };
  } catch (error) {
    console.warn('Sync pull error:', error);
    updateSyncStatus(navigator.onLine ? 'error' : 'offline');
    return {
      success: false,
      mergedWords: getSavedWords(uid),
      mergedStats: getUserStats(uid),
      mergedSettings: getAppSettings(uid)
    };
  }
}

/**
 * PUSH local cache for the specified user to Cloud Firestore
 */
export async function pushLocalData(uid: string): Promise<boolean> {
  if (!isFirebaseConfigured() || !db) {
    updateSyncStatus('offline');
    return false;
  }

  if (!navigator.onLine) {
    updateSyncStatus('offline');
    return false;
  }

  updateSyncStatus('syncing');

  try {
    const localWords = getSavedWords(uid);
    const localStats = getUserStats(uid);
    const localSettings = getAppSettings(uid);
    const nowISO = new Date().toISOString();

    const batch = writeBatch(db);

    // Write settings doc
    const settingsDocRef = doc(db, 'users', uid, 'data', 'settings');
    batch.set(settingsDocRef, {
      settings: localSettings,
      updatedAt: nowISO
    }, { merge: true });

    // Write stats doc
    const statsDocRef = doc(db, 'users', uid, 'data', 'stats');
    batch.set(statsDocRef, {
      stats: localStats,
      updatedAt: nowISO
    }, { merge: true });

    // Chunk vocabulary into shards
    const shards = chunkWords(localWords);

    // Write shard metadata index
    const indexDocRef = doc(db, 'users', uid, 'data', 'vocab_index');
    batch.set(indexDocRef, {
      shardCount: shards.length,
      totalWords: localWords.length,
      updatedAt: nowISO
    }, { merge: true });

    // Write each shard
    shards.forEach((chunk, index) => {
      const shardDocRef = doc(db, 'users', uid, 'vocabulary', `shard_${index}`);
      batch.set(shardDocRef, {
        index,
        count: chunk.length,
        words: chunk,
        updatedAt: nowISO
      });
    });

    await batch.commit();

    updateSyncStatus('synced');
    return true;
  } catch (error) {
    console.warn('Sync push error:', error);
    updateSyncStatus(navigator.onLine ? 'error' : 'offline');
    return false;
  }
}

/**
 * Triggers a debounced background push when data changes locally
 */
export function scheduleDebouncedPush(uid: string): void {
  activeUid = uid;
  if (pushDebounceTimer) {
    clearTimeout(pushDebounceTimer);
  }
  pushDebounceTimer = setTimeout(() => {
    if (activeUid) {
      pushLocalData(activeUid).catch(err => console.warn('Debounced push failed:', err));
    }
  }, DEBOUNCE_PUSH_DELAY_MS);
}

/**
 * Flushes any pending background push immediately (e.g. before signout or tab close)
 */
export async function flushPendingPush(uid: string): Promise<void> {
  if (pushDebounceTimer) {
    clearTimeout(pushDebounceTimer);
    pushDebounceTimer = null;
  }
  await pushLocalData(uid);
}

/**
 * Deletes all documents under users/{uid} in Firestore
 */
export async function deleteUserCloudData(uid: string): Promise<boolean> {
  if (!isFirebaseConfigured() || !db) return true;
  try {
    // 1. Delete vocab shards
    const vocabColRef = collection(db, 'users', uid, 'vocabulary');
    const vocabSnap = await getDocs(vocabColRef);
    const deleteBatch = writeBatch(db);
    vocabSnap.forEach(d => {
      deleteBatch.delete(d.ref);
    });

    // 2. Delete data docs
    deleteBatch.delete(doc(db, 'users', uid, 'data', 'settings'));
    deleteBatch.delete(doc(db, 'users', uid, 'data', 'stats'));
    deleteBatch.delete(doc(db, 'users', uid, 'data', 'vocab_index'));

    await deleteBatch.commit();
    return true;
  } catch (error) {
    console.error('Failed to delete cloud data:', error);
    return false;
  }
}

/**
 * Sets up online/offline event listeners and tab visibility sync
 */
export function initializeSyncListeners(
  onDataRefreshed?: (words: SavedWord[], stats: UserStats, settings: AppSettings) => void
): () => void {
  const handleOnline = () => {
    updateSyncStatus('syncing');
    if (activeUid) {
      pullCloudData(activeUid).then(res => {
        if (res.success && onDataRefreshed) {
          onDataRefreshed(res.mergedWords, res.mergedStats, res.mergedSettings);
        }
      });
    } else {
      updateSyncStatus('synced');
    }
  };

  const handleOffline = () => {
    updateSyncStatus('offline');
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible' && activeUid) {
      // Tab became visible: pull fresh updates
      pullCloudData(activeUid).then(res => {
        if (res.success && onDataRefreshed) {
          onDataRefreshed(res.mergedWords, res.mergedStats, res.mergedSettings);
        }
      });
    } else if (document.visibilityState === 'hidden' && activeUid) {
      // Tab hidden: flush pending changes
      flushPendingPush(activeUid);
    }
  };

  const handleBeforeUnload = () => {
    if (activeUid) {
      // Best effort flush on window close
      flushPendingPush(activeUid);
    }
  };

  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('beforeunload', handleBeforeUnload);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}
