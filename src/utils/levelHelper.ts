import { CEFRLevel } from '../types';
import { i18n } from '../i18n/en';

export const ALL_CEFR_LEVELS: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2'];

export function getLevelLabel(level: CEFRLevel): string {
  switch (level) {
    case 'A1':
      return i18n.levels.A1;
    case 'A2':
      return i18n.levels.A2;
    case 'B1':
      return i18n.levels.B1;
    case 'B2':
      return i18n.levels.B2;
    default:
      return level;
  }
}

/**
 * Returns accessible, high-contrast badge classes for each level
 * across Light (cream), Dark (charcoal), and Sepia modes (WCAG AA / AAA compliant).
 */
export function getLevelBadgeClasses(level: CEFRLevel): string {
  switch (level) {
    case 'A1':
      return 'bg-emerald-100 text-emerald-950 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-200 dark:border-emerald-700 sepia:bg-emerald-200/80 sepia:text-emerald-950 sepia:border-emerald-400';
    case 'A2':
      return 'bg-sky-100 text-sky-950 border-sky-300 dark:bg-sky-950/80 dark:text-sky-200 dark:border-sky-700 sepia:bg-sky-200/80 sepia:text-sky-950 sepia:border-sky-400';
    case 'B1':
      return 'bg-amber-100 text-amber-950 border-amber-300 dark:bg-amber-950/80 dark:text-amber-200 dark:border-amber-700 sepia:bg-amber-200/80 sepia:text-amber-950 sepia:border-amber-400';
    case 'B2':
      return 'bg-purple-100 text-purple-950 border-purple-300 dark:bg-purple-950/80 dark:text-purple-200 dark:border-purple-700 sepia:bg-purple-200/80 sepia:text-purple-950 sepia:border-purple-400';
    default:
      return 'bg-stone-100 text-stone-900 border-stone-300 dark:bg-stone-800 dark:text-stone-200 dark:border-stone-700 sepia:bg-stone-200 sepia:text-stone-900 sepia:border-stone-400';
  }
}

/**
 * Filter button classes for each level when selected vs unselected
 */
export function getLevelFilterButtonClasses(level: CEFRLevel, isSelected: boolean): string {
  if (isSelected) {
    switch (level) {
      case 'A1':
        return 'bg-emerald-800 text-white border-emerald-800 shadow-xs dark:bg-emerald-700 dark:border-emerald-600 sepia:bg-emerald-900 sepia:border-emerald-900';
      case 'A2':
        return 'bg-sky-800 text-white border-sky-800 shadow-xs dark:bg-sky-700 dark:border-sky-600 sepia:bg-sky-900 sepia:border-sky-900';
      case 'B1':
        return 'bg-amber-800 text-white border-amber-800 shadow-xs dark:bg-amber-700 dark:border-amber-600 sepia:bg-amber-900 sepia:border-amber-900';
      case 'B2':
        return 'bg-purple-800 text-white border-purple-800 shadow-xs dark:bg-purple-700 dark:border-purple-600 sepia:bg-purple-900 sepia:border-purple-900';
      default:
        return 'bg-stone-900 text-white border-stone-900 dark:bg-stone-100 dark:text-stone-950 sepia:bg-stone-900';
    }
  }

  // Unselected
  switch (level) {
    case 'A1':
      return 'bg-emerald-50 text-emerald-900 border-emerald-200/80 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800/60 dark:hover:bg-emerald-950/60 sepia:bg-emerald-100/60 sepia:text-emerald-950 sepia:border-emerald-300';
    case 'A2':
      return 'bg-sky-50 text-sky-900 border-sky-200/80 hover:bg-sky-100 dark:bg-sky-950/30 dark:text-sky-300 dark:border-sky-800/60 dark:hover:bg-sky-950/60 sepia:bg-sky-100/60 sepia:text-sky-950 sepia:border-sky-300';
    case 'B1':
      return 'bg-amber-50 text-amber-900 border-amber-200/80 hover:bg-amber-100 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800/60 dark:hover:bg-amber-950/60 sepia:bg-amber-100/60 sepia:text-amber-950 sepia:border-amber-300';
    case 'B2':
      return 'bg-purple-50 text-purple-900 border-purple-200/80 hover:bg-purple-100 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800/60 dark:hover:bg-purple-950/60 sepia:bg-purple-100/60 sepia:text-purple-950 sepia:border-purple-300';
    default:
      return 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200 dark:bg-stone-800/60 dark:text-stone-300 dark:border-stone-700 dark:hover:bg-stone-800 sepia:bg-stone-200/60 sepia:text-stone-800 sepia:border-stone-300';
  }
}
