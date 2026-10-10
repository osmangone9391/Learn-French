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
const OPERATION_TIMEOUT_MS = 6000; // 6s timeout to prevent UI hanging

let currentSyncStatus: SyncStatus = 'synced';
let lastSyncErrorMessage: string | null = null;
let lastSyncTimestamp: string | null = null;
const syncListeners = new Set<(status: SyncStatus) => void>();
let pushDebounceTimer: NodeJS.Timeout | null = null;
let activeUid: string | null = null;

export function getSyncStatus(): SyncStatus {
  return currentSyncStatus;
}

export function getLastSyncError(): string | null {
  return lastSyncErrorMessage;
}

export function getLastSyncTimestamp(): string | null {
  return lastSyncTimestamp;
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
 * Wraps an async Firestore promise with a safety timeout so network hangs never freeze the app.
 */
function withTimeout<T>(promise: Promise<T>, timeoutMs: number, operationName: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`${operationName} timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

function formatSyncError(error: any): string {
  if (!error) return 'Unknown sync issue';
  const msg = String(error?.message || error);
  const code = error?.code || '';
  if (code === 'permission-denied' || msg.includes('permission') || msg.includes('insufficient')) {
    return 'Cloud permission denied: Firestore Security Rules in Firebase Console require update.';
  }
  if (msg.includes('timed out') || code === 'deadline-exceeded') {
    return 'Cloud timed out: Progress is safely stored on this device.';
  }
  if (code === 'unavailable') {
    return 'Cloud service unavailable: Progress is safely stored on this device.';
  }
  if (code === 'not-found' || msg.includes('not found')) {
    return 'Firestore database not found in Firebase project.';
  }
  return msg;
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
  activeUid = uid;
  const firestore = db;

  if (!isFirebaseConfigured() || !firestore) {
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
    // 1. Fetch cloud settings with timeout
    const settingsDocRef = doc(firestore, 'users', uid, 'data', 'settings');
    const settingsSnap = await withTimeout(getDoc(settingsDocRef), OPERATION_TIMEOUT_MS, 'Fetch settings');
    const cloudSettingsData = settingsSnap.exists() ? settingsSnap.data() : null;

    // 2. Fetch cloud stats with timeout
    const statsDocRef = doc(firestore, 'users', uid, 'data', 'stats');
    const statsSnap = await withTimeout(getDoc(statsDocRef), OPERATION_TIMEOUT_MS, 'Fetch stats');
    const cloudStatsData = statsSnap.exists() ? statsSnap.data() : null;

    // 3. Fetch cloud vocabulary shards with timeout
    const vocabColRef = collection(firestore, 'users', uid, 'vocabulary');
    const vocabSnap = await withTimeout(getDocs(vocabColRef), OPERATION_TIMEOUT_MS, 'Fetch vocabulary');
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

    lastSyncErrorMessage = null;
    lastSyncTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    updateSyncStatus('synced');

    return {
      success: true,
      mergedWords,
      mergedStats,
      mergedSettings
    };
  } catch (error) {
    console.warn('Sync pull warning:', error);
    lastSyncErrorMessage = formatSyncError(error);
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
  activeUid = uid;
  const firestore = db;

  if (!isFirebaseConfigured() || !firestore) {
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

    const batch = writeBatch(firestore);

    // Write settings doc
    const settingsDocRef = doc(firestore, 'users', uid, 'data', 'settings');
    batch.set(settingsDocRef, {
      settings: localSettings,
      updatedAt: nowISO
    }, { merge: true });

    // Write stats doc
    const statsDocRef = doc(firestore, 'users', uid, 'data', 'stats');
    batch.set(statsDocRef, {
      stats: localStats,
      updatedAt: nowISO
    }, { merge: true });

    // Chunk vocabulary into shards
    const shards = chunkWords(localWords);

    // Write shard metadata index
    const indexDocRef = doc(firestore, 'users', uid, 'data', 'vocab_index');
    batch.set(indexDocRef, {
      shardCount: shards.length,
      totalWords: localWords.length,
      updatedAt: nowISO
    }, { merge: true });

    // Write each shard
    shards.forEach((chunk, index) => {
      const shardDocRef = doc(firestore, 'users', uid, 'vocabulary', `shard_${index}`);
      batch.set(shardDocRef, {
        index,
        count: chunk.length,
        words: chunk,
        updatedAt: nowISO
      });
    });

    await withTimeout(batch.commit(), OPERATION_TIMEOUT_MS, 'Push commit');

    lastSyncErrorMessage = null;
    lastSyncTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    updateSyncStatus('synced');
    return true;
  } catch (error) {
    console.warn('Sync push warning:', error);
    lastSyncErrorMessage = formatSyncError(error);
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
  try {
    await pushLocalData(uid);
  } catch (err) {
    console.warn('Flush push caught error:', err);
  }
}

/**
 * Deletes all documents under users/{uid} in Firestore
 */
export async function deleteUserCloudData(uid: string): Promise<boolean> {
  const firestore = db;
  if (!isFirebaseConfigured() || !firestore) return true;
  try {
    // 1. Delete vocab shards
    const vocabColRef = collection(firestore, 'users', uid, 'vocabulary');
    const vocabSnap = await withTimeout(getDocs(vocabColRef), OPERATION_TIMEOUT_MS, 'Delete fetch vocab');
    const deleteBatch = writeBatch(firestore);
    vocabSnap.forEach(d => {
      deleteBatch.delete(d.ref);
    });

    // 2. Delete data docs
    deleteBatch.delete(doc(firestore, 'users', uid, 'data', 'settings'));
    deleteBatch.delete(doc(firestore, 'users', uid, 'data', 'stats'));
    deleteBatch.delete(doc(firestore, 'users', uid, 'data', 'vocab_index'));

    await withTimeout(deleteBatch.commit(), OPERATION_TIMEOUT_MS, 'Delete commit');
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
