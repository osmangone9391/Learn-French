/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Story, SavedWord, UserStats, AppSettings, CEFRLevel, StoryGenerationSettings } from './types';
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
  getCustomStories,
  saveCustomStory,
  deleteCustomStory,
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
import { CreateStoryModal } from './components/CreateStoryModal';
import { AudioSourceIndicator } from './components/AudioSourceIndicator';

type AppView = 'library' | 'reader' | 'words' | 'review' | 'progress';

export default function App() {
  const [customStories, setCustomStories] = useState<Story[]>(getCustomStories());
  const allStories = useMemo(() => [...customStories, ...INITIAL_STORIES], [customStories]);

  const [activeView, setActiveView] = useState<AppView>('library');
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [savedWords, setSavedWords] = useState<SavedWord[]>([]);
  const [userStats, setUserStats] = useState<UserStats>(getUserStats());
  const [settings, setSettings] = useState<AppSettings>(getAppSettings());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPlacementQuizOpen, setIsPlacementQuizOpen] = useState(false);
  const [isFirstLaunchPlacement, setIsFirstLaunchPlacement] = useState(false);

  // Personalized Story Creation state
  const [isCreateStoryOpen, setIsCreateStoryOpen] = useState(false);
  const [regenerateSettings, setRegenerateSettings] = useState<StoryGenerationSettings | undefined>(undefined);

  // Load persisted state on mount
  useEffect(() => {
    // Delete old legacy browser-stored API key
    cleanupOldApiKey();

    try {
      const words = getSavedWords();
      const stats = getUserStats();
      const sett = getAppSettings();
      const custom = getCustomStories();
      setSavedWords(words);
      setUserStats(stats);
      setSettings(sett);
      setCustomStories(custom);

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
  }) => {
    const res = saveWord(item);
    if (res.success) {
      setSavedWords(getSavedWords());
    }
  };

  // Handle removing a saved word
  const handleRemoveSavedWord = (id: string) => {
    removeSavedWord(id);
    setSavedWords(getSavedWords());
  };

  // Handle finished review session
  const handleFinishReviewSession = (
    updatedCards: SavedWord[],
    cardsReviewed: number,
    cardsCorrect: number
  ) => {
    if (updatedCards.length > 0) {
      const currentList = getSavedWords();
      const updatedMap = new Map(updatedCards.map(c => [c.id, c]));
      const newList = currentList.map(card => updatedMap.get(card.id) || card);

      updateBatchSavedWords(newList);
      setSavedWords(newList);
    }

    const updatedStats = recordReviewSession(cardsReviewed, cardsCorrect);
    setUserStats(updatedStats);
    setActiveView('library');
  };

  // Toggle mark story as read
  const handleToggleRead = (storyId: string, wordCount: number) => {
    const isCurrentlyRead = userStats.storiesReadIds.includes(storyId);
    const updated = isCurrentlyRead
      ? unmarkStoryAsRead(storyId, wordCount)
      : markStoryAsRead(storyId, wordCount);
    setUserStats(updated);
  };

  // Handle quiz completion (retaining best score and last score)
  const handleQuizCompleted = (scorePercentage: number) => {
    if (!activeStory) return;
    const updatedStats = recordQuizScore(activeStory.id, scorePercentage);
    setUserStats(updatedStats);
  };

  // Handle placement test completion
  const handlePlacementComplete = (level: CEFRLevel, score: number, total: number) => {
    const updated = savePlacementResult(level, score, total);
    setUserStats(updated);
    setIsPlacementQuizOpen(false);
  };

  // Handle skip placement test
  const handlePlacementSkip = () => {
    const updated = dismissPlacementPrompt();
    setUserStats(updated);
    setIsPlacementQuizOpen(false);
  };

  // Update app settings
  const handleUpdateSettings = (partial: Partial<AppSettings>) => {
    const updated = updateAppSettings(partial);
    setSettings(updated);
  };

  // Data restored from backup
  const handleDataRestored = () => {
    setSavedWords(getSavedWords());
    setUserStats(getUserStats());
    setSettings(getAppSettings());
    setCustomStories(getCustomStories());
  };

  // Story Creation & Management Handlers
  const handleStoryCreated = (newStory: Story) => {
    saveCustomStory(newStory);
    const updated = getCustomStories();
    setCustomStories(updated);
    setActiveStory(newStory);
    setActiveView('reader');
    setIsCreateStoryOpen(false);
    setRegenerateSettings(undefined);
  };

  const handleDeleteCustomStory = (storyId: string) => {
    deleteCustomStory(storyId);
    const updated = getCustomStories();
    setCustomStories(updated);
    if (activeStory?.id === storyId) {
      setActiveStory(null);
      setActiveView('library');
    }
  };

  const handleRegenerateStory = (storyGenSettings: StoryGenerationSettings) => {
    setRegenerateSettings(storyGenSettings);
    setIsCreateStoryOpen(true);
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
            onDeleteStory={handleDeleteCustomStory}
            onRegenerateStory={handleRegenerateStory}
          />
        ) : activeView === 'words' ? (
          <SavedWordsList
            savedWords={savedWords}
            settings={settings}
            onRemoveWord={handleRemoveSavedWord}
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
            stories={allStories}
            userStats={userStats}
            savedWords={savedWords}
            onOpenPlacementQuiz={() => setIsPlacementQuizOpen(true)}
            onBack={handleResetToLibrary}
          />
        ) : (
          <StoryLibrary
            stories={allStories}
            userStats={userStats}
            savedWords={savedWords}
            settings={settings}
            onSelectStory={handleSelectStory}
            onOpenSavedWords={handleOpenSavedWords}
            onStartReview={handleStartReview}
            onOpenPlacementQuiz={() => setIsPlacementQuizOpen(true)}
            onOpenProgress={handleOpenProgress}
            onOpenCreateStory={() => {
              setRegenerateSettings(undefined);
              setIsCreateStoryOpen(true);
            }}
            onDeleteCustomStory={handleDeleteCustomStory}
            onRegenerateCustomStory={handleRegenerateStory}
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

      {/* Create Story Modal */}
      <CreateStoryModal
        isOpen={isCreateStoryOpen}
        onClose={() => {
          setIsCreateStoryOpen(false);
          setRegenerateSettings(undefined);
        }}
        savedWords={savedWords}
        recommendedLevel={userStats.recommendedLevel || 'A1'}
        onStoryCreated={handleStoryCreated}
        onOpenSettings={() => setIsSettingsOpen(true)}
        initialSettings={regenerateSettings}
      />

      {/* Persistent Audio Source Indicator (Neural vs Browser Voice) */}
      <AudioSourceIndicator />
    </div>
  );
}
