/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Story, SavedWord, UserStats, AppSettings, CEFRLevel } from './types';
import { INITIAL_STORIES } from './data/stories';
import {
  getSavedWords,
  saveWord,
  removeSavedWord,
  updateBatchSavedWords,
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

  // Load persisted state on mount
  useEffect(() => {
    // Delete old legacy browser-stored API key
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
    updatedCards: SavedWord[],
    cardsReviewed: number,
    cardsCorrect: number
  ) => {
    if (updatedCards.length > 0) {
      const currentList = getSavedWords();
      const updatedMap = new Map(updatedCards.map((c) => [c.id, c]));
      const newList = currentList.map((card) => updatedMap.get(card.id) || card);

      updateBatchSavedWords(newList);
      setSavedWords(newList);
    }

    const updatedStats = recordReviewSession(cardsReviewed, cardsCorrect);
    setUserStats(updatedStats);
    setActiveView('library');
  };

  // Handle quiz completion
  const handleQuizCompleted = (scorePercentage: number) => {
    if (!activeStory) return;
    const statsUpdated = recordQuizScore(activeStory.id, scorePercentage);
    setUserStats(statsUpdated);
  };

  // Handle placement quiz completion
  const handlePlacementComplete = (level: CEFRLevel, score: number, total: number) => {
    const statsUpdated = savePlacementResult(level, score, total);
    setUserStats(statsUpdated);
    setIsPlacementQuizOpen(false);
    setIsFirstLaunchPlacement(false);
  };

  const handlePlacementSkip = () => {
    const statsUpdated = dismissPlacementPrompt();
    setUserStats(statsUpdated);
    setIsPlacementQuizOpen(false);
    setIsFirstLaunchPlacement(false);
  };

  // Settings update handler
  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = updateAppSettings(newSettings);
    setSettings(updated);
  };

  // Backup restore callback
  const handleDataRestored = () => {
    setSavedWords(getSavedWords());
    setUserStats(getUserStats());
    setSettings(getAppSettings());
  };

  // Navigation handlers
  const handleSelectStory = (story: Story) => {
    setActiveStory(story);
    setActiveView('reader');
  };

  const handleStartReview = () => {
    setActiveView('review');
  };

  const handleOpenSavedWords = () => {
    setActiveView('words');
  };

  const handleOpenProgress = () => {
    setActiveView('progress');
  };

  const handleResetToLibrary = () => {
    setActiveStory(null);
    setActiveView('library');
  };

  return (
    <div className="min-h-screen bg-stone-100/60 text-stone-900 font-sans antialiased flex flex-col">
      {/* Top Header */}
      <Navbar
        savedWordsCount={savedWords.length}
        dueCardsCount={studyQueue.totalQueue.length}
        activeView={activeView}
        onOpenSavedWords={handleOpenSavedWords}
        onStartReview={handleStartReview}
        onOpenProgress={handleOpenProgress}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onResetView={handleResetToLibrary}
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
