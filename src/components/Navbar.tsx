import React from 'react';
import { Bookmark, Play, Settings, TrendingUp, Sun, Moon, BookOpen } from 'lucide-react';
import { ThemeMode, AuthUser, SyncStatus } from '../types';
import { i18n } from '../i18n/en';
import { AccountMenu } from './AccountMenu';

interface NavbarProps {
  savedWordsCount: number;
  dueCardsCount: number;
  activeView: 'library' | 'reader' | 'words' | 'review' | 'progress';
  currentTheme: ThemeMode;
  user: AuthUser | null;
  syncStatus: SyncStatus;
  onOpenAuth: () => void;
  onOpenPrivacy: () => void;
  onSignOut: () => void;
  onTriggerSync: () => void;
  onAccountDeleted: () => void;
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
  user,
  syncStatus,
  onOpenAuth,
  onOpenPrivacy,
  onSignOut,
  onTriggerSync,
  onAccountDeleted,
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
          <div className="w-8 h-8 rounded-xl bg-amber-800 dark:bg-amber-600 sepia:bg-[#8C4712] text-white flex items-center justify-center font-serif font-black text-sm shadow-2xs group-hover:scale-105 transition-transform">
            LF
          </div>
          <div>
            <div className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 sepia:text-[#382716] leading-none">
              {i18n.common.appName}
            </div>
            <div className="text-[10px] text-stone-500 dark:text-stone-400 sepia:text-[#78644E] leading-tight font-medium">
              {i18n.common.tagline}
            </div>
          </div>
        </button>

        {/* Navigation Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Daily Review queue CTA button */}
          <button
            onClick={onStartReview}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              dueCardsCount > 0
                ? 'bg-amber-800 hover:bg-amber-900 dark:bg-amber-600 dark:hover:bg-amber-500 sepia:bg-[#8C4712] sepia:hover:bg-[#733A0F] text-white shadow-2xs animate-pulse hover:animate-none'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700 dark:bg-stone-800 dark:hover:bg-stone-750 dark:text-stone-300 sepia:bg-[#EDE3CB] sepia:hover:bg-[#E5D7BD] sepia:text-[#382716]'
            }`}
            title={dueCardsCount > 0 ? `${dueCardsCount} flashcards due for spaced-repetition review` : 'All caught up on reviews'}
          >
            <Play size={12} className={dueCardsCount > 0 ? 'fill-white' : ''} />
            <span className="hidden sm:inline">{i18n.common.review}</span>
            {dueCardsCount > 0 && (
              <span className="bg-white/20 text-white rounded-full px-1.5 py-0.2 text-[10px] font-bold">
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

          {/* Account Menu (Firebase Auth & Cloud Sync) */}
          <AccountMenu
            user={user}
            syncStatus={syncStatus}
            onOpenAuth={onOpenAuth}
            onOpenPrivacy={onOpenPrivacy}
            onSignOut={onSignOut}
            onTriggerSync={onTriggerSync}
            onAccountDeleted={onAccountDeleted}
          />

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
