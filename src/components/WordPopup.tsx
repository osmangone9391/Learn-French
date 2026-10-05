import React, { useState } from 'react';
import { Volume2, Bookmark, Check, X, BookOpen, Flag } from 'lucide-react';
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
  isAiStory?: boolean;
  onReportMeaning?: (word: string, lemma: string) => void;
}

const POS_LABELS: Record<PartOfSpeech, { label: string; bn: string; color: string }> = {
  noun: { label: 'Noun (Nom)', bn: 'বিশেষ্য', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  verb: { label: 'Verb (Verbe)', bn: 'ক্রিয়া', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  adjective: { label: 'Adjective', bn: 'বিশেষণ', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  adverb: { label: 'Adverb', bn: 'ক্রিয়া বিশেষণ', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  preposition: { label: 'Preposition', bn: 'পদান্বয়ী অব্যয়', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  pronoun: { label: 'Pronoun', bn: 'সর্বনাম', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  conjunction: { label: 'Conjunction', bn: 'সংযোজক অব্যয়', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  expression: { label: 'Expression / Idiom', bn: 'বাগধারা', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  article: { label: 'Article', bn: 'পদাশ্রিত নির্দেশক', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  interjection: { label: 'Interjection', bn: 'আবেগসূচক অব্যয়', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  number: { label: 'Number', bn: 'সংখ্যা', color: 'bg-stone-50 text-stone-700 border-stone-200' }
};

export const WordPopup: React.FC<WordPopupProps> = ({
  word,
  lemma,
  vocab,
  sentenceContext,
  isSaved,
  onSave,
  onClose,
  playbackRate = 1.0,
  isAiStory = false,
  onReportMeaning
}) => {
  const [hasReported, setHasReported] = useState(false);
  const displayLemma = vocab?.lemma || lemma || word;
  const posInfo = vocab?.pos ? POS_LABELS[vocab.pos] : null;
  const grammar = getGrammarForVocab(word, vocab);

  const handleReport = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onReportMeaning) {
      onReportMeaning(word, displayLemma);
      setHasReported(true);
    }
  };

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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-stone-200 overflow-hidden text-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-stone-100 bg-stone-50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
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
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Word and Audio header */}
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-medium border border-indigo-200 transition-colors shadow-2xs active:scale-95 cursor-pointer shrink-0"
              title="Listen to pronunciation"
            >
              <Volume2 size={16} />
              <span>{i18n.wordPopup.listenWord}</span>
            </button>
          </div>

          {/* Translations: Bangla & English */}
          <div className="mt-4 space-y-3">
            {/* Bangla translation */}
            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  {i18n.wordPopup.banglaMeaning}
                </span>
                {posInfo && (
                  <span className="text-[10px] text-amber-700 font-medium">
                    {posInfo.bn}
                  </span>
                )}
              </div>
              <p className="mt-1 text-lg font-medium text-stone-900 font-bn">
                {vocab?.bn || 'অর্থ পাওয়া যায়নি'}
              </p>
            </div>

            {/* English translation */}
            <div className="p-3 bg-sky-50/70 border border-sky-200/80 rounded-xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-800">
                {i18n.wordPopup.englishMeaning}
              </span>
              <p className="mt-1 text-base font-medium text-stone-900">
                {vocab?.en || 'Translation not in vocabulary list'}
              </p>
            </div>
          </div>

          {/* Context sentence */}
          {sentenceContext && (
            <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-700">
              <div className="flex items-center justify-between text-stone-500 mb-1">
                <span className="font-semibold uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <BookOpen size={12} /> {i18n.wordPopup.contextSentence}
                </span>
                <button
                  onClick={handlePlaySentence}
                  className="flex items-center gap-1 text-[11px] text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
                >
                  <Volume2 size={12} /> {i18n.wordPopup.listenSentence}
                </button>
              </div>
              <p className="italic font-serif text-sm leading-relaxed text-stone-800">
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
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
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

          {/* Report wrong meaning button for AI stories */}
          {isAiStory && (
            <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              {hasReported ? (
                <span className="text-emerald-700 font-medium flex items-center gap-1 text-[11px]">
                  <Check size={13} /> Meaning flagged for your review
                </span>
              ) : (
                <button
                  onClick={handleReport}
                  className="flex items-center gap-1 text-[11px] text-stone-500 hover:text-amber-800 transition-colors cursor-pointer"
                  title="Report an inaccurate or awkward translation"
                >
                  <Flag size={12} />
                  <span>Report a wrong meaning</span>
                </button>
              )}
              <span className="text-[10px] text-stone-400">AI Story</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
