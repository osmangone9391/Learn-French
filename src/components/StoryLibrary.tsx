import React, { useState, useMemo } from 'react';
import {
  Search,
  Compass,
  BookOpen,
  Bookmark,
  Calendar,
  Layers,
  Flame,
  CheckCircle2,
  Circle,
  ArrowRight,
  Lightbulb,
  Sparkles,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Info,
  Clock,
  RotateCcw
} from 'lucide-react';
import { Story, UserStats, SavedWord, AppSettings, StoryRecommendation, CEFRLevel } from '../types';
import { StoryCard } from './StoryCard';
import { getDailyStudyQueue } from '../utils/srs';
import { getRecommendedStory } from '../utils/stats';
import { i18n } from '../i18n/en';
import {
  ALL_CEFR_LEVELS,
  getLevelLabel,
  getLevelBadgeClasses,
  getLevelFilterButtonClasses
} from '../utils/levelHelper';

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

type StatusFilter = 'ALL' | 'UNREAD' | 'READ';
type SortOption = 'recommended' | 'shortest' | 'level';

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
  const [selectedTopic, setSelectedTopic] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAboutLevelsOpen, setIsAboutLevelsOpen] = useState(false);

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

  // Unique topic tags collected across all stories
  const availableTopics = useMemo(() => {
    const set = new Set<string>();
    stories.forEach((s) => {
      if (s.topics && s.topics.length > 0) {
        s.topics.forEach((t) => set.add(t));
      } else if (s.topic) {
        set.add(s.topic);
      }
    });
    return Array.from(set).sort();
  }, [stories]);

  // Level counts
  const levelCounts = useMemo(() => {
    const counts: Record<CEFRLevel, number> = { A1: 0, A2: 0, B1: 0, B2: 0 };
    stories.forEach((s) => {
      if (counts[s.level] !== undefined) {
        counts[s.level]++;
      }
    });
    return counts;
  }, [stories]);

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

  // Filtered stories by level, topic, status, search (title + words in story)
  const filteredAndSortedStories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = stories.filter((story) => {
      // 1. Level filter
      if (selectedLevel !== 'ALL' && story.level !== selectedLevel) {
        return false;
      }

      // 2. Topic filter
      if (selectedTopic !== 'ALL') {
        const matchesTopic =
          (story.topics && story.topics.includes(selectedTopic)) ||
          story.topic.toLowerCase() === selectedTopic.toLowerCase();
        if (!matchesTopic) return false;
      }

      // 3. Status filter
      const isRead = userStats.storiesReadIds.includes(story.id);
      if (selectedStatus === 'READ' && !isRead) return false;
      if (selectedStatus === 'UNREAD' && isRead) return false;

      // 4. Search filter: title, subtitle, and words in the story (paragraphs + vocabulary)
      if (query) {
        const titleMatch = story.title.toLowerCase().includes(query);
        const subtitleMatch = story.subtitle.toLowerCase().includes(query);
        const topicMatch = story.topic.toLowerCase().includes(query);
        const topicsMatch = story.topics?.some((t) => t.toLowerCase().includes(query));
        const paragraphMatch = story.paragraphs.some((p) => p.toLowerCase().includes(query));
        const vocabMatch = Object.entries(story.vocabulary).some(
          ([key, entry]) =>
            key.toLowerCase().includes(query) ||
            entry.lemma.toLowerCase().includes(query) ||
            entry.en.toLowerCase().includes(query) ||
            entry.bn.toLowerCase().includes(query)
        );

        if (!titleMatch && !subtitleMatch && !topicMatch && !topicsMatch && !paragraphMatch && !vocabMatch) {
          return false;
        }
      }

      return true;
    });

    // Sort stories
    const levelRank: Record<CEFRLevel, number> = { A1: 1, A2: 2, B1: 3, B2: 4 };

    return filtered.sort((a, b) => {
      if (sortBy === 'shortest') {
        return a.wordCount - b.wordCount;
      }

      if (sortBy === 'level') {
        const levelDiff = (levelRank[a.level] || 1) - (levelRank[b.level] || 1);
        if (levelDiff !== 0) return levelDiff;
        return a.wordCount - b.wordCount;
      }

      // Default: 'recommended'
      // 1. Prioritize recommendation story if present
      if (recommendation) {
        if (a.id === recommendation.story.id) return -1;
        if (b.id === recommendation.story.id) return 1;
      }

      // 2. Prioritize unread
      const aRead = userStats.storiesReadIds.includes(a.id);
      const bRead = userStats.storiesReadIds.includes(b.id);
      if (!aRead && bRead) return -1;
      if (aRead && !bRead) return 1;

      // 3. User's recommended level first
      const targetLevel = userStats.recommendedLevel || 'A1';
      if (a.level === targetLevel && b.level !== targetLevel) return -1;
      if (b.level === targetLevel && a.level !== targetLevel) return 1;

      // 4. By level then word count
      const levelDiff = (levelRank[a.level] || 1) - (levelRank[b.level] || 1);
      if (levelDiff !== 0) return levelDiff;
      return a.wordCount - b.wordCount;
    });
  }, [
    stories,
    selectedLevel,
    selectedTopic,
    selectedStatus,
    sortBy,
    searchQuery,
    userStats.storiesReadIds,
    userStats.recommendedLevel,
    recommendation
  ]);

  const wordsSavedByStory = useMemo(() => {
    const map: Record<string, number> = {};
    savedWords.forEach((w) => {
      map[w.storyId] = (map[w.storyId] || 0) + 1;
    });
    return map;
  }, [savedWords]);

  const handleResetFilters = () => {
    setSelectedLevel('ALL');
    setSelectedTopic('ALL');
    setSelectedStatus('ALL');
    setSortBy('recommended');
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedLevel !== 'ALL' ||
    selectedTopic !== 'ALL' ||
    selectedStatus !== 'ALL' ||
    searchQuery.trim().length > 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* 3-Step Daily Loop Banner */}
      <div className="bg-white dark:bg-[#1E2126] sepia:bg-[#FAF4E6] rounded-3xl border border-stone-200/90 dark:border-stone-800 sepia:border-[#DDCFB6] p-5 sm:p-7 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-950 border border-amber-300 dark:bg-amber-950/70 dark:text-amber-200 dark:border-amber-800 sepia:bg-amber-200/70 sepia:text-amber-950 sepia:border-amber-400">
                <Calendar size={13} />
                {i18n.dailyLoop.title} ({i18n.dailyLoop.durationHint})
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-800 bg-orange-50 border border-orange-200 dark:bg-orange-950/70 dark:text-orange-300 dark:border-orange-800 sepia:bg-orange-200/70 sepia:text-orange-950 sepia:border-orange-400 px-2 py-0.5 rounded-md">
                <Flame size={13} className="text-orange-600 dark:text-orange-400" />
                {i18n.dailyLoop.streakBadge} {userStats.streakDays} {userStats.streakDays === 1 ? 'day' : 'days'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 sepia:text-[#382716]">
              Today's Routine
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenProgress}
              className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-200 sepia:bg-[#EDE3CB] sepia:hover:bg-[#E5D7BD] sepia:text-[#382716] text-stone-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
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
                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200 sepia:bg-emerald-100/60 sepia:border-emerald-400 sepia:text-emerald-950'
                : 'bg-stone-50 border-stone-200 hover:border-amber-400 text-stone-800 dark:bg-stone-800/60 dark:border-stone-700 dark:hover:border-amber-400 dark:text-stone-200 sepia:bg-[#EDE3CB] sepia:border-[#DDCFB6] sepia:hover:border-amber-600 sepia:text-[#382716]'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">
                Step 1 • Review
              </span>
              {isStep1Done ? (
                <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : (
                <Circle size={16} className="text-stone-300 dark:text-stone-600 sepia:text-[#B8A488] shrink-0" />
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
                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200 sepia:bg-emerald-100/60 sepia:border-emerald-400 sepia:text-emerald-950'
                : 'bg-stone-50 border-stone-200 hover:border-amber-400 text-stone-800 dark:bg-stone-800/60 dark:border-stone-700 dark:hover:border-amber-400 dark:text-stone-200 sepia:bg-[#EDE3CB] sepia:border-[#DDCFB6] sepia:hover:border-amber-600 sepia:text-[#382716]'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">
                Step 2 • Reading
              </span>
              {isStep2Done ? (
                <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : (
                <Circle size={16} className="text-stone-300 dark:text-stone-600 sepia:text-[#B8A488] shrink-0" />
              )}
            </div>
            <div className="font-serif font-bold text-sm">
              {i18n.dailyLoop.step2Title}
            </div>
            <p className="text-[11px] opacity-80 mt-0.5 truncate">
              {recommendation ? recommendation.story.title : 'Pick a story'}
            </p>
          </div>

          {/* Step 3: Comprehension quiz */}
          <div
            onClick={() => {
              if (recommendation) onSelectStory(recommendation.story);
            }}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
              isStep3Done
                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200 sepia:bg-emerald-100/60 sepia:border-emerald-400 sepia:text-emerald-950'
                : 'bg-stone-50 border-stone-200 hover:border-amber-400 text-stone-800 dark:bg-stone-800/60 dark:border-stone-700 dark:hover:border-amber-400 dark:text-stone-200 sepia:bg-[#EDE3CB] sepia:border-[#DDCFB6] sepia:hover:border-amber-600 sepia:text-[#382716]'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">
                Step 3 • Quiz
              </span>
              {isStep3Done ? (
                <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : (
                <Circle size={16} className="text-stone-300 dark:text-stone-600 sepia:text-[#B8A488] shrink-0" />
              )}
            </div>
            <div className="font-serif font-bold text-sm">
              {i18n.dailyLoop.step3Title}
            </div>
            <p className="text-[11px] opacity-80 mt-0.5">
              {isStep3Done ? i18n.dailyLoop.step3DoneToday : i18n.dailyLoop.step3Pending}
            </p>
          </div>
        </div>
      </div>

      {/* Recommended for You Story Card */}
      {recommendation && (
        <div className="bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 sepia:from-[#F4E9CE] sepia:to-[#EFE2C2] rounded-3xl border border-amber-200/90 dark:border-amber-800/70 sepia:border-[#DDCFB6] p-5 sm:p-6 shadow-2xs relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-800 text-white shadow-2xs">
                  <Sparkles size={12} />
                  {i18n.recommendation.badge}
                </span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${getLevelBadgeClasses(
                    recommendation.story.level
                  )}`}
                >
                  {getLevelLabel(recommendation.story.level)}
                </span>
                <span className="text-xs text-stone-600 dark:text-stone-300 sepia:text-[#644E35]">
                  {recommendation.story.wordCount} words (~{Math.max(1, Math.ceil(recommendation.story.wordCount / 100))} min)
                </span>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-stone-100 sepia:text-[#382716]">
                  {recommendation.story.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 sepia:text-[#644E35] mt-0.5">
                  {recommendation.story.subtitle}
                </p>
              </div>

              {/* Reason why it's recommended */}
              <div className="pt-1 flex items-start gap-1.5 text-xs text-amber-900 dark:text-amber-200 sepia:text-[#783908] font-medium">
                <Lightbulb size={15} className="text-amber-700 dark:text-amber-400 sepia:text-[#9A4C10] shrink-0 mt-0.5" />
                <span>{recommendation.reason}</span>
              </div>
            </div>

            <button
              onClick={() => onSelectStory(recommendation.story)}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white dark:text-stone-950 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs shrink-0 cursor-pointer"
            >
              <span>{i18n.recommendation.readNowBtn}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Collapsible "About levels" box */}
      <div className="bg-white dark:bg-[#1E2126] sepia:bg-[#FAF4E6] rounded-2xl border border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] overflow-hidden shadow-2xs">
        <button
          onClick={() => setIsAboutLevelsOpen(!isAboutLevelsOpen)}
          aria-expanded={isAboutLevelsOpen}
          className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-stone-50/70 dark:hover:bg-stone-800/50 sepia:hover:bg-[#EDE3CB]/60 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Info size={18} className="text-amber-800 dark:text-amber-400 sepia:text-[#8C4712] shrink-0" />
            <div>
              <span className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 sepia:text-[#382716]">
                {i18n.library.aboutLevelsTitle}
              </span>
              <span className="hidden sm:inline text-xs text-stone-500 dark:text-stone-400 sepia:text-[#78644E] ml-2">
                — {i18n.library.aboutLevelsSubtitle}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 sepia:text-[#78644E]">
            <span>{isAboutLevelsOpen ? 'Hide' : 'Show descriptions'}</span>
            {isAboutLevelsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </button>

        {isAboutLevelsOpen && (
          <div className="px-5 pb-5 pt-2 border-t border-stone-100 dark:border-stone-800 sepia:border-[#E8DEC7] space-y-3 animate-in fade-in">
            <p className="text-xs text-stone-600 dark:text-stone-300 sepia:text-[#644E35] leading-relaxed">
              LireFacile supports four CEFR levels. You are free to read any story at any level without restriction. Here is what learners can read at each stage:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {ALL_CEFR_LEVELS.map((lvl) => {
                const desc = i18n.levelDescriptions[lvl];
                const badgeClass = getLevelBadgeClasses(lvl);
                return (
                  <div
                    key={lvl}
                    className="p-3.5 rounded-xl border border-stone-200/80 dark:border-stone-700/80 sepia:border-[#DDCFB6] bg-stone-50/60 dark:bg-stone-800/40 sepia:bg-[#EDE3CB]/40 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${badgeClass}`}>
                        {desc.name}
                      </span>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400 sepia:text-[#78644E]">
                        {levelCounts[lvl]} {levelCounts[lvl] === 1 ? 'story' : 'stories'} available
                      </span>
                    </div>
                    <p className="text-xs text-stone-800 dark:text-stone-200 sepia:text-[#382716] leading-relaxed">
                      <strong>Can read:</strong> {desc.canRead}
                    </p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 sepia:text-[#78644E] leading-relaxed">
                      {desc.context}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-500 dark:text-stone-400 sepia:text-[#78644E]">
              <span>Current recommended level: <strong className="text-stone-800 dark:text-stone-200 sepia:text-[#382716]">{getLevelLabel(userStats.recommendedLevel || 'A1')}</strong></span>
              <button
                onClick={onOpenPlacementQuiz}
                className="text-amber-800 dark:text-amber-400 sepia:text-[#8C4712] font-semibold hover:underline self-start sm:self-auto cursor-pointer"
              >
                {userStats.placementResult ? 'Retake placement quiz (15 Q)' : 'Take placement quiz to check your level →'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-3 pt-1">
        {/* Row 1: Level Tabs */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {/* All Levels */}
            <button
              onClick={() => setSelectedLevel('ALL')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                selectedLevel === 'ALL'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 sepia:bg-[#382716] sepia:text-[#FAF4E6] shadow-2xs'
                  : 'bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 dark:text-stone-300 sepia:bg-[#EDE3CB] sepia:hover:bg-[#E5D7BD] sepia:text-[#382716] text-stone-700'
              }`}
            >
              {i18n.levels.allLevels} ({stories.length})
            </button>

            {/* A1, A2, B1, B2 tabs with level badge colors */}
            {ALL_CEFR_LEVELS.map((lvl) => {
              const isSelected = selectedLevel === lvl;
              const count = levelCounts[lvl];
              const btnClass = getLevelFilterButtonClasses(lvl, isSelected);

              return (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 flex items-center gap-1 cursor-pointer border ${btnClass}`}
                >
                  <span>{getLevelLabel(lvl)}</span>
                  <span className="text-[10px] opacity-80">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Secondary Filters (Topic, Status, Sort, Search) */}
        <div className="bg-white dark:bg-[#1E2126] sepia:bg-[#FAF4E6] p-3.5 rounded-2xl border border-stone-200/90 dark:border-stone-800 sepia:border-[#DDCFB6] flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          {/* Left: Dropdowns for Topic, Status, Sort */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Topic Filter */}
            <div className="flex items-center gap-1 text-xs text-stone-600 dark:text-stone-300 sepia:text-[#644E35]">
              <span className="font-medium hidden sm:inline">{i18n.library.filterTopic}:</span>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="text-xs px-2.5 py-1.5 bg-stone-50 dark:bg-stone-800 sepia:bg-[#EDE3CB] border border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6] rounded-xl text-stone-800 dark:text-stone-200 sepia:text-[#382716] focus:outline-hidden focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                <option value="ALL">{i18n.library.allTopics} ({availableTopics.length})</option>
                {availableTopics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic.charAt(0).toUpperCase() + topic.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1 text-xs text-stone-600 dark:text-stone-300 sepia:text-[#644E35]">
              <span className="font-medium hidden sm:inline">{i18n.library.filterStatus}:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as StatusFilter)}
                className="text-xs px-2.5 py-1.5 bg-stone-50 dark:bg-stone-800 sepia:bg-[#EDE3CB] border border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6] rounded-xl text-stone-800 dark:text-stone-200 sepia:text-[#382716] focus:outline-hidden focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                <option value="ALL">{i18n.library.statusAll}</option>
                <option value="UNREAD">{i18n.library.statusUnread}</option>
                <option value="READ">{i18n.library.statusRead}</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1 text-xs text-stone-600 dark:text-stone-300 sepia:text-[#644E35]">
              <span className="font-medium hidden sm:inline">{i18n.library.sortBy}:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-xs px-2.5 py-1.5 bg-stone-50 dark:bg-stone-800 sepia:bg-[#EDE3CB] border border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6] rounded-xl text-stone-800 dark:text-stone-200 sepia:text-[#382716] focus:outline-hidden focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                <option value="recommended">{i18n.library.sortRecommended}</option>
                <option value="shortest">{i18n.library.sortShortest}</option>
                <option value="level">{i18n.library.sortLevel}</option>
              </select>
            </div>

            {/* Reset Filters Quick Button if active */}
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="px-2 py-1 text-[11px] text-amber-800 dark:text-amber-300 sepia:text-[#8C4712] hover:bg-amber-50 dark:hover:bg-amber-950/50 sepia:hover:bg-[#EDE3CB] rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Right: Search Input (searches title and words in story) */}
          <div className="relative min-w-[200px] w-full md:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500 sepia:text-[#8C765C]" />
            <input
              type="text"
              placeholder={i18n.library.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 dark:bg-stone-800 sepia:bg-[#EDE3CB] border border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6] rounded-full focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-stone-900 dark:text-stone-100 sepia:text-[#382716] placeholder-stone-400 dark:placeholder-stone-500 sepia:placeholder-[#8C765C]"
            />
          </div>
        </div>
      </div>

      {/* Story Grid or Friendly "More stories coming soon" Empty State */}
      {filteredAndSortedStories.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-[#1E2126] sepia:bg-[#FAF4E6] rounded-3xl border border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] p-8 space-y-3 shadow-2xs">
          <Compass size={40} className="mx-auto text-amber-800/60 dark:text-amber-400/60 sepia:text-[#8C4712]/60" />
          <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 sepia:text-[#382716]">
            {selectedLevel === 'B1' || selectedLevel === 'B2'
              ? `${i18n.library.moreStoriesComingSoon} (${getLevelLabel(selectedLevel as CEFRLevel)})`
              : i18n.library.noStoriesFound}
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 sepia:text-[#78644E] max-w-md mx-auto leading-relaxed">
            {selectedLevel === 'B1' || selectedLevel === 'B2'
              ? `Our team is curating authentic ${selectedLevel} reading material for life and work in France. In the meantime, explore our 15 A1 and A2 stories to build speed and vocabulary.`
              : i18n.library.moreStoriesComingSoonDesc}
          </p>
          <div className="pt-2">
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white dark:text-stone-950 sepia:bg-[#382716] sepia:hover:bg-[#4A3825] sepia:text-[#FAF4E6] text-white rounded-full text-xs font-semibold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
            >
              <RotateCcw size={13} />
              <span>{i18n.library.resetFilters}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAndSortedStories.map((story) => (
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
      <div className="p-5 bg-white dark:bg-[#1E2126] sepia:bg-[#FAF4E6] rounded-3xl border border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] text-xs text-stone-600 dark:text-stone-300 sepia:text-[#644E35] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-start gap-3">
          <Compass size={22} className="text-amber-800 dark:text-amber-400 sepia:text-[#8C4712] shrink-0 mt-0.5" />
          <div>
            <p className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 sepia:text-[#382716]">
              {i18n.library.placementBannerTitle}
            </p>
            <p className="leading-relaxed text-stone-500 dark:text-stone-400 sepia:text-[#78644E] mt-0.5">
              {i18n.library.placementBannerDesc}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenPlacementQuiz}
          className="px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 sepia:border-[#DDCFB6] hover:bg-stone-50 dark:hover:bg-stone-800 sepia:hover:bg-[#EDE3CB] text-stone-800 dark:text-stone-200 sepia:text-[#382716] font-semibold text-xs transition-colors shrink-0 cursor-pointer"
        >
          {userStats.placementResult ? i18n.library.retakeTestBtn : i18n.library.takeTestBtn}
        </button>
      </div>
    </div>
  );
};
