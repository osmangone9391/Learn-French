import React from 'react';
import { Bookmark, Play, Settings, TrendingUp } from 'lucide-react';
import { i18n } from '../i18n/en';

interface NavbarProps {
  savedWordsCount: number;
  dueCardsCount: number;
  activeView: 'library' | 'reader' | 'words' | 'review' | 'progress';
  onOpenSavedWords: () => void;
  onStartReview: () => void;
  onOpenProgress: () => void;
  onOpenSettings: () => void;
  onResetView: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  savedWordsCount,
  dueCardsCount,
  activeView,
  onOpenSavedWords,
  onStartReview,
  onOpenProgress,
  onOpenSettings,
  onResetView
}) => {
  return (
    <nav className="bg-white border-b border-stone-200 px-4 py-2.5 sticky top-0 z-20">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={onResetView}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-800 text-amber-50 flex items-center justify-center font-serif font-bold text-lg shadow-xs group-hover:bg-amber-900 transition-colors">
            LF
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-stone-900 text-lg tracking-tight group-hover:text-amber-900 transition-colors">
                {i18n.common.appName}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-900">
                French Reader
              </span>
            </div>
            <p className="text-[11px] text-stone-500 hidden sm:block">
              {i18n.common.tagline}
            </p>
          </div>
        </button>

        {/* Navigation Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Review button */}
          <button
            onClick={onStartReview}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeView === 'review'
                ? 'bg-amber-800 text-white shadow-xs'
                : dueCardsCount > 0
                ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
            title="Spaced Repetition Review"
          >
            <Play size={12} fill="currentColor" />
            <span>{i18n.common.review}</span>
            {dueCardsCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-amber-800 text-white rounded-full text-[10px]">
                {dueCardsCount}
              </span>
            )}
          </button>

          {/* Words page button */}
          <button
            onClick={onOpenSavedWords}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeView === 'words'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
            title="My Saved Words"
          >
            <Bookmark size={13} className={savedWordsCount > 0 ? 'text-amber-700 fill-amber-700' : ''} />
            <span className="hidden sm:inline">{i18n.common.words}</span>
            <span>({savedWordsCount})</span>
          </button>

          {/* Progress button */}
          <button
            onClick={onOpenProgress}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeView === 'progress'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
            title="Learning Progress"
          >
            <TrendingUp size={13} />
            <span className="hidden sm:inline">{i18n.common.progress}</span>
          </button>

          {/* Settings button */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
            title={i18n.common.settings}
          >
            <Settings size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
};
