import React from 'react';
import { Bookmark, Play, Settings, TrendingUp, Sun, Moon, BookOpen } from 'lucide-react';
import { ThemeMode } from '../types';
import { i18n } from '../i18n/en';

interface NavbarProps {
  savedWordsCount: number;
  dueCardsCount: number;
  activeView: 'library' | 'reader' | 'words' | 'review' | 'progress';
  currentTheme: ThemeMode;
  onOpenSavedWords: () => void;
  onStartReview: () => void;
  onOpenProgress: () => void;
  onOpenSettings: () => void;
  onResetView: () => void;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  savedWordsCount,
  dueCardsCount,
  activeView,
  currentTheme,
  onOpenSavedWords,
  onStartReview,
  onOpenProgress,
  onOpenSettings,
  onResetView,
  onToggleTheme
}) => {
  return (
    <nav className="bg-white/95 dark:bg-[#1E2126]/95 sepia:bg-[#FAF4E6]/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] px-4 py-2.5 sticky top-0 z-20 transition-colors">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={onResetView}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-800 dark:bg-amber-700 sepia:bg-[#8C4712] text-amber-50 flex items-center justify-center font-serif font-bold text-lg shadow-xs group-hover:bg-amber-900 transition-colors">
            LF
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-stone-900 dark:text-stone-100 sepia:text-[#382716] text-lg tracking-tight group-hover:text-amber-800 dark:group-hover:text-amber-300 sepia:group-hover:text-[#8C4712] transition-colors">
                {i18n.common.appName}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-950 dark:bg-amber-950/70 dark:text-amber-200 sepia:bg-amber-200/80 sepia:text-amber-950 border border-amber-200 dark:border-amber-800 sepia:border-amber-400">
                French Reader
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 sepia:text-[#78644E] hidden sm:block">
              {i18n.common.tagline}
            </p>
          </div>
        </button>

        {/* Navigation Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Review button */}
          <button
            onClick={onStartReview}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeView === 'review'
                ? 'bg-amber-800 text-white shadow-xs'
                : dueCardsCount > 0
                ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 dark:bg-amber-950/70 dark:text-amber-200 dark:border-amber-800 sepia:bg-amber-200/80 sepia:text-amber-950 sepia:border-amber-400'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700 dark:bg-stone-800 dark:hover:bg-stone-750 dark:text-stone-300 sepia:bg-[#EDE3CB] sepia:hover:bg-[#E5D7BD] sepia:text-[#382716]'
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
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeView === 'words'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 sepia:bg-[#382716] sepia:text-[#FAF4E6]'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700 dark:bg-stone-800 dark:hover:bg-stone-750 dark:text-stone-300 sepia:bg-[#EDE3CB] sepia:hover:bg-[#E5D7BD] sepia:text-[#382716]'
            }`}
            title="My Saved Words"
          >
            <Bookmark size={13} className={savedWordsCount > 0 ? 'text-amber-700 fill-amber-700 dark:text-amber-400 dark:fill-amber-400' : ''} />
            <span className="hidden sm:inline">{i18n.common.words}</span>
            <span>({savedWordsCount})</span>
          </button>

          {/* Progress button */}
          <button
            onClick={onOpenProgress}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeView === 'progress'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 sepia:bg-[#382716] sepia:text-[#FAF4E6]'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700 dark:bg-stone-800 dark:hover:bg-stone-750 dark:text-stone-300 sepia:bg-[#EDE3CB] sepia:hover:bg-[#E5D7BD] sepia:text-[#382716]'
            }`}
            title="Learning Progress"
          >
            <TrendingUp size={13} />
            <span className="hidden sm:inline">{i18n.common.progress}</span>
          </button>

          {/* Quick Theme Switcher Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full text-stone-600 hover:text-stone-900 dark:text-stone-300 dark:hover:text-white sepia:text-[#382716] hover:bg-stone-100 dark:hover:bg-stone-800 sepia:hover:bg-[#EDE3CB] transition-colors cursor-pointer"
            title={`Theme: ${currentTheme.toUpperCase()} (Click to toggle Light / Sepia / Dark)`}
          >
            {currentTheme === 'dark' ? (
              <Moon size={16} className="text-amber-400" />
            ) : currentTheme === 'sepia' ? (
              <BookOpen size={16} className="text-[#8C4712]" />
            ) : (
              <Sun size={16} className="text-amber-700" />
            )}
          </button>

          {/* Settings button */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-full text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-100 sepia:text-[#78644E] sepia:hover:text-[#382716] hover:bg-stone-100 dark:hover:bg-stone-800 sepia:hover:bg-[#EDE3CB] transition-colors cursor-pointer"
            title={i18n.common.settings}
          >
            <Settings size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
};
