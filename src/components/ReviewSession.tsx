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
import { SavedWord, AppSettings, ReviewCardMode } from '../types';
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

    const option = currentOptions[optionIndex];
    const isCorrect = option.isCorrect;

    // Play word audio
    audioPlayer.play({
      text: currentCard.ttsText || currentCard.word,
      speed: settings.playbackRate,
      lang: 'fr'
    });

    // Process Leitner box update
    const { updatedCard, previousBox, newBox } = processCardReview(currentCard, isCorrect);

    setUpdatedCardsMap(prev => ({ ...prev, [updatedCard.id]: updatedCard }));
    setSessionResults(prev => [
      ...prev,
      { card: currentCard, isCorrect, previousBox, newBox }
    ]);
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
    const updatedList = Object.values(updatedCardsMap);
    const correctCount = sessionResults.filter(r => r.isCorrect).length;
    onFinishSession(updatedList, sessionResults.length, correctCount);
  };

  const correctCount = sessionResults.filter(r => r.isCorrect).length;
  const accuracy = sessionResults.length > 0 ? Math.round((correctCount / sessionResults.length) * 100) : 0;
  const movedUpCount = sessionResults.filter(r => r.newBox > r.previousBox).length;
  const movedDownCount = sessionResults.filter(r => r.newBox < r.previousBox).length;

  if (queue.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle size={32} />
        </div>
        <h2 className="text-2xl font-serif font-bold text-stone-900">
          {i18n.review.allDoneTitle}
        </h2>
        <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
          {i18n.review.allDoneDesc}
        </p>
        <button
          onClick={onBack}
          className="mt-4 px-6 py-2.5 rounded-xl bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors shadow-xs cursor-pointer"
        >
          {i18n.reader.backBtn}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-20 text-stone-900">
      {/* Top Header */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 py-3">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              audioPlayer.stop();
              onBack();
            }}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>{i18n.review.quitBtn}</span>
          </button>

          {/* Progress Indicator */}
          {!isFinished && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-stone-600">
                {currentIndex + 1} / {queue.length}
              </span>
              <div className="w-24 sm:w-36 bg-stone-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-600 h-full transition-all duration-300"
                  style={{
                    width: `${((currentIndex + (isAnswered ? 1 : 0)) / queue.length) * 100}%`
                  }}
                />
              </div>
            </div>
          )}

          <div className="text-xs font-semibold px-2 py-1 rounded-md bg-stone-100 text-stone-700">
            Leitner Box SRS
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-xl mx-auto px-4 pt-6">
        {!isFinished && currentCard ? (
          <div className="space-y-5">
            {/* Card Frame */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm text-center relative overflow-hidden">
              {/* Box Pill */}
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold text-[11px]">
                  <Layers size={12} />
                  Box {currentCard.srsStage} (every {LEITNER_INTERVALS_DAYS[currentCard.srsStage]}d)
                </span>
                <span className="text-stone-400 text-[11px] font-medium">
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
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
                      {currentCard.word}
                    </h2>
                    {currentCard.lemma.toLowerCase() !== currentCard.word.toLowerCase() && (
                      <p className="text-xs text-stone-400 mt-1">
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
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium hover:bg-indigo-100 transition-colors cursor-pointer"
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
                      className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors mx-auto flex items-center justify-center shadow-xs cursor-pointer"
                      title="Replay pronunciation"
                    >
                      <Volume2 size={32} />
                    </button>
                    <p className="text-xs text-stone-500 font-medium">
                      {i18n.review.listenPrompt}
                    </p>
                    {isAnswered && (
                      <h2 className="text-2xl font-serif font-bold text-stone-900 animate-in fade-in">
                        {currentCard.word}
                      </h2>
                    )}
                  </div>
                )}

                {currentMode === 'meaning_to_fr' && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                      {i18n.review.recallPrompt}
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 font-bn">
                      {formatMeaning(currentCard)}
                    </h2>
                    <span className="inline-block text-[11px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-medium">
                      {currentCard.pos}
                    </span>
                  </div>
                )}

                {currentMode === 'sentence_cloze' && (
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                      {i18n.review.clozePrompt}
                    </p>
                    <p className="text-lg sm:text-xl font-serif italic text-stone-800 leading-relaxed max-w-md mx-auto">
                      « {createClozeSentence(currentCard.sentence, currentCard.word)} »
                    </p>
                    <div className="text-xs text-stone-500 font-medium">
                      {i18n.review.meaningLabel} <span className="font-semibold text-stone-800 font-bn">{formatMeaning(currentCard)}</span>
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
                  'bg-white border-stone-200 hover:border-amber-400 hover:bg-stone-50/50 text-stone-800';

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle =
                      'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                  } else if (isSelected && !isCorrect) {
                    btnStyle =
                      'bg-rose-50 border-rose-400 text-rose-950 font-semibold';
                  } else {
                    btnStyle = 'bg-stone-100 border-stone-200 opacity-50';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-2xl border text-sm sm:text-base font-medium transition-all flex items-center justify-between text-left shadow-2xs cursor-pointer ${btnStyle}`}
                  >
                    <span className="font-bn">{opt.label}</span>
                    {isAnswered && isCorrect && (
                      <CheckCircle size={18} className="text-emerald-600 shrink-0 ml-2" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <AlertCircle size={18} className="text-rose-500 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Post-answer feedback & Context card */}
            {isAnswered && (
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-100 border border-stone-200 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {currentOptions[selectedOptionIndex!]?.isCorrect ? (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                        <CheckCircle size={13} />
                        Correct! Moved to Box {Math.min(5, currentCard.srsStage + 1)}
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full flex items-center gap-1">
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
                    className="text-xs text-indigo-700 hover:text-indigo-900 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 size={13} /> {i18n.review.reListenBtn}
                  </button>
                </div>

                {/* Grammar details on answer reveal */}
                <div className="py-2 px-3 bg-white/90 rounded-xl border border-stone-200/80 flex items-center justify-between gap-2 flex-wrap text-left">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-serif font-bold text-stone-900 text-sm">
                      {currentCard.word}
                    </span>
                    <GrammarChips grammar={getGrammarForSavedWord(currentCard)} compact />
                  </div>
                </div>

                {/* Original context sentence */}
                {currentCard.sentence && (
                  <div className="pt-2 border-t border-stone-200/80 text-xs sm:text-sm text-stone-700">
                    <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
                      {i18n.review.storySentenceContext.replace('{story}', currentCard.storyTitle)}
                    </span>
                    <p className="italic font-serif leading-relaxed text-stone-900">
                      « {currentCard.sentence} »
                    </p>
                  </div>
                )}

                {/* Next button */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold transition-colors shadow-xs cursor-pointer"
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
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-2">
                <Award size={36} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">
                {i18n.review.summaryTitle}
              </h2>
              <p className="text-sm text-stone-500">
                {i18n.review.summarySubtitle}
              </p>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="text-xl sm:text-2xl font-bold text-stone-900">
                  {correctCount} / {sessionResults.length}
                </div>
                <div className="text-[11px] text-stone-500 font-medium">{i18n.review.metricReviewed}</div>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="text-xl sm:text-2xl font-bold text-emerald-700">
                  +{movedUpCount}
                </div>
                <div className="text-[11px] text-stone-500 font-medium">{i18n.review.metricPromoted}</div>
              </div>
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <div className="text-xl sm:text-2xl font-bold text-amber-800">
                  {accuracy}%
                </div>
                <div className="text-[11px] text-stone-500 font-medium">{i18n.review.metricAccuracy}</div>
              </div>
            </div>

            {/* Words list breakdown */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                {i18n.review.reviewedWordsListTitle} ({sessionResults.length})
              </h4>
              {sessionResults.map(({ card, isCorrect, previousBox, newBox }) => (
                <div
                  key={card.id}
                  className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl text-xs"
                >
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle size={14} className="text-rose-500 shrink-0" />
                    )}
                    <span className="font-serif font-bold text-stone-900">{card.word}</span>
                    <span className="text-stone-500 font-bn">({card.bn})</span>
                  </div>

                  <div className="text-stone-500 flex items-center gap-1 font-medium">
                    <span>Box {previousBox}</span>
                    <span>→</span>
                    <span className={isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'}>
                      Box {newBox}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Complete button */}
            <button
              onClick={handleFinishAndSave}
              className="w-full py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm transition-all shadow-xs cursor-pointer"
            >
              {i18n.review.saveAndFinishBtn}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
