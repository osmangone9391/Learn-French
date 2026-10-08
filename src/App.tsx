/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Story, SavedWord, UserStats, AppSettings, CEFRLevel, ThemeMode } from './types';
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
  cleanupOldApiKey
} from './utils/storage';
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

type AppView = 'library' | 'reader' | 'words' | 'review' | 'progress';

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('library');
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [savedWords, setSavedWords] = useState<SavedWord[]>([]);
  const [userStats, setUserStats] = useState<UserStats>(getUserStats());
  const [settings, setSettings] = useState<AppSettings>(getAppSettings());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPlacementQuizOpen, setIsPlacementQuizOpen] = useState(false);
  const [isFirstLaunchPlacement, setIsFirstLaunchPlacement] = useState(false);

  // Track system dark-mode preference (default fallback when theme setting is not explicitly chosen)
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Listen to system color scheme changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Compute active effective theme: user setting takes precedence; otherwise follows device preference
  const activeTheme: ThemeMode = useMemo(() => {
    if (settings.theme) return settings.theme;
    return systemPrefersDark ? 'dark' : 'light';
  }, [settings.theme, systemPrefersDark]);

  // Synchronize active theme with document root
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', activeTheme);
    root.classList.remove('dark', 'sepia', 'light');
    root.classList.add(activeTheme);
  }, [activeTheme]);

  // Load persisted state on mount
  useEffect(() => {
    cleanupOldApiKey();

    try {
      const words = getSavedWords();
      const stats = getUserStats();
      const sett = getAppSettings();
      setSavedWords(words);
      setUserStats(stats);
      setSettings(sett);

      // Offer placement test on first launch if not seen yet
      if (!stats.hasSeenPlacementPrompt && !stats.placementResult) {
        setIsPlacementQuizOpen(true);
        setIsFirstLaunchPlacement(true);
      }
    } catch (e) {
      console.error('Initialization error from localStorage:', e);
    }
  }, []);

  // Compute due cards for the review session
  const studyQueue = useMemo(() => {
    return getDailyStudyQueue(
      savedWords,
      settings.dailyReviewLimit,
      settings.dailyNewWordsLimit
    );
  }, [savedWords, settings.dailyReviewLimit, settings.dailyNewWordsLimit]);

  // Handle saving a word from reader or popup
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
    const res = saveWord(item);
    if (res.success) {
      setSavedWords(getSavedWords());
    }
  };

  // Handle removing a saved word
  const handleRemoveWord = (wordId: string) => {
    removeSavedWord(wordId);
    setSavedWords(getSavedWords());
  };

  // Handle story read status toggle
  const handleToggleRead = (storyId: string, wordCount: number) => {
    const isCurrentlyRead = userStats.storiesReadIds.includes(storyId);
    const updated = isCurrentlyRead
      ? unmarkStoryAsRead(storyId, wordCount)
      : markStoryAsRead(storyId, wordCount);
    setUserStats(updated);
  };

  // Handle finish SRS review session
  const handleFinishReviewSession = (
    _updatedCards: SavedWord[],
    cardsReviewed: number,
    cardsCorrect: number
  ) => {
    const updatedStats = recordReviewSession(cardsReviewed, cardsCorrect);
    setUserStats(updatedStats);
    setSavedWords(getSavedWords());
    setActiveView('library');
  };

  // Handle comprehension quiz complete
  const handleQuizCompleted = (scorePercentage: number) => {
    if (!activeStory) return;
    const updatedStats = recordQuizScore(activeStory.id, scorePercentage);
    setUserStats(updatedStats);
  };

  // Handle placement quiz complete
  const handlePlacementComplete = (level: CEFRLevel, score: number, total: number) => {
    const updated = savePlacementResult(level, score, total);
    setUserStats(updated);
    setIsPlacementQuizOpen(false);
  };

  // Handle placement quiz skip
  const handlePlacementSkip = () => {
    const updated = dismissPlacementPrompt();
    setUserStats(updated);
    setIsPlacementQuizOpen(false);
  };

  // Update app settings with persistence
  const handleUpdateSettings = (partial: Partial<AppSettings>) => {
    const updated = updateAppSettings(partial);
    setSettings(updated);
  };

  // Quick theme cycle handler (Light -> Sepia -> Dark)
  const handleToggleTheme = () => {
    const themes: ThemeMode[] = ['light', 'sepia', 'dark'];
    const current = activeTheme;
    const nextIdx = (themes.indexOf(current) + 1) % themes.length;
    handleUpdateSettings({ theme: themes[nextIdx] });
  };

  // Handle data restored from backup JSON
  const handleDataRestored = () => {
    setSavedWords(getSavedWords());
    setUserStats(getUserStats());
    setSettings(getAppSettings());
  };

  // Navigation handlers
  const handleSelectStory = (story: Story) => {
    setActiveStory(story);
    setActiveView('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const handleResetToLibrary = () => {
    setActiveStory(null);
    setActiveView('library');
  };

  return (
    <div className="min-h-screen text-stone-900 dark:text-stone-100 sepia:text-[#382716] font-sans antialiased flex flex-col transition-colors">
      {/* Top Header */}
      <Navbar
        savedWordsCount={savedWords.length}
        dueCardsCount={studyQueue.totalQueue.length}
        activeView={activeView}
        currentTheme={activeTheme}
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
      />

      {/* Placement Quiz Modal */}
      <PlacementQuizModal
        isOpen={isPlacementQuizOpen}
        onClose={() => setIsPlacementQuizOpen(false)}
        onComplete={handlePlacementComplete}
        onSkip={handlePlacementSkip}
        isFirstLaunch={isFirstLaunchPlacement}
      />

      {/* Persistent Audio Source Indicator (Neural vs Browser Voice) */}
      <AudioSourceIndicator />
    </div>
  );
}
