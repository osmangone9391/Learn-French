import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Award, Compass, ArrowRight, RotateCcw } from 'lucide-react';
import { CEFRLevel, PlacementQuestion } from '../types';
import { PLACEMENT_QUESTIONS, evaluatePlacementScore } from '../data/placementQuestions';
import { i18n } from '../i18n/en';

interface PlacementQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (level: CEFRLevel, score: number, total: number) => void;
  onSkip: () => void;
  isFirstLaunch?: boolean;
}

export const PlacementQuizModal: React.FC<PlacementQuizModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  onSkip,
  isFirstLaunch = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ: PlacementQuestion = PLACEMENT_QUESTIONS[currentIndex];
  const totalQuestions = PLACEMENT_QUESTIONS.length;

  const handleSelectOption = (idx: number) => {
    if (showExplanation) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: idx }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsFinished(false);
  };

  const correctCount = PLACEMENT_QUESTIONS.reduce((acc, q, idx) => {
    return acc + (selectedAnswers[idx] === q.answer ? 1 : 0);
  }, 0);

  const evaluation = evaluatePlacementScore(correctCount);

  const handleApplyRecommendation = () => {
    onComplete(evaluation.level, correctCount, totalQuestions);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-[#1E2126] sepia:bg-[#FAF4E6] rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] overflow-hidden flex flex-col text-stone-900 dark:text-stone-100 sepia:text-[#382716] max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 dark:border-stone-800 sepia:border-[#E8DEC7] bg-stone-50/70 dark:bg-stone-900/50 sepia:bg-[#EDE3CB]/60">
          <div className="flex items-center gap-2">
            <Compass size={18} className="text-amber-800 dark:text-amber-400 sepia:text-[#8C4712]" />
            <div>
              <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 sepia:text-[#382716]">
                {i18n.placement.modalTitle}
              </h3>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 sepia:text-[#78644E]">
                {i18n.placement.modalSubtitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {isFirstLaunch && !isFinished && (
              <button
                onClick={onSkip}
                className="px-2.5 py-1 text-xs font-semibold text-stone-500 dark:text-stone-400 sepia:text-[#78644E] hover:text-stone-800 dark:hover:text-stone-200 rounded-lg hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              >
                {i18n.placement.skipBtn}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 sepia:hover:text-[#382716] hover:bg-stone-200/60 dark:hover:bg-stone-800 sepia:hover:bg-[#EDE3CB] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {!isFinished && currentQ ? (
            <div className="space-y-4">
              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 sepia:text-[#78644E]">
                  <span className="font-medium">
                    {i18n.placement.questionCounter.replace('{current}', String(currentIndex + 1)).replace('{total}', String(totalQuestions))}
                  </span>
                  <span className="font-bold text-amber-900 dark:text-amber-200 sepia:text-[#783908]">
                    {i18n.placement.targetLevel} {currentQ.level}
                  </span>
                </div>
                <div className="w-full bg-stone-100 dark:bg-stone-800 sepia:bg-[#EDE3CB] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-700 dark:bg-amber-500 sepia:bg-[#8C4712] h-full transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="pt-2">
                <h4 className="text-lg font-serif font-bold text-stone-950 dark:text-stone-50 sepia:text-[#382716] leading-snug">
                  {currentQ.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2.5 pt-2">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentIndex] === idx;
                  const isCorrect = currentQ.answer === idx;

                  let style =
                    'border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6] hover:border-amber-400 dark:hover:border-amber-500 sepia:hover:border-[#B45309] bg-white dark:bg-[#16181C] sepia:bg-[#FAF4E6] text-stone-800 dark:text-stone-200 sepia:text-[#382716]';

                  if (showExplanation) {
                    if (isCorrect) {
                      style =
                        'border-emerald-500 dark:border-emerald-600 sepia:border-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 sepia:bg-emerald-100/80 text-emerald-950 dark:text-emerald-200 sepia:text-emerald-950 font-semibold ring-1 ring-emerald-500';
                    } else if (isSelected && !isCorrect) {
                      style =
                        'border-rose-400 dark:border-rose-600 sepia:border-rose-500 bg-rose-50 dark:bg-rose-950/70 sepia:bg-rose-100/80 text-rose-950 dark:text-rose-200 sepia:text-rose-950 font-semibold';
                    } else {
                      style = 'border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] opacity-50 bg-stone-50 dark:bg-stone-850 sepia:bg-[#EDE3CB] text-stone-500 dark:text-stone-400';
                    }
                  } else if (isSelected) {
                    style =
                      'border-amber-600 dark:border-amber-500 sepia:border-[#8C4712] bg-amber-50 dark:bg-amber-950/70 sepia:bg-[#F2DEBA] text-amber-950 dark:text-amber-200 sepia:text-amber-950 font-semibold';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={showExplanation}
                      className={`w-full p-3.5 rounded-xl border text-sm sm:text-base transition-all flex items-start gap-3 text-left cursor-pointer ${style}`}
                    >
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 mt-0.5 bg-stone-100 dark:bg-stone-800 sepia:bg-[#EDE3CB] text-stone-700 dark:text-stone-300 sepia:text-[#382716] border border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6]">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {showExplanation && isCorrect && (
                        <CheckCircle size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {showExplanation && isSelected && !isCorrect && (
                        <AlertCircle size={18} className="text-rose-500 dark:text-rose-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and explanation */}
              {showExplanation && (
                <div className="mt-4 p-4 rounded-2xl bg-amber-50/80 dark:bg-stone-900/60 sepia:bg-[#EDE3CB]/80 border border-amber-200/90 dark:border-stone-750 sepia:border-[#DDCFB6] text-xs sm:text-sm animate-in fade-in space-y-2">
                  <div className="font-bold flex items-center gap-1.5">
                    {selectedAnswers[currentIndex] === currentQ.answer ? (
                      <span className="text-emerald-700 dark:text-emerald-400">{i18n.placement.correctFeedback}</span>
                    ) : (
                      <span className="text-rose-700 dark:text-rose-400">{i18n.placement.wrongFeedback}</span>
                    )}
                  </div>
                  <p className="text-stone-700 dark:text-stone-300 sepia:text-[#4A3825] font-sans leading-relaxed">
                    <span className="font-semibold">{i18n.quiz.explanationLabel}</span> {currentQ.explanation}
                  </p>
                  <p className="text-amber-950 dark:text-amber-200 sepia:text-[#783908] pt-1 border-t border-amber-200/60 dark:border-stone-800 sepia:border-[#DDCFB6] font-bn leading-relaxed">
                    <span className="font-bold">{i18n.quiz.banglaExplanationLabel}</span> {currentQ.explanationBn}
                  </p>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleNext}
                      className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white dark:text-stone-950 sepia:bg-[#382716] sepia:hover:bg-[#4A3825] sepia:text-[#FAF4E6] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer"
                    >
                      {currentIndex + 1 < totalQuestions ? i18n.placement.nextBtn : i18n.placement.seeResultBtn}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/70 sepia:bg-amber-200/80 text-amber-800 dark:text-amber-300 sepia:text-amber-950 flex items-center justify-center mx-auto border border-amber-300 dark:border-amber-800 sepia:border-amber-400">
                <Award size={36} />
              </div>

              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-amber-800 dark:text-amber-400 sepia:text-[#8C4712]">
                  {i18n.placement.resultTitle}
                </span>
                <h4 className="text-2xl sm:text-3xl font-serif font-bold text-stone-950 dark:text-stone-50 sepia:text-[#382716] mt-1">
                  {evaluation.title}
                </h4>
                <p className="text-stone-500 dark:text-stone-400 sepia:text-[#78644E] text-sm mt-1">
                  Score: <span className="font-bold text-stone-900 dark:text-stone-100 sepia:text-[#382716]">{correctCount} / {totalQuestions}</span> questions correct
                </p>
              </div>

              {/* Explanation card */}
              <div className="p-4 sm:p-5 bg-stone-50 dark:bg-stone-900/40 sepia:bg-[#EDE3CB]/60 rounded-2xl border border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] text-left space-y-3">
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 sepia:text-[#4A3825] leading-relaxed font-sans">
                  {evaluation.description}
                </p>
                <div className="pt-2 border-t border-stone-200/70 dark:border-stone-800 sepia:border-[#DDCFB6] text-xs text-amber-950 dark:text-amber-200 sepia:text-[#783908] leading-relaxed font-bn">
                  <span className="font-bold block mb-0.5">বাংলা পরামর্শ:</span>
                  {evaluation.descriptionBn}
                </div>
              </div>

              <div className="text-xs text-stone-500 dark:text-stone-400 sepia:text-[#78644E] italic max-w-sm mx-auto">
                {i18n.placement.disclaimer}
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6] hover:bg-stone-50 dark:hover:bg-stone-800 sepia:hover:bg-[#EDE3CB] text-stone-700 dark:text-stone-300 sepia:text-[#382716] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  <RotateCcw size={15} /> {i18n.placement.retakeBtn}
                </button>
                <button
                  onClick={handleApplyRecommendation}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white dark:text-stone-950 sepia:bg-[#382716] sepia:hover:bg-[#4A3825] sepia:text-[#FAF4E6] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer"
                >
                  <span>{i18n.placement.applyBtn}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
