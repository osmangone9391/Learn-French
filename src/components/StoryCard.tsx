import React from 'react';
import { Clock, BookText, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { Story } from '../types';
import { i18n } from '../i18n/en';

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
  const levelLabel =
    story.level === 'A1'
      ? i18n.levels.A1
      : story.level === 'A2'
      ? i18n.levels.A2
      : i18n.levels.B1;

  return (
    <div
      onClick={() => onSelect(story)}
      className="group relative bg-white rounded-2xl border border-stone-200/90 hover:border-amber-400 p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
              {levelLabel}
            </span>
            <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
              {story.topic}
            </span>
          </div>

          {isRead && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 size={13} /> {i18n.common.read}
            </span>
          )}
        </div>

        {/* Title and Subtitle */}
        <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
          {story.title}
        </h3>
        <p className="mt-1 text-sm text-stone-600 line-clamp-2 leading-relaxed">
          {story.subtitle}
        </p>
      </div>

      {/* Meta info & Footer */}
      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <BookText size={13} className="text-stone-400" />
            {story.wordCount} words
          </span>
          <span className="flex items-center gap-1">
            <Clock size={13} className="text-stone-400" />
            ~{story.estimatedMinutes} min
          </span>
          {savedWordsCount > 0 && (
            <span className="text-amber-700 font-medium">
              ★ {savedWordsCount} saved
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-stone-700 font-medium group-hover:translate-x-0.5 transition-transform">
          {quizScore !== undefined && (
            <span className="inline-flex items-center gap-0.5 text-xs text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded mr-1">
              <HelpCircle size={11} /> {quizScore}%
            </span>
          )}
          <span className="hidden sm:inline">{i18n.common.read}</span>
          <ChevronRight size={16} />
        </div>
      </div>
    </div>
  );
};
