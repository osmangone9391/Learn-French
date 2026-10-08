import React from 'react';
import { Volume2, Bookmark, Check, X, BookOpen } from 'lucide-react';
import { VocabEntry, PartOfSpeech } from '../types';
import { audioPlayer } from '../utils/audioPlayer';
import { i18n } from '../i18n/en';
import { getGrammarForVocab } from '../utils/grammarHelper';
import { GrammarChips } from './GrammarChips';

interface WordPopupProps {
  word: string;
  lemma?: string;
  vocab?: VocabEntry;
  sentenceContext: string;
  isSaved: boolean;
  onSave: () => void;
  onClose: () => void;
  playbackRate?: number;
}

const POS_LABELS: Record<PartOfSpeech, { label: string; bn: string; color: string }> = {
  noun: { label: 'Noun (Nom)', bn: 'বিশেষ্য', color: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/70 dark:text-blue-300 dark:border-blue-800 sepia:bg-blue-200/70 sepia:text-blue-950 sepia:border-blue-400' },
  verb: { label: 'Verb (Verbe)', bn: 'ক্রিয়া', color: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-800 sepia:bg-emerald-200/70 sepia:text-emerald-950 sepia:border-emerald-400' },
  adjective: { label: 'Adjective', bn: 'বিশেষণ', color: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800 sepia:bg-amber-200/70 sepia:text-amber-950 sepia:border-amber-400' },
  adverb: { label: 'Adverb', bn: 'ক্রিয়া বিশেষণ', color: 'bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950/70 dark:text-purple-300 dark:border-purple-800 sepia:bg-purple-200/70 sepia:text-purple-950 sepia:border-purple-400' },
  preposition: { label: 'Preposition', bn: 'পদান্বয়ী অব্যয়', color: 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800 sepia:bg-rose-200/70 sepia:text-rose-950 sepia:border-rose-400' },
  pronoun: { label: 'Pronoun', bn: 'সর্বনাম', color: 'bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-950/70 dark:text-indigo-300 dark:border-indigo-800 sepia:bg-indigo-200/70 sepia:text-indigo-950 sepia:border-indigo-400' },
  conjunction: { label: 'Conjunction', bn: 'সংযোজক অব্যয়', color: 'bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-950/70 dark:text-teal-300 dark:border-teal-800 sepia:bg-teal-200/70 sepia:text-teal-950 sepia:border-teal-400' },
  expression: { label: 'Expression / Idiom', bn: 'বাগধারা', color: 'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950/70 dark:text-orange-300 dark:border-orange-800 sepia:bg-orange-200/70 sepia:text-orange-950 sepia:border-orange-400' },
  article: { label: 'Article', bn: 'পদাশ্রিত নির্দেশক', color: 'bg-cyan-50 text-cyan-800 border-cyan-200 dark:bg-cyan-950/70 dark:text-cyan-300 dark:border-cyan-800 sepia:bg-cyan-200/70 sepia:text-cyan-950 sepia:border-cyan-400' },
  interjection: { label: 'Interjection', bn: 'আবেগসূচক অব্যয়', color: 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-950/70 dark:text-yellow-300 dark:border-yellow-800 sepia:bg-yellow-200/70 sepia:text-yellow-950 sepia:border-yellow-400' },
  number: { label: 'Number', bn: 'সংখ্যা', color: 'bg-stone-50 text-stone-800 border-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700 sepia:bg-stone-200/70 sepia:text-stone-900 sepia:border-stone-400' }
};

export const WordPopup: React.FC<WordPopupProps> = ({
  word,
  lemma,
  vocab,
  sentenceContext,
  isSaved,
  onSave,
  onClose,
  playbackRate = 1.0
}) => {
  const displayLemma = vocab?.lemma || lemma || word;
  const posInfo = vocab?.pos ? POS_LABELS[vocab.pos] : null;
  const grammar = getGrammarForVocab(word, vocab);

  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioPlayer.play({
      text: vocab?.ttsText || word,
      speed: playbackRate,
      lang: 'fr'
    });
  };

  const handlePlaySentence = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioPlayer.play({
      text: sentenceContext,
      speed: playbackRate,
      lang: 'fr'
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-[#1E2126] sepia:bg-[#FAF4E6] rounded-t-2xl sm:rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] overflow-hidden text-stone-900 dark:text-stone-100 sepia:text-[#382716]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100 dark:border-stone-800 sepia:border-[#E8DEC7] bg-stone-50/70 dark:bg-stone-900/50 sepia:bg-[#EDE3CB]/60">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 sepia:text-[#78644E]">
              {i18n.wordPopup.title}
            </span>
            {posInfo && (
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${posInfo.color}`}>
                {posInfo.label}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label={i18n.common.close}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 sepia:hover:text-[#382716] hover:bg-stone-200/60 dark:hover:bg-stone-800 sepia:hover:bg-[#EDE3CB] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Word and Audio header */}
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 sepia:text-[#382716] tracking-tight">
                  {word}
                </h3>
              </div>
              <div className="mt-2">
                <GrammarChips grammar={grammar} />
              </div>
            </div>

            {/* Pronounce button */}
            <button
              onClick={handlePlayAudio}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 sepia:bg-indigo-200/80 sepia:text-indigo-950 text-xs font-medium border border-indigo-200 dark:border-indigo-800 sepia:border-indigo-400 transition-colors shadow-2xs active:scale-95 cursor-pointer shrink-0"
              title="Listen to pronunciation"
            >
              <Volume2 size={16} />
              <span>{i18n.wordPopup.listenWord}</span>
            </button>
          </div>

          {/* Translations: Bangla & English */}
          <div className="mt-4 space-y-3">
            {/* Bangla translation */}
            <div className="p-3 bg-amber-50/70 dark:bg-amber-950/40 sepia:bg-[#F2E4C4]/70 border border-amber-200/80 dark:border-amber-800/60 sepia:border-[#DDCFB6] rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200 sepia:text-[#783908]">
                  {i18n.wordPopup.banglaMeaning}
                </span>
                {posInfo && (
                  <span className="text-[10px] text-amber-800 dark:text-amber-300 sepia:text-[#8C4712] font-medium">
                    {posInfo.bn}
                  </span>
                )}
              </div>
              <p className="mt-1 text-lg font-medium text-stone-900 dark:text-stone-100 sepia:text-[#382716] font-bn">
                {vocab?.bn || 'অর্থ পাওয়া যায়নি'}
              </p>
            </div>

            {/* English translation */}
            <div className="p-3 bg-sky-50/70 dark:bg-sky-950/40 sepia:bg-[#E8EFF5]/60 border border-sky-200/80 dark:border-sky-800/60 sepia:border-[#CCDDE8] rounded-xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-900 dark:text-sky-200 sepia:text-[#0C4A6E]">
                {i18n.wordPopup.englishMeaning}
              </span>
              <p className="mt-1 text-base font-medium text-stone-900 dark:text-stone-100 sepia:text-[#382716]">
                {vocab?.en || 'Translation not in vocabulary list'}
              </p>
            </div>
          </div>

          {/* Context sentence */}
          {sentenceContext && (
            <div className="mt-4 p-3 bg-stone-50 dark:bg-stone-850/60 sepia:bg-[#EDE3CB]/60 rounded-xl border border-stone-200 dark:border-stone-750 sepia:border-[#DDCFB6] text-xs text-stone-700 dark:text-stone-300 sepia:text-[#4A3825]">
              <div className="flex items-center justify-between text-stone-500 dark:text-stone-400 sepia:text-[#78644E] mb-1">
                <span className="font-semibold uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <BookOpen size={12} /> {i18n.wordPopup.contextSentence}
                </span>
                <button
                  onClick={handlePlaySentence}
                  className="flex items-center gap-1 text-[11px] text-indigo-700 dark:text-indigo-400 sepia:text-indigo-900 hover:underline font-medium cursor-pointer"
                >
                  <Volume2 size={12} /> {i18n.wordPopup.listenSentence}
                </button>
              </div>
              <p className="italic font-serif text-sm leading-relaxed text-stone-900 dark:text-stone-200 sepia:text-[#382716]">
                « {sentenceContext} »
              </p>
            </div>
          )}

          {/* Actions: Save to vocabulary */}
          <div className="mt-5 flex gap-2">
            <button
              onClick={onSave}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all shadow-xs cursor-pointer ${
                isSaved
                  ? 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white'
                  : 'bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white dark:text-stone-950 sepia:bg-[#382716] sepia:hover:bg-[#4A3825] sepia:text-[#FAF4E6] text-white'
              }`}
            >
              {isSaved ? (
                <>
                  <Check size={16} />
                  <span>{i18n.wordPopup.savedWord}</span>
                </>
              ) : (
                <>
                  <Bookmark size={16} />
                  <span>{i18n.wordPopup.saveWord}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
