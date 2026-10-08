import React, { useState, useMemo } from 'react';
import {
  Search,
  Compass,
  BookOpen,
  Bookmark,
  Calendar,
  Play,
  Layers,
  Flame,
  CheckCircle2,
  Circle,
  ArrowRight,
  Lightbulb,
  Sparkles
} from 'lucide-react';
import { Story, UserStats, SavedWord, AppSettings, StoryRecommendation } from '../types';
import { StoryCard } from './StoryCard';
import { getDailyStudyQueue } from '../utils/srs';
import { getRecommendedStory } from '../utils/stats';
import { i18n } from '../i18n/en';

interface StoryLibraryProps {
  stories: Story[];
  userStats: UserStats;
  savedWords: SavedWord[];
  settings: AppSettings;
  onSelectStory: (story: Story) => void;
  onOpenSavedWords: () => void;
  onStartReview: () => void;
  onOpenPlacementQuiz: () => void;
  onOpenProgress: () => void;
}

export const StoryLibrary: React.FC<StoryLibraryProps> = ({
  stories,
  userStats,
  savedWords,
  settings,
  onSelectStory,
  onOpenSavedWords,
  onStartReview,
  onOpenPlacementQuiz,
  onOpenProgress
}) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Daily study queue for reviews
  const studyQueue = useMemo(() => {
    return getDailyStudyQueue(
      savedWords,
      settings.dailyReviewLimit,
      settings.dailyNewWordsLimit
    );
  }, [savedWords, settings.dailyReviewLimit, settings.dailyNewWordsLimit]);

  // Recommended story based on user's Box 1-2 words
  const recommendation: StoryRecommendation | null = useMemo(() => {
    return getRecommendedStory(stories, userStats, savedWords);
  }, [stories, userStats, savedWords]);

  // Counts
  const a1Count = useMemo(() => stories.filter(s => s.level === 'A1').length, [stories]);
  const a2Count = useMemo(() => stories.filter(s => s.level === 'A2').length, [stories]);

  // Today's activity check for the 3-step Daily Loop
  const todayKey = new Date().toISOString().split('T')[0];
  const todayActivity = userStats.activityLog?.[todayKey] || {
    reviews: 0,
    storiesRead: 0,
    quizzesTaken: 0
  };

  const isStep1Done = todayActivity.reviews > 0 || studyQueue.totalQueue.length === 0;
  const isStep2Done = todayActivity.storiesRead > 0;
  const isStep3Done = todayActivity.quizzesTaken > 0;

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const matchLevel =
        selectedLevel === 'ALL'
          ? true
          : story.level === selectedLevel;

      const matchQuery =
        !searchQuery.trim() ||
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.topic.toLowerCase().includes(searchQuery.toLowerCase());
      return matchLevel && matchQuery;
    });
  }, [stories, selectedLevel, searchQuery]);

  const wordsSavedByStory = useMemo(() => {
    const map: Record<string, number> = {};
    savedWords.forEach((w) => {
      map[w.storyId] = (map[w.storyId] || 0) + 1;
    });
    return map;
  }, [savedWords]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* 3-Step Daily Loop Banner */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                <Calendar size={13} />
                {i18n.dailyLoop.title} ({i18n.dailyLoop.durationHint})
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                <Flame size={13} className="text-orange-600" />
                {i18n.dailyLoop.streakBadge} {userStats.streakDays} {userStats.streakDays === 1 ? 'day' : 'days'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Today's Routine
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenProgress}
              className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>{i18n.dailyLoop.viewProgressBtn}</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* 3 Steps Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Step 1: Review due words */}
          <div
            onClick={onStartReview}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              isStep1Done
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                : 'bg-stone-50 border-stone-200 hover:border-amber-300 text-stone-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">
                Step 1 • Review
              </span>
              {isStep1Done ? (
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              ) : (
                <Circle size={16} className="text-stone-300 shrink-0" />
              )}
            </div>
            <div className="font-serif font-bold text-sm">
              {i18n.dailyLoop.step1Title}
            </div>
            <p className="text-[11px] opacity-80 mt-0.5">
              {studyQueue.totalQueue.length > 0
                ? `${studyQueue.totalQueue.length} ${i18n.dailyLoop.step1Ready}`
                : i18n.dailyLoop.step1AllDone}
            </p>
          </div>

          {/* Step 2: Read recommended story */}
          <div
            onClick={() => {
              if (recommendation) onSelectStory(recommendation.story);
            }}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              isStep2Done
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                : 'bg-stone-50 border-stone-200 hover:border-amber-300 text-stone-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">
                Step 2 • Reading
              </span>
              {isStep2Done ? (
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              ) : (
                <Circle size={16} className="text-stone-300 shrink-0" />
              )}
            </div>
            <div className="font-serif font-bold text-sm">
              {i18n.dailyLoop.step2Title}
            </div>
            <p className="text-[11px] opacity-80 mt-0.5 truncate">
              {recommendation ? recommendation.story.title : 'Pick a story'}
            </p>
          </div>

          {/* Step 3: Take comprehension quiz */}
          <div
            onClick={() => {
              if (recommendation) onSelectStory(recommendation.story);
            }}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              isStep3Done
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                : 'bg-stone-50 border-stone-200 hover:border-amber-300 text-stone-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">
                Step 3 • Comprehension
              </span>
              {isStep3Done ? (
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              ) : (
                <Circle size={16} className="text-stone-300 shrink-0" />
              )}
            </div>
            <div className="font-serif font-bold text-sm">
              {i18n.dailyLoop.step3Title}
            </div>
            <p className="text-[11px] opacity-80 mt-0.5">
              {todayActivity.quizzesTaken > 0
                ? `${todayActivity.quizzesTaken} ${i18n.dailyLoop.step3DoneToday}`
                : i18n.dailyLoop.step3Pending}
            </p>
          </div>
        </div>
      </div>

      {/* "Recommended For You" Story Card */}
      {recommendation && (
        <div className="bg-gradient-to-br from-amber-50/90 via-stone-50 to-stone-100 border border-amber-300/80 rounded-3xl p-5 sm:p-6 shadow-xs relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-amber-800 text-white px-2.5 py-0.5 rounded-full shadow-2xs">
                  <Sparkles size={12} />
                  {i18n.recommendation.badge}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 bg-amber-100 text-amber-900 rounded-md">
                  {recommendation.story.level}
                </span>
              </div>

              <h3 className="text-xl font-serif font-bold text-stone-950 pt-1">
                {recommendation.story.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-sans">
                {recommendation.story.subtitle}
              </p>

              {/* Reason why it's recommended */}
              <div className="pt-2 flex items-start gap-1.5 text-xs text-amber-900 font-medium">
                <Lightbulb size={15} className="text-amber-700 shrink-0 mt-0.5" />
                <span>{recommendation.reason}</span>
              </div>
            </div>

            <button
              onClick={() => onSelectStory(recommendation.story)}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs shrink-0 cursor-pointer"
            >
              <span>{i18n.recommendation.readNowBtn}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Action Bar: Create My Story & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        {/* Level Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedLevel('ALL')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              selectedLevel === 'ALL'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            {i18n.levels.allLevels} ({stories.length})
          </button>
          <button
            onClick={() => setSelectedLevel('A1')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 flex items-center gap-1 cursor-pointer ${
              selectedLevel === 'A1'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/60'
            }`}
          >
            <span>{i18n.levels.A1}</span>
            <span className="text-[10px] opacity-80">({a1Count})</span>
          </button>
          <button
            onClick={() => setSelectedLevel('A2')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 flex items-center gap-1 cursor-pointer ${
              selectedLevel === 'A2'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200/60'
            }`}
          >
            <span>{i18n.levels.A2}</span>
            <span className="text-[10px] opacity-80">({a2Count})</span>
          </button>
          <button
            onClick={() => setSelectedLevel('B1')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
              selectedLevel === 'B1'
                ? 'bg-stone-800 text-white'
                : 'bg-stone-100 text-stone-400 cursor-not-allowed'
            }`}
            title="Coming soon"
          >
            {i18n.levels.B1}
          </button>
        </div>

        {/* Right controls: Search */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative min-w-[150px] sm:w-48">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder={i18n.library.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-200 rounded-full focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-stone-800 placeholder-stone-400"
            />
          </div>
        </div>
      </div>

      {/* Story Grid */}
      {filteredStories.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
          <Compass size={36} className="mx-auto text-stone-300" />
          <p className="text-base font-semibold text-stone-800">
            {i18n.library.noStoriesFound}
          </p>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try resetting your search query or level filters to view all available stories.
          </p>
          <button
            onClick={() => {
              setSelectedLevel('ALL');
              setSearchQuery('');
            }}
            className="mt-2 px-4 py-2 bg-stone-900 text-white rounded-full text-xs font-medium hover:bg-stone-800 cursor-pointer"
          >
            {i18n.library.resetFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              isRead={userStats.storiesReadIds.includes(story.id)}
              savedWordsCount={wordsSavedByStory[story.id] || 0}
              quizScore={userStats.quizHistory?.[story.id]?.bestScore ?? userStats.quizScores[story.id]}
              onSelect={onSelectStory}
            />
          ))}
        </div>
      )}

      {/* Placement Quiz Callout Banner */}
      <div className="p-5 bg-white rounded-3xl border border-stone-200 text-xs text-stone-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-start gap-3">
          <Compass size={22} className="text-amber-800 shrink-0 mt-0.5" />
          <div>
            <p className="font-serif font-bold text-sm text-stone-900">
              {i18n.library.placementBannerTitle}
            </p>
            <p className="leading-relaxed text-stone-500 mt-0.5">
              {i18n.library.placementBannerDesc}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenPlacementQuiz}
          className="px-4 py-2 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-800 font-semibold text-xs transition-colors shrink-0 cursor-pointer"
        >
          {userStats.placementResult ? i18n.library.retakeTestBtn : i18n.library.takeTestBtn}
        </button>
      </div>
    </div>
  );
};
