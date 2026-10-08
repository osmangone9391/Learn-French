import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  Volume2,
  Trash2,
  Bookmark,
  Layers,
  Calendar,
  BookOpen,
  Play
} from 'lucide-react';
import { SavedWord, AppSettings } from '../types';
import { audioPlayer } from '../utils/audioPlayer';
import { LEITNER_INTERVALS_DAYS, toDateString, isCardDue } from '../utils/srs';
import { i18n } from '../i18n/en';
import { getGrammarForSavedWord } from '../utils/grammarHelper';
import { GrammarChips } from './GrammarChips';

interface SavedWordsListProps {
  savedWords: SavedWord[];
  settings: AppSettings;
  onRemoveWord: (id: string) => void;
  onStartReview: () => void;
  onBack: () => void;
}

type FilterType = 'all' | 'new' | 'learning' | 'mastered';

export const SavedWordsList: React.FC<SavedWordsListProps> = ({
  savedWords,
  settings,
  onRemoveWord,
  onStartReview,
  onBack
}) => {
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Counts for tabs
  const counts = useMemo(() => {
    let newCount = 0;
    let learningCount = 0;
    let masteredCount = 0;
    let dueCount = 0;

    savedWords.forEach(w => {
      if (w.srsStage >= 5) {
        masteredCount++;
      } else if (w.timesReviewed === 0) {
        newCount++;
      } else {
        learningCount++;
      }

      if (isCardDue(w)) {
        dueCount++;
      }
    });

    return {
      all: savedWords.length,
      new: newCount,
      learning: learningCount,
      mastered: masteredCount,
      due: dueCount
    };
  }, [savedWords]);

  // Filtered list
  const filteredWords = useMemo(() => {
    return savedWords.filter(w => {
      // Status filter
      if (filterType === 'new' && (w.timesReviewed > 0 || w.srsStage >= 5)) return false;
      if (filterType === 'learning' && (w.timesReviewed === 0 || w.srsStage >= 5)) return false;
      if (filterType === 'mastered' && w.srsStage < 5) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          w.word.toLowerCase().includes(q) ||
          w.lemma.toLowerCase().includes(q) ||
          w.en.toLowerCase().includes(q) ||
          w.bn.toLowerCase().includes(q) ||
          w.storyTitle.toLowerCase().includes(q) ||
          w.sentence.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });
  }, [savedWords, filterType, searchQuery]);

  const handlePlayWord = (word: string) => {
    audioPlayer.play({
      text: word,
      speed: settings.playbackRate,
      lang: 'fr'
    });
  };

  const handlePlaySentence = (sentence: string) => {
    audioPlayer.play({
      text: sentence,
      speed: settings.playbackRate,
      lang: 'fr'
    });
  };

  return (
    <div className="min-h-screen pb-24 text-stone-900 dark:text-stone-100 sepia:text-[#382716]">
      {/* Top Header */}
      <header className="sticky top-0 z-20 bg-white/95 dark:bg-[#1E2126]/95 sepia:bg-[#FAF4E6]/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              audioPlayer.stop();
              onBack();
            }}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-stone-700 dark:text-stone-300 sepia:text-[#4A3825] hover:text-stone-950 dark:hover:text-white sepia:hover:text-[#382716] p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 sepia:hover:bg-[#EDE3CB] transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
            <span>{i18n.reader.backBtn}</span>
          </button>

          {counts.due > 0 && (
            <button
              onClick={onStartReview}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-800 hover:bg-amber-900 dark:bg-amber-700 dark:hover:bg-amber-600 text-white shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <Play size={13} fill="currentColor" />
              <span>{i18n.wordsPage.startReviewBtn} ({counts.due})</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-4 pt-6 space-y-6">
        {/* Page Title & Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#1E2126] sepia:bg-[#FAF4E6] p-5 sm:p-6 rounded-3xl border border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] shadow-2xs">
          <div>
            <h1 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 sepia:text-[#382716] flex items-center gap-2">
              <Bookmark size={22} className="text-amber-800 dark:text-amber-400 sepia:text-[#8C4712]" />
              <span>{i18n.wordsPage.title}</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 sepia:text-[#78644E] mt-1">
              {i18n.wordsPage.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-center px-3 py-1.5 bg-amber-50 dark:bg-amber-950/60 sepia:bg-amber-200/70 rounded-xl border border-amber-200 dark:border-amber-800 sepia:border-amber-400 text-amber-950 dark:text-amber-200 sepia:text-amber-950">
              <div className="text-lg font-bold">{counts.mastered}</div>
              <div className="text-[10px] uppercase font-semibold">{i18n.wordsPage.masteredBadge}</div>
            </div>
            <div className="text-center px-3 py-1.5 bg-stone-100 dark:bg-stone-800/80 sepia:bg-[#EDE3CB] rounded-xl border border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6] text-stone-700 dark:text-stone-300 sepia:text-[#382716]">
              <div className="text-lg font-bold">{counts.all}</div>
              <div className="text-[10px] uppercase font-semibold">{i18n.wordsPage.totalBadge}</div>
            </div>
          </div>
        </div>

        {/* Filter Tabs and Search Bar */}
        <div className="space-y-3">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                filterType === 'all'
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 sepia:bg-[#382716] sepia:text-[#FAF4E6] shadow-xs'
                  : 'bg-white dark:bg-stone-800 sepia:bg-[#FAF4E6] hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 sepia:text-[#382716] border border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6]'
              }`}
            >
              {i18n.wordsPage.filterAll} ({counts.all})
            </button>
            <button
              onClick={() => setFilterType('new')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                filterType === 'new'
                  ? 'bg-amber-800 text-white dark:bg-amber-700 shadow-xs'
                  : 'bg-white dark:bg-stone-800 sepia:bg-[#FAF4E6] hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 sepia:text-[#382716] border border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6]'
              }`}
            >
              {i18n.wordsPage.filterNew} ({counts.new})
            </button>
            <button
              onClick={() => setFilterType('learning')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                filterType === 'learning'
                  ? 'bg-sky-800 text-white dark:bg-sky-700 shadow-xs'
                  : 'bg-white dark:bg-stone-800 sepia:bg-[#FAF4E6] hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 sepia:text-[#382716] border border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6]'
              }`}
            >
              {i18n.wordsPage.filterLearning} ({counts.learning})
            </button>
            <button
              onClick={() => setFilterType('mastered')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                filterType === 'mastered'
                  ? 'bg-emerald-800 text-white dark:bg-emerald-700 shadow-xs'
                  : 'bg-white dark:bg-stone-800 sepia:bg-[#FAF4E6] hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 sepia:text-[#382716] border border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6]'
              }`}
            >
              {i18n.wordsPage.filterMastered} ({counts.mastered})
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500 sepia:text-[#8C765C]" />
            <input
              type="text"
              placeholder={i18n.wordsPage.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-[#1E2126] sepia:bg-[#FAF4E6] border border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] rounded-2xl focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-900 dark:text-stone-100 sepia:text-[#382716] shadow-2xs placeholder-stone-400 dark:placeholder-stone-500 sepia:placeholder-[#8C765C]"
            />
          </div>
        </div>

        {/* Word Cards List */}
        {filteredWords.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#1E2126] sepia:bg-[#FAF4E6] rounded-3xl border border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] p-8 space-y-3">
            <BookOpen size={36} className="mx-auto text-stone-300 dark:text-stone-600 sepia:text-[#C4B398]" />
            <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200 sepia:text-[#382716]">
              {i18n.wordsPage.emptyTitle}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 sepia:text-[#78644E] max-w-sm mx-auto">
              {i18n.wordsPage.emptyDesc}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredWords.map((item) => {
              const isMastered = item.srsStage >= 5;
              const due = isCardDue(item);
              const grammar = getGrammarForSavedWord(item);

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-[#1E2126] sepia:bg-[#FAF4E6] rounded-2xl border border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] p-4 sm:p-5 hover:border-amber-300 dark:hover:border-amber-700 sepia:hover:border-amber-600 transition-all shadow-2xs space-y-3"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-xl font-serif font-bold text-stone-950 dark:text-stone-50 sepia:text-[#382716]">
                          {item.word}
                        </span>
                      </div>

                      {/* Grammar Chips line */}
                      <div className="mt-1">
                        <GrammarChips grammar={grammar} compact />
                      </div>

                      {/* Translations */}
                      <div className="mt-1.5 flex items-center gap-2 flex-wrap text-sm">
                        <span className="font-semibold text-amber-950 dark:text-amber-200 sepia:text-[#783908] bg-amber-50 dark:bg-amber-950/60 sepia:bg-amber-100/70 px-2 py-0.5 rounded-lg border border-amber-200/60 dark:border-amber-800/60 sepia:border-amber-300 font-bn">
                          {item.bn}
                        </span>
                        <span className="text-stone-600 dark:text-stone-300 sepia:text-[#644E35] font-medium">
                          • {item.en}
                        </span>
                      </div>
                    </div>

                    {/* Right SRS Badge and Actions */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Box badge */}
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border ${
                          isMastered
                            ? 'bg-emerald-50 dark:bg-emerald-950/70 sepia:bg-emerald-100/80 text-emerald-800 dark:text-emerald-200 sepia:text-emerald-950 border-emerald-300 dark:border-emerald-800 sepia:border-emerald-400'
                            : 'bg-stone-100 dark:bg-stone-800 sepia:bg-[#EDE3CB] text-stone-700 dark:text-stone-300 sepia:text-[#382716] border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6]'
                        }`}
                        title={`Box ${item.srsStage} (review interval: ${LEITNER_INTERVALS_DAYS[item.srsStage]} days)`}
                      >
                        <Layers size={11} />
                        {isMastered ? 'Mastered (Box 5)' : `Box ${item.srsStage}`}
                      </span>

                      {/* Audio button */}
                      <button
                        onClick={() => handlePlayWord(item.word)}
                        className="p-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 sepia:text-indigo-900 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors cursor-pointer"
                        title="Listen to word"
                      >
                        <Volume2 size={16} />
                      </button>

                      {/* Delete button */}
                      <button
                        onClick={() => onRemoveWord(item.id)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                        title={i18n.common.delete}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Context sentence */}
                  {item.sentence && (
                    <div className="p-3 bg-stone-50 dark:bg-stone-850/60 sepia:bg-[#EDE3CB]/60 rounded-xl border border-stone-200/80 dark:border-stone-750 sepia:border-[#DDCFB6] text-xs text-stone-700 dark:text-stone-300 sepia:text-[#4A3825] flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase font-bold text-stone-400 dark:text-stone-500 sepia:text-[#78644E] block">
                          Context ({item.storyTitle})
                        </span>
                        <p className="italic font-serif leading-relaxed text-stone-900 dark:text-stone-100 sepia:text-[#382716] text-sm">
                          « {item.sentence} »
                        </p>
                      </div>
                      <button
                        onClick={() => handlePlaySentence(item.sentence)}
                        className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 sepia:hover:text-[#382716] shrink-0 mt-2 cursor-pointer"
                        title="Listen to sentence"
                      >
                        <Volume2 size={14} />
                      </button>
                    </div>
                  )}

                  {/* Next review metadata */}
                  <div className="flex items-center justify-between text-[11px] text-stone-400 dark:text-stone-500 sepia:text-[#78644E] pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {i18n.wordsPage.nextReviewLabel}{' '}
                      <span className={due ? 'font-bold text-amber-800 dark:text-amber-400 sepia:text-[#8C4712]' : 'text-stone-600 dark:text-stone-400 sepia:text-[#644E35] font-medium'}>
                        {due ? i18n.wordsPage.dueToday : toDateString(item.nextReviewDate)}
                      </span>
                    </span>
                    <span>
                      {item.timesCorrect} / {item.timesReviewed} correct
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};
