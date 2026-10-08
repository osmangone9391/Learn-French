import React from 'react';
import { Clock, BookText, CheckCircle2, ChevronRight, Award, HelpCircle } from 'lucide-react';
import { Story } from '../types';
import { i18n } from '../i18n/en';
import { getLevelLabel, getLevelBadgeClasses } from '../utils/levelHelper';

interface StoryCardProps {
  story: Story;
  isRead: boolean;
  savedWordsCount: number;
  quizScore?: number;
  onSelect: (story: Story) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  story,
  isRead,
  savedWordsCount,
  quizScore,
  onSelect
}) => {
  const levelLabel = getLevelLabel(story.level);
  const levelBadgeClass = getLevelBadgeClasses(story.level);

  // 100 words per minute for language learners
  const estimatedMins = Math.max(1, Math.ceil(story.wordCount / 100));

  // Topics array with fallback to single topic
  const topicsList = story.topics && story.topics.length > 0 ? story.topics : [story.topic];

  return (
    <div
      onClick={() => onSelect(story)}
      className="group relative bg-white dark:bg-[#1E2126] sepia:bg-[#FAF4E6] rounded-2xl border border-stone-200/90 dark:border-stone-800 sepia:border-[#DDCFB6] hover:border-amber-500 dark:hover:border-amber-400 sepia:hover:border-[#B45309] p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Level Badge (A1, A2, B1, B2) */}
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${levelBadgeClass}`}
            >
              {levelLabel}
            </span>

            {/* Topic tags */}
            {topicsList.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="text-[11px] font-medium text-stone-600 dark:text-stone-300 sepia:text-[#644E35] bg-stone-100 dark:bg-stone-800/80 sepia:bg-[#EDE3CB] px-2 py-0.5 rounded-md border border-stone-200/60 dark:border-stone-700/60 sepia:border-[#DDCFB6]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Read Status Badge */}
          <div className="flex items-center gap-1.5 shrink-0">
            {isRead && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800/80 sepia:bg-emerald-200/70 sepia:text-emerald-950 sepia:border-emerald-400 px-2 py-0.5 rounded-full border border-emerald-300">
                <CheckCircle2 size={13} /> {i18n.common.read}
              </span>
            )}
          </div>
        </div>

        {/* Title and Subtitle */}
        <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 sepia:text-[#382716] group-hover:text-amber-800 dark:group-hover:text-amber-300 sepia:group-hover:text-[#8C4712] transition-colors">
          {story.title}
        </h3>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-300 sepia:text-[#644E35] line-clamp-2 leading-relaxed">
          {story.subtitle}
        </p>
      </div>

      {/* Meta info & Footer */}
      <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800/80 sepia:border-[#E8DEC7] flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 sepia:text-[#78644E]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <BookText size={13} className="text-stone-400 dark:text-stone-500 sepia:text-[#8C765C]" />
            {story.wordCount} words
          </span>

          {/* Reading time at 100 wpm with tooltip */}
          <span
            className="flex items-center gap-1 cursor-help underline decoration-dotted decoration-stone-300 dark:decoration-stone-600 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
            title={i18n.library.readingTimeTooltip}
          >
            <Clock size={13} className="text-stone-400 dark:text-stone-500 sepia:text-[#8C765C]" />
            ~{estimatedMins} min
          </span>

          {savedWordsCount > 0 && (
            <span className="text-amber-800 dark:text-amber-300 sepia:text-[#8C4712] font-semibold">
              ★ {savedWordsCount} saved
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-stone-700 dark:text-stone-300 sepia:text-[#4A3825] font-medium group-hover:translate-x-0.5 transition-transform">
          {quizScore !== undefined && (
            <span
              className="inline-flex items-center gap-0.5 text-xs text-indigo-800 bg-indigo-50 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-800 border border-indigo-200 sepia:bg-indigo-200/70 sepia:text-indigo-950 sepia:border-indigo-400 px-1.5 py-0.5 rounded font-semibold mr-1"
              title="Best quiz score"
            >
              <Award size={11} /> {quizScore}%
            </span>
          )}
          <span className="hidden sm:inline">{i18n.common.read}</span>
          <ChevronRight size={16} />
        </div>
      </div>
    </div>
  );
};
