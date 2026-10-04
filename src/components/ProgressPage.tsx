import React, { useMemo } from 'react';
import {
  ArrowLeft,
  Flame,
  Award,
  BookOpen,
  Bookmark,
  CheckCircle2,
  Calendar,
  Layers,
  HelpCircle,
  TrendingUp,
  BarChart2
} from 'lucide-react';
import { Story, UserStats, SavedWord } from '../types';
import {
  generate16WeekHeatmap,
  getThisWeekSummary,
  getLast30DaysReviewChart,
  calculateOverallAccuracy,
  calculateAverageQuizScore,
  HeatmapDay
} from '../utils/stats';
import { i18n } from '../i18n/en';

interface ProgressPageProps {
  stories: Story[];
  userStats: UserStats;
  savedWords: SavedWord[];
  onOpenPlacementQuiz: () => void;
  onBack: () => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  stories,
  userStats,
  savedWords,
  onOpenPlacementQuiz,
  onBack
}) => {
  // Heatmap data (16 weeks = 112 days)
  const heatmapDays = useMemo(() => {
    return generate16WeekHeatmap(userStats.activityLog);
  }, [userStats.activityLog]);

  // "This week" summary
  const weekSummary = useMemo(() => {
    return getThisWeekSummary(userStats.activityLog);
  }, [userStats.activityLog]);

  // 30 days review data for SVG chart
  const review30Days = useMemo(() => {
    return getLast30DaysReviewChart(userStats.activityLog);
  }, [userStats.activityLog]);

  // Metrics
  const masteredCount = savedWords.filter(w => w.srsStage >= 5).length;
  const overallAccuracy = calculateOverallAccuracy(userStats.reviewHistory);
  const averageQuizScore = calculateAverageQuizScore(userStats.quizHistory);

  // Group heatmap days into 16 weekly columns of 7 days
  const heatmapWeeks = useMemo(() => {
    const weeks: HeatmapDay[][] = [];
    for (let i = 0; i < heatmapDays.length; i += 7) {
      weeks.push(heatmapDays.slice(i, i + 7));
    }
    return weeks;
  }, [heatmapDays]);

  const maxReviewsIn30Days = useMemo(() => {
    const max = Math.max(...review30Days.map(d => d.count), 0);
    return Math.max(max, 10);
  }, [review30Days]);

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-amber-200 border-amber-300';
      case 2:
        return 'bg-amber-400 border-amber-500';
      case 3:
        return 'bg-amber-600 border-amber-700';
      case 4:
        return 'bg-amber-800 border-amber-900';
      case 0:
      default:
        return 'bg-stone-100 border-stone-200';
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-24 text-stone-900">
      {/* Top Header */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-stone-700 hover:text-stone-950 p-1.5 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
            <span>{i18n.reader.backBtn}</span>
          </button>

          <span className="text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full flex items-center gap-1.5">
            <Flame size={13} className="text-orange-600" />
            Current streak: {userStats.streakDays} {userStats.streakDays === 1 ? 'day' : 'days'}
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 pt-6 space-y-6">
        {/* Page Title & Level Banner */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-amber-800 block mb-1">
              Learning Dashboard
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950 tracking-tight">
              {i18n.progress.title}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-lg leading-relaxed">
              {i18n.progress.subtitle}
            </p>
          </div>

          {/* Current Recommended Level & Placement Button */}
          <div className="bg-amber-50/80 border border-amber-200 p-3.5 rounded-2xl flex items-center justify-between sm:justify-start gap-4">
            <div>
              <div className="text-[10px] uppercase font-bold text-amber-800">
                {i18n.progress.recommendedLevelBadge}
              </div>
              <div className="text-xl font-serif font-bold text-stone-900 flex items-center gap-1">
                <span>{userStats.recommendedLevel || 'A1'}</span>
                <span className="text-xs font-sans font-normal text-stone-600">
                  {userStats.placementResult ? `(${userStats.placementResult.score}/${userStats.placementResult.total})` : '(Auto)'}
                </span>
              </div>
            </div>
            <button
              onClick={onOpenPlacementQuiz}
              className="px-3 py-1.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors shrink-0 cursor-pointer"
            >
              {userStats.placementResult ? i18n.library.retakeTestBtn : i18n.library.takeTestBtn}
            </button>
          </div>
        </div>

        {/* 6 Core KPI Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* 1. Stories Read */}
          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-stone-400">
              <BookOpen size={16} />
              <span className="text-[10px] font-bold uppercase text-stone-500">Reading</span>
            </div>
            <div className="text-2xl font-bold text-stone-950">
              {userStats.storiesReadIds.length} <span className="text-xs font-normal text-stone-400">/ {stories.length}</span>
            </div>
            <div className="text-[11px] text-stone-500">{i18n.progress.kpiStoriesRead}</div>
          </div>

          {/* 2. Total Words Read */}
          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-stone-400">
              <TrendingUp size={16} />
              <span className="text-[10px] font-bold uppercase text-stone-500">Volume</span>
            </div>
            <div className="text-2xl font-bold text-stone-950">
              {userStats.totalWordsRead.toLocaleString()}
            </div>
            <div className="text-[11px] text-stone-500">{i18n.progress.kpiWordsRead}</div>
          </div>

          {/* 3. Words Saved */}
          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-stone-400">
              <Bookmark size={16} />
              <span className="text-[10px] font-bold uppercase text-stone-500">Lexicon</span>
            </div>
            <div className="text-2xl font-bold text-stone-950">
              {savedWords.length}
            </div>
            <div className="text-[11px] text-stone-500">{i18n.progress.kpiWordsSaved}</div>
          </div>

          {/* 4. Words Mastered */}
          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-stone-400">
              <Award size={16} className="text-emerald-600" />
              <span className="text-[10px] font-bold uppercase text-emerald-800">Box 5</span>
            </div>
            <div className="text-2xl font-bold text-emerald-700">
              {masteredCount}
            </div>
            <div className="text-[11px] text-stone-500">{i18n.progress.kpiMastered}</div>
          </div>

          {/* 5. Review Accuracy */}
          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-stone-400">
              <Layers size={16} />
              <span className="text-[10px] font-bold uppercase text-stone-500">SRS</span>
            </div>
            <div className="text-2xl font-bold text-stone-950">
              {overallAccuracy}%
            </div>
            <div className="text-[11px] text-stone-500">{i18n.progress.kpiAccuracy}</div>
          </div>

          {/* 6. Average Quiz Score */}
          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs space-y-1">
            <div className="flex items-center justify-between text-stone-400">
              <HelpCircle size={16} />
              <span className="text-[10px] font-bold uppercase text-stone-500">Quizzes</span>
            </div>
            <div className="text-2xl font-bold text-stone-950">
              {averageQuizScore}%
            </div>
            <div className="text-[11px] text-stone-500">{i18n.progress.kpiQuizAvg}</div>
          </div>
        </div>

        {/* 16-Week Activity Calendar (Heatmap Grid) */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
                <Calendar size={18} className="text-amber-800" />
                <span>{i18n.progress.calendarTitle}</span>
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                {i18n.progress.calendarSubtitle}
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-stone-600">
              <span className="flex items-center gap-1 font-medium">
                <Flame size={14} className="text-orange-600" />
                {i18n.progress.streakMax} <strong className="text-stone-900">{userStats.longestStreak || 1} days</strong>
              </span>
            </div>
          </div>

          {/* Heatmap Grid */}
          <div className="overflow-x-auto pb-2 scrollbar-none">
            <div className="inline-flex flex-col gap-1 min-w-[500px]">
              {[1, 3, 5].map((dayIdx) => {
                const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                return (
                  <div key={dayIdx} className="flex items-center gap-1 text-[9px] text-stone-400 mb-0.5">
                    <span className="w-6">{dayLabels[dayIdx]}</span>
                    <div className="flex items-center gap-1">
                      {heatmapWeeks.map((week, wIdx) => {
                        const day = week[dayIdx];
                        if (!day) return <div key={wIdx} className="w-3.5 h-3.5" />;
                        return (
                          <div
                            key={wIdx}
                            title={`${day.date}: ${day.reviews} reviews, ${day.storiesRead} stories, ${day.quizzes} quizzes`}
                            className={`w-3.5 h-3.5 rounded-xs border transition-transform hover:scale-125 ${getHeatmapColor(
                              day.level
                            )}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend & "This Week" Summary */}
          <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3 text-stone-600">
              <span className="font-semibold text-stone-900">{i18n.progress.thisWeekLabel}</span>
              <span><strong>{weekSummary.daysActive}</strong> {i18n.progress.thisWeekDays}</span>
              <span>•</span>
              <span><strong>{weekSummary.cardsReviewed}</strong> {i18n.progress.thisWeekReviews}</span>
              <span>•</span>
              <span><strong>{weekSummary.storiesRead}</strong> {i18n.progress.thisWeekStories}</span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
              <span>{i18n.progress.lessActivity}</span>
              <div className="w-3 h-3 rounded-xs bg-stone-100 border border-stone-200" />
              <div className="w-3 h-3 rounded-xs bg-amber-200 border border-amber-300" />
              <div className="w-3 h-3 rounded-xs bg-amber-400 border border-amber-500" />
              <div className="w-3 h-3 rounded-xs bg-amber-600 border border-amber-700" />
              <div className="w-3 h-3 rounded-xs bg-amber-800 border border-amber-900" />
              <span>{i18n.progress.moreActivity}</span>
            </div>
          </div>
        </div>

        {/* 30-Day Review Volume Bar Chart (Pure SVG) */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
          <div>
            <h2 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
              <BarChart2 size={18} className="text-amber-800" />
              <span>{i18n.progress.chartTitle}</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {i18n.progress.chartSubtitle}
            </p>
          </div>

          <div className="w-full h-44 pt-2">
            <svg viewBox="0 0 600 140" className="w-full h-full overflow-visible">
              <line x1="0" y1="20" x2="600" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="60" x2="600" y2="60" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="100" x2="600" y2="100" stroke="#f1f5f9" strokeWidth="1" />

              {review30Days.map((d, idx) => {
                const barWidth = 14;
                const gap = (600 - 30 * barWidth) / 29;
                const x = idx * (barWidth + gap);
                const height = Math.round((d.count / maxReviewsIn30Days) * 90);
                const y = 110 - height;

                return (
                  <g key={d.date} className="group cursor-pointer">
                    <rect
                      x={x}
                      y={y}
                      width={barWidth}
                      height={Math.max(height, 2)}
                      rx="3"
                      fill={d.count > 0 ? '#b45309' : '#e2e8f0'}
                      className="transition-colors group-hover:fill-amber-600"
                    />
                    <title>{`${d.date}: ${d.count} cards reviewed`}</title>
                    {idx % 5 === 0 && (
                      <text
                        x={x + barWidth / 2}
                        y="126"
                        textAnchor="middle"
                        fontSize="9"
                        fill="#94a3b8"
                      >
                        {d.dayLabel}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Per-Story Comprehension Quiz Scores Breakdown */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
          <div>
            <h2 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-amber-800" />
              <span>{i18n.progress.quizScoresTitle}</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {i18n.progress.quizScoresSubtitle}
            </p>
          </div>

          <div className="divide-y divide-stone-100">
            {stories.map((story) => {
              const record = userStats.quizHistory?.[story.id];
              const isRead = userStats.storiesReadIds.includes(story.id);

              return (
                <div
                  key={story.id}
                  className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                        {story.level}
                      </span>
                      <h4 className="text-sm font-serif font-bold text-stone-900">
                        {story.title}
                      </h4>
                      {isRead && (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {i18n.common.read}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {story.topic} • {story.wordCount} words
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {record ? (
                      <div className="flex items-center gap-3 text-xs">
                        <div className="text-right">
                          <div className="font-bold text-stone-900">
                            {i18n.progress.bestScore} <span className="text-emerald-700">{record.bestScore}%</span>
                          </div>
                          <div className="text-[11px] text-stone-400">
                            {i18n.progress.lastScore} {record.lastScore}% ({record.attempts} {i18n.progress.attempts})
                          </div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-stone-400 italic">
                        {i18n.progress.notAttempted}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};
