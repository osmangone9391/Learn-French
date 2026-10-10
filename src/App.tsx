/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Story, SavedWord, UserStats, AppSettings, CEFRLevel, ThemeMode, AuthUser, SyncStatus } from './types';
import { INITIAL_STORIES } from './data/stories';
import {
  getSavedWords,
  saveWord,
  removeSavedWord,
  getUserStats,
  markStoryAsRead,
  unmarkStoryAsRead,
  recordReviewSession,
  recordQuizScore,
  savePlacementResult,
  dismissPlacementPrompt,
  getAppSettings,
  updateAppSettings,
  cleanupOldApiKey,
  setActiveAccountUid,
  clearAccountLocalCache,
  hasGuestData,
  getGuestSavedWords,
  getGuestUserStats,
  getGuestAppSettings,
  getStorageKey
} from './utils/storage';
import {
  subscribeToAuthState,
  signOutAccount
} from './firebase/auth';
import {
  subscribeSyncStatus,
  pullCloudData,
  pushLocalData,
  scheduleDebouncedPush,
  flushPendingPush,
  initializeSyncListeners,
  deleteUserCloudData
} from './firebase/sync';
import {
  mergeSavedWords,
  mergeUserStats,
  mergeAppSettings
} from './firebase/merge';
import { getDailyStudyQueue } from './utils/srs';
import { Navbar } from './components/Navbar';
import { StoryLibrary } from './components/StoryLibrary';
import { StoryReader } from './components/StoryReader';
import { SavedWordsList } from './components/SavedWordsList';
import { ReviewSession } from './components/ReviewSession';
import { ProgressPage } from './components/ProgressPage';
import { SettingsModal } from './components/SettingsModal';
import { PlacementQuizModal } from './components/PlacementQuizModal';
import { AudioSourceIndicator } from './components/AudioSourceIndicator';
import { AuthModal } from './components/AuthModal';
import { PrivacyModal } from './components/PrivacyModal';
import { GuestMigrationPrompt } from './components/GuestMigrationPrompt';

type AppView = 'library' | 'reader' | 'words' | 'review' | 'progress';

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('library');
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  // Authentication & Cloud Sync State
  const [user, setUser] = useState<AuthUser | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('synced');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [showGuestMigration, setShowGuestMigration] = useState(false);
  const hasPromptedMigrationForUser = useRef<string | null>(null);

  // Active Learner Data (Guest Mode or Signed-In Account)
  const [savedWords, setSavedWords] = useState<SavedWord[]>(() => getSavedWords());
  const [userStats, setUserStats] = useState<UserStats>(() => getUserStats());
  const [settings, setSettings] = useState<AppSettings>(() => getAppSettings());

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPlacementQuizOpen, setIsPlacementQuizOpen] = useState(false);
  const [isFirstLaunchPlacement, setIsFirstLaunchPlacement] = useState(false);

  // Track system dark-mode preference
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Compute active effective theme
  const activeTheme: ThemeMode = useMemo(() => {
    if (settings.theme) return settings.theme;
    return systemPrefersDark ? 'dark' : 'light';
  }, [settings.theme, systemPrefersDark]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', activeTheme);
    root.classList.remove('dark', 'sepia', 'light');
    root.classList.add(activeTheme);
  }, [activeTheme]);

  // Reload current learner data from storage
  const reloadLocalState = useCallback((targetUid?: string | null) => {
    const resolvedUid = targetUid !== undefined ? targetUid : (user ? user.uid : null);
    const words = getSavedWords(resolvedUid || undefined);
    const stats = getUserStats(resolvedUid || undefined);
    const sett = getAppSettings(resolvedUid || undefined);
    setSavedWords(words);
    setUserStats(stats);
    setSettings(sett);
  }, [user]);

  // Auth & Sync Subscription Lifecycle
  useEffect(() => {
    cleanupOldApiKey();

    // Subscribe to sync status changes
    const unsubSync = subscribeSyncStatus((st) => setSyncStatus(st));

    // Initialize cross-tab visibility and online/offline sync listeners
    const unsubListeners = initializeSyncListeners((mWords, mStats, mSettings) => {
      setSavedWords(mWords);
      setUserStats(mStats);
      setSettings(mSettings);
    });

    // Subscribe to Firebase Auth state
    const unsubAuth = subscribeToAuthState((authUser) => {
      setUser(authUser);
      if (authUser) {
        // User signed in
        setActiveAccountUid(authUser.uid);
        reloadLocalState(authUser.uid);

        // Check if browser has guest progress and prompt once
        if (hasGuestData() && hasPromptedMigrationForUser.current !== authUser.uid) {
          hasPromptedMigrationForUser.current = authUser.uid;
          setShowGuestMigration(true);
        }

        // Pull fresh cloud data in background
        pullCloudData(authUser.uid).then((res) => {
          if (res.success) {
            setSavedWords(res.mergedWords);
            setUserStats(res.mergedStats);
            setSettings(res.mergedSettings);
          }
        });
      } else {
        // Guest mode
        setActiveAccountUid(null);
        reloadLocalState(null);
      }
    });

    // Placement prompt check on launch for unplaced learners
    const stats = getUserStats();
    if (!stats.hasSeenPlacementPrompt && !stats.placementResult && stats.storiesReadIds.length === 0) {
      setIsPlacementQuizOpen(true);
      setIsFirstLaunchPlacement(true);
    }

    return () => {
      unsubSync();
      unsubListeners();
      unsubAuth();
    };
  }, [reloadLocalState]);

  // Background Push Trigger Helper
  const notifyChangeForSync = useCallback(() => {
    if (user?.uid) {
      scheduleDebouncedPush(user.uid);
    }
  }, [user]);

  // Sign out Handler
  const handleSignOut = async () => {
    if (user?.uid) {
      await flushPendingPush(user.uid);
      clearAccountLocalCache(user.uid);
    }
    await signOutAccount();
    setActiveAccountUid(null);
    reloadLocalState(null);
    setActiveStory(null);
    setActiveView('library');
  };

  // Account Deletion Handler
  const handleAccountDeleted = async () => {
    if (user?.uid) {
      await deleteUserCloudData(user.uid);
      clearAccountLocalCache(user.uid);
    }
    setActiveAccountUid(null);
    reloadLocalState(null);
    setActiveStory(null);
    setActiveView('library');
  };

  // Manual Trigger Sync Button
  const handleTriggerSync = async () => {
    if (!user?.uid) return;
    const res = await pullCloudData(user.uid);
    if (res.success) {
      setSavedWords(res.mergedWords);
      setUserStats(res.mergedStats);
      setSettings(res.mergedSettings);
    }
    await pushLocalData(user.uid);
  };

  // Guest Progress Migration Confirmation
  const handleConfirmGuestMigration = async () => {
    setShowGuestMigration(false);
    if (!user?.uid) return;

    // Load guest progress
    const guestWords = getGuestSavedWords();
    const guestStats = getGuestUserStats();
    const guestSettings = getGuestAppSettings();

    // Load account progress
    const accountWords = getSavedWords(user.uid);
    const accountStats = getUserStats(user.uid);
    const accountSettings = getAppSettings(user.uid);

    // Deterministically merge
    const mergedWords = mergeSavedWords(guestWords, accountWords);
    const mergedStats = mergeUserStats(guestStats, accountStats);
    const mergedSettings = mergeAppSettings(guestSettings, accountSettings);

    // Save to account storage
    localStorage.setItem(getStorageKey('SAVED_WORDS', user.uid), JSON.stringify(mergedWords));
    localStorage.setItem(getStorageKey('STATS', user.uid), JSON.stringify(mergedStats));
    localStorage.setItem(getStorageKey('SETTINGS', user.uid), JSON.stringify(mergedSettings));

    setSavedWords(mergedWords);
    setUserStats(mergedStats);
    setSettings(mergedSettings);

    // Push merged data immediately to cloud
    await pushLocalData(user.uid);
  };

  const handleDismissGuestMigration = () => {
    setShowGuestMigration(false);
  };

  // Study Queue
  const studyQueue = useMemo(() => {
    return getDailyStudyQueue(
      savedWords,
      settings.dailyReviewLimit,
      settings.dailyNewWordsLimit
    );
  }, [savedWords, settings.dailyReviewLimit, settings.dailyNewWordsLimit]);

  // Saved Words Handlers
  const handleSaveWord = (item: {
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
  }) => {
    const targetUid = user ? user.uid : undefined;
    const res = saveWord(item, targetUid);
    if (res.success) {
      setSavedWords(getSavedWords(targetUid));
      notifyChangeForSync();
    }
  };

  const handleRemoveWord = (wordId: string) => {
    const targetUid = user ? user.uid : undefined;
    removeSavedWord(wordId, targetUid);
    setSavedWords(getSavedWords(targetUid));
    notifyChangeForSync();
  };

  const handleToggleRead = (storyId: string, wordCount: number) => {
    const targetUid = user ? user.uid : undefined;
    const isCurrentlyRead = userStats.storiesReadIds.includes(storyId);
    const updated = isCurrentlyRead
      ? unmarkStoryAsRead(storyId, wordCount, targetUid)
      : markStoryAsRead(storyId, wordCount, targetUid);
    setUserStats(updated);
    notifyChangeForSync();
  };

  const handleFinishReviewSession = (
    _updatedCards: SavedWord[],
    cardsReviewed: number,
    cardsCorrect: number
  ) => {
    const targetUid = user ? user.uid : undefined;
    const updatedStats = recordReviewSession(cardsReviewed, cardsCorrect, targetUid);
    setUserStats(updatedStats);
    setSavedWords(getSavedWords(targetUid));
    notifyChangeForSync();
    setActiveView('library');
  };

  const handleQuizCompleted = (scorePercentage: number) => {
    if (!activeStory) return;
    const targetUid = user ? user.uid : undefined;
    const updatedStats = recordQuizScore(activeStory.id, scorePercentage, targetUid);
    setUserStats(updatedStats);
    notifyChangeForSync();
  };

  const handlePlacementComplete = (level: CEFRLevel, score: number, total: number) => {
    const targetUid = user ? user.uid : undefined;
    const updated = savePlacementResult(level, score, total, targetUid);
    setUserStats(updated);
    setIsPlacementQuizOpen(false);
    notifyChangeForSync();
  };

  const handlePlacementSkip = () => {
    const targetUid = user ? user.uid : undefined;
    const updated = dismissPlacementPrompt(targetUid);
    setUserStats(updated);
    setIsPlacementQuizOpen(false);
    notifyChangeForSync();
  };

  const handleUpdateSettings = (partial: Partial<AppSettings>) => {
    const targetUid = user ? user.uid : undefined;
    const updated = updateAppSettings(partial, targetUid);
    setSettings(updated);
    notifyChangeForSync();
  };

  const handleToggleTheme = () => {
    const current = settings.theme || (systemPrefersDark ? 'dark' : 'light');
    let nextTheme: ThemeMode = 'light';
    if (current === 'light') nextTheme = 'sepia';
    else if (current === 'sepia') nextTheme = 'dark';
    else nextTheme = 'light';

    handleUpdateSettings({ theme: nextTheme });
  };

  const handleSelectStory = (story: Story) => {
    setActiveStory(story);
    setActiveView('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetToLibrary = () => {
    setActiveStory(null);
    setActiveView('library');
  };

  const handleOpenSavedWords = () => {
    setActiveView('words');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartReview = () => {
    setActiveView('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProgress = () => {
    setActiveView('progress');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDataRestored = () => {
    reloadLocalState();
    notifyChangeForSync();
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900 dark:selection:bg-amber-950 dark:selection:text-amber-100 sepia:selection:bg-[#E5D7BD] sepia:selection:text-[#382716]">
      {/* Navigation Header */}
      <Navbar
        savedWordsCount={savedWords.length}
        dueCardsCount={studyQueue.dueCardsCount}
        activeView={activeView}
        currentTheme={activeTheme}
        user={user}
        syncStatus={syncStatus}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
        onSignOut={handleSignOut}
        onTriggerSync={handleTriggerSync}
        onAccountDeleted={handleAccountDeleted}
        onOpenSavedWords={handleOpenSavedWords}
        onStartReview={handleStartReview}
        onOpenProgress={handleOpenProgress}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onResetView={handleResetToLibrary}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main View Switching */}
      <div className="flex-1">
        {activeView === 'reader' && activeStory ? (
          <StoryReader
            story={activeStory}
            isRead={userStats.storiesReadIds.includes(activeStory.id)}
            savedWords={savedWords}
            settings={settings}
            quizRecord={userStats.quizHistory?.[activeStory.id]}
            currentTheme={activeTheme}
            onBack={handleResetToLibrary}
            onToggleRead={handleToggleRead}
            onSaveWord={handleSaveWord}
            onUpdateSettings={handleUpdateSettings}
            onQuizCompleted={handleQuizCompleted}
          />
        ) : activeView === 'words' ? (
          <SavedWordsList
            savedWords={savedWords}
            settings={settings}
            onRemoveWord={handleRemoveWord}
            onStartReview={handleStartReview}
            onBack={handleResetToLibrary}
          />
        ) : activeView === 'review' ? (
          <ReviewSession
            queue={studyQueue.totalQueue}
            allSavedWords={savedWords}
            settings={settings}
            onFinishSession={handleFinishReviewSession}
            onBack={handleResetToLibrary}
          />
        ) : activeView === 'progress' ? (
          <ProgressPage
            stories={INITIAL_STORIES}
            userStats={userStats}
            savedWords={savedWords}
            onOpenPlacementQuiz={() => setIsPlacementQuizOpen(true)}
            onBack={handleResetToLibrary}
          />
        ) : (
          <StoryLibrary
            stories={INITIAL_STORIES}
            userStats={userStats}
            savedWords={savedWords}
            settings={settings}
            onSelectStory={handleSelectStory}
            onOpenSavedWords={handleOpenSavedWords}
            onStartReview={handleStartReview}
            onOpenPlacementQuiz={() => setIsPlacementQuizOpen(true)}
            onOpenProgress={handleOpenProgress}
          />
        )}
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        settings={settings}
        userStats={userStats}
        currentTheme={activeTheme}
        onClose={() => setIsSettingsOpen(false)}
        onUpdateSettings={handleUpdateSettings}
        onOpenPlacementQuiz={() => setIsPlacementQuizOpen(true)}
        onDataRestored={handleDataRestored}
        onOpenPrivacy={() => {
          setIsSettingsOpen(false);
          setIsPrivacyModalOpen(true);
        }}
      />

      {/* Placement Quiz Modal */}
      <PlacementQuizModal
        isOpen={isPlacementQuizOpen}
        onClose={() => setIsPlacementQuizOpen(false)}
        onComplete={handlePlacementComplete}
        onSkip={handlePlacementSkip}
        isFirstLaunch={isFirstLaunchPlacement}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onOpenPrivacy={() => {
          setIsAuthModalOpen(false);
          setIsPrivacyModalOpen(true);
        }}
      />

      {/* Plain-English GDPR Privacy Modal */}
      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      {/* Guest Progress Migration Modal (shown on first sign-in) */}
      <GuestMigrationPrompt
        isOpen={showGuestMigration}
        onConfirmMerge={handleConfirmGuestMigration}
        onDismiss={handleDismissGuestMigration}
      />

      {/* Persistent Audio Source Indicator (Neural vs Browser Voice) */}
      <AudioSourceIndicator />
    </div>
  );
}
