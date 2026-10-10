import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Volume2,
  CheckCircle,
  AlertCircle,
  Layers,
  Award,
  ChevronRight
} from 'lucide-react';
import { SavedWord, AppSettings, ReviewCardMode, FontSizeSetting, LineSpacingSetting } from '../types';
import {
  pickReviewCardMode,
  generateDistractors,
  processCardReview,
  createClozeSentence,
  LEITNER_INTERVALS_DAYS
} from '../utils/srs';
import { audioPlayer } from '../utils/audioPlayer';
import { i18n } from '../i18n/en';
import { getGrammarForSavedWord } from '../utils/grammarHelper';
import { GrammarChips } from './GrammarChips';

interface ReviewSessionProps {
  queue: SavedWord[];
  allSavedWords: SavedWord[];
  settings: AppSettings;
  onFinishSession: (
    updatedCards: SavedWord[],
    cardsReviewed: number,
    cardsCorrect: number
  ) => void;
  onBack: () => void;
}

interface CardResultSummary {
  card: SavedWord;
  isCorrect: boolean;
  previousBox: number;
  newBox: number;
}

export const ReviewSession: React.FC<ReviewSessionProps> = ({
  queue,
  allSavedWords,
  settings,
  onFinishSession,
  onBack
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [sessionResults, setSessionResults] = useState<CardResultSummary[]>([]);
  const [updatedCardsMap, setUpdatedCardsMap] = useState<Record<string, SavedWord>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentCard: SavedWord | undefined = queue[currentIndex];

  const currentMode: ReviewCardMode = useMemo(() => {
    if (!currentCard) return 'fr_to_meaning';
    return pickReviewCardMode(currentCard.srsStage, currentCard, currentIndex);
  }, [currentCard, currentIndex]);

  const currentOptions = useMemo(() => {
    if (!currentCard) return [];
    return generateDistractors(currentCard, allSavedWords, currentMode);
  }, [currentCard, allSavedWords, currentMode]);

  // Auto-play audio when card opens if mode is listening
  useEffect(() => {
    if (currentCard && !isFinished) {
      if (currentMode === 'listen_to_meaning') {
        audioPlayer.play({
          text: currentCard.ttsText || currentCard.word,
          speed: settings.playbackRate,
          lang: 'fr'
        });
      }
    }
  }, [currentIndex, currentMode, currentCard, isFinished, settings.playbackRate]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      audioPlayer.stop();
    };
  }, []);

  const formatMeaning = (card: SavedWord) => {
    if (settings.activeLanguageTab === 'bn') {
      return card.bn;
    }
    if (settings.activeLanguageTab === 'en') {
      return card.en;
    }
    return `${card.bn} • ${card.en}`;
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswered || !currentCard) return;

    setSelectedOptionIndex(optionIndex);
    setIsAnswered(true);

    const chosenOption = currentOptions[optionIndex];
    const isCorrect = chosenOption ? chosenOption.isCorrect : false;

    // Process review according to Leitner system rules
    const reviewResult = processCardReview(currentCard, isCorrect);
    setUpdatedCardsMap(prev => ({ ...prev, [reviewResult.updatedCard.id]: reviewResult.updatedCard }));

    setSessionResults(prev => [
      ...prev,
      {
        card: currentCard,
        isCorrect,
        previousBox: currentCard.srsStage,
        newBox: reviewResult.newBox
      }
    ]);

    // Audio feedback on answering
    if (currentMode !== 'listen_to_meaning') {
      audioPlayer.play({
        text: currentCard.ttsText || currentCard.word,
        speed: settings.playbackRate,
        lang: 'fr'
      });
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedOptionIndex(null);

    if (currentIndex + 1 < queue.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleFinishAndSave = () => {
    const updatedCardsList = Object.values(updatedCardsMap);
    const correctCount = sessionResults.filter(r => r.isCorrect).length;
    onFinishSession(updatedCardsList, sessionResults.length, correctCount);
  };

  // Typography scaling for review cards based on settings.fontSize and lineSpacing
  const typography = useMemo(() => {
    const isRelaxed = settings.lineSpacing === 'relaxed';
    switch (settings.fontSize) {
      case 'small':
        return {
          title: 'text-2xl sm:text-3xl',
          cloze: 'text-base sm:text-lg',
          meaning: 'text-xl sm:text-2xl',
          optionText: 'text-xs sm:text-sm',
          optionPadding: 'p-3',
          lineHeight: isRelaxed ? 'leading-loose my-2' : 'leading-relaxed my-1'
        };
      case 'large':
        return {
          title: 'text-4xl sm:text-5xl',
          cloze: 'text-xl sm:text-2xl',
          meaning: 'text-3xl sm:text-4xl',
          optionText: 'text-base sm:text-lg',
          optionPadding: 'p-4 sm:p-5',
          lineHeight: isRelaxed ? 'leading-[2.4] my-4' : 'leading-loose my-2'
        };
      case 'xlarge':
        return {
          title: 'text-5xl sm:text-6xl',
          cloze: 'text-2xl sm:text-3xl',
          meaning: 'text-3xl sm:text-5xl',
          optionText: 'text-lg sm:text-xl',
          optionPadding: 'p-5 sm:p-6',
          lineHeight: isRelaxed ? 'leading-[2.6] my-5' : 'leading-[2.2] my-3'
        };
      case 'medium':
      default:
        return {
          title: 'text-3xl sm:text-4xl',
          cloze: 'text-lg sm:text-xl',
          meaning: 'text-2xl sm:text-3xl',
          optionText: 'text-sm sm:text-base',
          optionPadding: 'p-4',
          lineHeight: isRelaxed ? 'leading-[2.2] my-3' : 'leading-relaxed my-1.5'
        };
    }
  }, [settings.fontSize, settings.lineSpacing]);

  // Session summary calculations
  const correctCount = sessionResults.filter(r => r.isCorrect).length;
  const accuracy = sessionResults.length > 0 ? Math.round((correctCount / sessionResults.length) * 100) : 100;
  const movedUpCount = sessionResults.filter(r => r.isCorrect && r.newBox > r.previousBox).length;

  if (queue.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/70 sepia:bg-emerald-200/80 text-emerald-800 dark:text-emerald-200 sepia:text-emerald-950 flex items-center justify-center mx-auto">
          <CheckCircle size={32} />
        </div>
        <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 sepia:text-[#382716]">
          {i18n.review.allDoneTitle}
        </h2>
        <p className="text-stone-600 dark:text-stone-300 sepia:text-[#644E35] text-sm max-w-sm mx-auto leading-relaxed">
          {i18n.review.allDoneDesc}
        </p>
        <button
          onClick={onBack}
          className="mt-4 px-6 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white dark:text-stone-950 sepia:bg-[#382716] sepia:hover:bg-[#4A3825] sepia:text-[#FAF4E6] text-white font-medium text-xs sm:text-sm cursor-pointer"
        >
          {i18n.reader.backBtn}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 text-stone-900 dark:text-stone-100 sepia:text-[#382716]">
      {/* Top Header */}
      <header className="sticky top-0 z-20 bg-white/95 dark:bg-[#1E2126]/95 sepia:bg-[#FAF4E6]/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] px-4 py-3">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-stone-700 dark:text-stone-300 sepia:text-[#4A3825] hover:text-stone-950 dark:hover:text-white sepia:hover:text-[#382716] p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 sepia:hover:bg-[#EDE3CB] transition-colors cursor-pointer"
          >
            <ArrowLeft size={18} />
            <span>{i18n.review.quitBtn}</span>
          </button>

          {!isFinished && (
            <div className="text-xs font-semibold text-stone-600 dark:text-stone-300 sepia:text-[#644E35]">
              {currentIndex + 1} / {queue.length}
            </div>
          )}

          <div className="text-xs font-semibold px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 sepia:bg-[#EDE3CB] text-stone-700 dark:text-stone-300 sepia:text-[#382716] border border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6]">
            Leitner Box SRS
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-xl mx-auto px-4 pt-6">
        {!isFinished && currentCard ? (
          <div className="space-y-5">
            {/* Card Frame */}
            <div className="bg-white dark:bg-[#1E2126] sepia:bg-[#FAF4E6] rounded-3xl border border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] p-6 sm:p-8 shadow-sm text-center relative overflow-hidden">
              {/* Box Pill */}
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/70 sepia:bg-amber-200/80 text-amber-950 dark:text-amber-200 sepia:text-amber-950 border border-amber-300 dark:border-amber-800 sepia:border-amber-400 font-semibold text-[11px]">
                  <Layers size={12} />
                  Box {currentCard.srsStage} (every {LEITNER_INTERVALS_DAYS[currentCard.srsStage]}d)
                </span>
                <span className="text-stone-400 dark:text-stone-500 sepia:text-[#78644E] text-[11px] font-medium">
                  {currentMode === 'fr_to_meaning' && i18n.review.modeRecognition}
                  {currentMode === 'listen_to_meaning' && i18n.review.modeListening}
                  {currentMode === 'meaning_to_fr' && i18n.review.modeRecall}
                  {currentMode === 'sentence_cloze' && i18n.review.modeCloze}
                </span>
              </div>

              {/* Question content according to mode */}
              <div className="py-4">
                {currentMode === 'fr_to_meaning' && (
                  <div>
                    <h2 className={`${typography.title} font-serif font-bold text-stone-900 dark:text-stone-100 sepia:text-[#382716]`}>
                      {currentCard.word}
                    </h2>
                    {currentCard.lemma.toLowerCase() !== currentCard.word.toLowerCase() && (
                      <p className="text-xs text-stone-400 dark:text-stone-500 sepia:text-[#78644E] mt-1">
                        (base: {currentCard.lemma})
                      </p>
                    )}
                    <button
                      onClick={() =>
                        audioPlayer.play({
                          text: currentCard.ttsText || currentCard.word,
                          speed: settings.playbackRate,
                          lang: 'fr'
                        })
                      }
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 sepia:bg-indigo-200/80 sepia:text-indigo-950 border border-indigo-200 dark:border-indigo-800 sepia:border-indigo-400 text-xs font-medium transition-colors cursor-pointer"
                    >
                      <Volume2 size={14} /> {i18n.wordPopup.listenWord}
                    </button>
                  </div>
                )}

                {currentMode === 'listen_to_meaning' && (
                  <div className="space-y-3">
                    <button
                      onClick={() =>
                        audioPlayer.play({
                          text: currentCard.ttsText || currentCard.word,
                          speed: settings.playbackRate,
                          lang: 'fr'
                        })
                      }
                      className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/70 text-indigo-700 dark:text-indigo-300 sepia:bg-indigo-200/80 sepia:text-indigo-950 hover:bg-indigo-200 dark:hover:bg-indigo-850 transition-colors mx-auto flex items-center justify-center shadow-xs cursor-pointer"
                      title="Replay pronunciation"
                    >
                      <Volume2 size={32} />
                    </button>
                    <p className="text-xs text-stone-500 dark:text-stone-400 sepia:text-[#78644E] font-medium">
                      {i18n.review.listenPrompt}
                    </p>
                    {isAnswered && (
                      <h2 className={`${typography.title} font-serif font-bold text-stone-900 dark:text-stone-100 sepia:text-[#382716] animate-in fade-in`}>
                        {currentCard.word}
                      </h2>
                    )}
                  </div>
                )}

                {currentMode === 'meaning_to_fr' && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 sepia:text-[#78644E]">
                      {i18n.review.recallPrompt}
                    </p>
                    <h2 className={`${typography.meaning} font-serif font-bold text-stone-900 dark:text-stone-100 sepia:text-[#382716] font-bn`}>
                      {formatMeaning(currentCard)}
                    </h2>
                    <span className="inline-block text-[11px] px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 sepia:bg-[#EDE3CB] text-stone-600 dark:text-stone-300 sepia:text-[#4A3825] font-medium border border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6]">
                      {currentCard.pos}
                    </span>
                  </div>
                )}

                {currentMode === 'sentence_cloze' && (
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400 sepia:text-[#8C4712]">
                      {i18n.review.clozePrompt}
                    </p>
                    <p className={`${typography.cloze} ${typography.lineHeight} font-serif italic text-stone-800 dark:text-stone-200 sepia:text-[#382716] max-w-md mx-auto`}>
                      « {createClozeSentence(currentCard.sentence, currentCard.word)} »
                    </p>
                    <div className="text-xs text-stone-500 dark:text-stone-400 sepia:text-[#78644E] font-medium">
                      {i18n.review.meaningLabel} <span className="font-semibold text-stone-800 dark:text-stone-200 sepia:text-[#382716] font-bn">{formatMeaning(currentCard)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Answer Options */}
            <div className="space-y-2.5">
              {currentOptions.map((opt, idx) => {
                const isSelected = selectedOptionIndex === idx;
                const isCorrect = opt.isCorrect;

                let btnStyle =
                  'bg-white dark:bg-[#1E2126] sepia:bg-[#FAF4E6] border-stone-200 dark:border-stone-750 sepia:border-[#DDCFB6] hover:border-amber-400 dark:hover:border-amber-500 sepia:hover:border-[#B45309] text-stone-800 dark:text-stone-100 sepia:text-[#382716]';

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle =
                      'bg-emerald-50 dark:bg-emerald-950/70 sepia:bg-emerald-100/80 border-emerald-500 dark:border-emerald-600 sepia:border-emerald-600 text-emerald-950 dark:text-emerald-200 sepia:text-emerald-950 font-semibold ring-1 ring-emerald-500';
                  } else if (isSelected && !isCorrect) {
                    btnStyle =
                      'bg-rose-50 dark:bg-rose-950/70 sepia:bg-rose-100/80 border-rose-400 dark:border-rose-600 sepia:border-rose-500 text-rose-950 dark:text-rose-200 sepia:text-rose-950 font-semibold';
                  } else {
                    btnStyle =
                      'bg-stone-100 dark:bg-stone-850 sepia:bg-[#EDE3CB] border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] opacity-50 text-stone-500 dark:text-stone-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full ${typography.optionPadding} rounded-2xl border ${typography.optionText} font-medium transition-all flex items-center justify-between text-left shadow-2xs cursor-pointer ${btnStyle}`}
                  >
                    <span className="font-bn">{opt.label}</span>
                    {isAnswered && isCorrect && (
                      <CheckCircle size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 ml-2" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <AlertCircle size={18} className="text-rose-500 dark:text-rose-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Post-answer feedback & Context card */}
            {isAnswered && (
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-100 dark:bg-[#1E2126] sepia:bg-[#EDE3CB] border border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {currentOptions[selectedOptionIndex!]?.isCorrect ? (
                      <span className="text-xs font-bold text-emerald-800 dark:text-emerald-200 sepia:text-emerald-950 bg-emerald-100 dark:bg-emerald-950/80 sepia:bg-emerald-200/80 px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-300 dark:border-emerald-800 sepia:border-emerald-400">
                        <CheckCircle size={13} />
                        Correct! Moved to Box {Math.min(5, currentCard.srsStage + 1)}
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-rose-800 dark:text-rose-200 sepia:text-rose-950 bg-rose-100 dark:bg-rose-950/80 sepia:bg-rose-200/80 px-2.5 py-1 rounded-full flex items-center gap-1 border border-rose-300 dark:border-rose-800 sepia:border-rose-400">
                        <AlertCircle size={13} />
                        Incorrect: Returned to Box 1
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      audioPlayer.play({
                        text: currentCard.ttsText || currentCard.word,
                        speed: settings.playbackRate,
                        lang: 'fr'
                      })
                    }
                    className="text-xs text-indigo-700 dark:text-indigo-400 sepia:text-indigo-900 hover:underline font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 size={13} /> {i18n.review.reListenBtn}
                  </button>
                </div>

                {/* Grammar details on answer reveal */}
                <div className="py-2 px-3 bg-white/90 dark:bg-stone-900/60 sepia:bg-[#FAF4E6] rounded-xl border border-stone-200/80 dark:border-stone-750 sepia:border-[#DDCFB6] flex items-center justify-between gap-2 flex-wrap text-left">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-serif font-bold text-stone-900 dark:text-stone-100 sepia:text-[#382716] text-sm">
                      {currentCard.word}
                    </span>
                    <GrammarChips grammar={getGrammarForSavedWord(currentCard)} compact />
                  </div>
                </div>

                {/* Original context sentence */}
                {currentCard.sentence && (
                  <div className="pt-2 border-t border-stone-200/80 dark:border-stone-800 sepia:border-[#DDCFB6] text-xs sm:text-sm text-stone-700 dark:text-stone-300 sepia:text-[#4A3825]">
                    <span className="text-[10px] uppercase font-bold text-stone-400 dark:text-stone-500 sepia:text-[#78644E] block mb-1">
                      {i18n.review.storySentenceContext.replace('{story}', currentCard.storyTitle)}
                    </span>
                    <p className="italic font-serif leading-relaxed text-stone-900 dark:text-stone-100 sepia:text-[#382716]">
                      « {currentCard.sentence} »
                    </p>
                  </div>
                )}

                {/* Next button */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white dark:text-stone-950 sepia:bg-[#382716] sepia:hover:bg-[#4A3825] sepia:text-[#FAF4E6] text-white text-sm font-semibold transition-colors shadow-xs cursor-pointer"
                  >
                    <span>{currentIndex + 1 < queue.length ? i18n.review.nextCardBtn : i18n.review.viewSummaryBtn}</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Session Results Screen */
          <div className="bg-white dark:bg-[#1E2126] sepia:bg-[#FAF4E6] rounded-3xl border border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/70 sepia:bg-amber-200/80 text-amber-800 dark:text-amber-300 sepia:text-amber-950 flex items-center justify-center mx-auto mb-2 border border-amber-300 dark:border-amber-800 sepia:border-amber-400">
                <Award size={36} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 sepia:text-[#382716]">
                {i18n.review.summaryTitle}
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 sepia:text-[#78644E]">
                {i18n.review.summarySubtitle}
              </p>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-stone-50 dark:bg-stone-800/60 sepia:bg-[#EDE3CB] rounded-2xl border border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6]">
                <div className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 sepia:text-[#382716]">
                  {correctCount} / {sessionResults.length}
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 sepia:text-[#78644E] font-medium">{i18n.review.metricReviewed}</div>
              </div>
              <div className="p-3 bg-stone-50 dark:bg-stone-800/60 sepia:bg-[#EDE3CB] rounded-2xl border border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6]">
                <div className="text-xl sm:text-2xl font-bold text-emerald-800 dark:text-emerald-300 sepia:text-emerald-950">
                  +{movedUpCount}
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 sepia:text-[#78644E] font-medium">{i18n.review.metricPromoted}</div>
              </div>
              <div className="p-3 bg-stone-50 dark:bg-stone-800/60 sepia:bg-[#EDE3CB] rounded-2xl border border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6]">
                <div className="text-xl sm:text-2xl font-bold text-amber-800 dark:text-amber-300 sepia:text-[#8C4712]">
                  {accuracy}%
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 sepia:text-[#78644E] font-medium">{i18n.review.metricAccuracy}</div>
              </div>
            </div>

            {/* Words list breakdown */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 sepia:text-[#78644E]">
                {i18n.review.reviewedWordsListTitle} ({sessionResults.length})
              </h4>
              {sessionResults.map(({ card, isCorrect, previousBox, newBox }) => (
                <div
                  key={card.id}
                  className="flex items-center justify-between p-2.5 bg-stone-50 dark:bg-stone-800/60 sepia:bg-[#EDE3CB] border border-stone-200/80 dark:border-stone-700/80 sepia:border-[#DDCFB6] rounded-xl text-xs"
                >
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <CheckCircle size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle size={14} className="text-rose-500 dark:text-rose-400 shrink-0" />
                    )}
                    <span className="font-serif font-bold text-stone-900 dark:text-stone-100 sepia:text-[#382716]">{card.word}</span>
                    <span className="text-stone-500 dark:text-stone-400 sepia:text-[#78644E] font-bn">({card.bn})</span>
                  </div>

                  <div className="text-stone-500 dark:text-stone-400 sepia:text-[#78644E] flex items-center gap-1 font-medium">
                    <span>Box {previousBox}</span>
                    <span>→</span>
                    <span className={isCorrect ? 'text-emerald-700 dark:text-emerald-300 sepia:text-emerald-950 font-bold' : 'text-rose-600 dark:text-rose-300 sepia:text-rose-950 font-bold'}>
                      Box {newBox}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Complete button */}
            <button
              onClick={handleFinishAndSave}
              className="w-full py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white dark:text-stone-950 sepia:bg-[#382716] sepia:hover:bg-[#4A3825] sepia:text-[#FAF4E6] text-white font-semibold text-sm transition-all shadow-xs cursor-pointer"
            >
              {i18n.review.saveAndFinishBtn}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
