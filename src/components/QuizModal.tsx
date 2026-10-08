import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, RotateCcw, Award } from 'lucide-react';
import { Story, QuizQuestion, StoryQuizRecord } from '../types';
import { i18n } from '../i18n/en';

interface QuizModalProps {
  story: Story;
  previousRecord?: StoryQuizRecord;
  onClose: () => void;
  onQuizComplete: (scorePercentage: number) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  story,
  previousRecord,
  onClose,
  onQuizComplete
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const questions = story.quiz || [];
  const currentQuestion: QuizQuestion | undefined = questions[currentQuestionIndex];

  const handleSelectOption = (optionIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      let correctCount = 0;
      questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.answer) {
          correctCount++;
        }
      });
      const scorePct = Math.round((correctCount / questions.length) * 100);
      setIsFinished(true);
      onQuizComplete(scorePct);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsFinished(false);
  };

  const correctCount = questions.reduce((acc, q, idx) => {
    return acc + (selectedAnswers[idx] === q.answer ? 1 : 0);
  }, 0);
  const scorePct = Math.round((correctCount / questions.length) * 100);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-[#1E2126] sepia:bg-[#FAF4E6] rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] overflow-hidden flex flex-col text-stone-900 dark:text-stone-100 sepia:text-[#382716] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 dark:border-stone-800 sepia:border-[#E8DEC7] bg-stone-50/70 dark:bg-stone-900/50 sepia:bg-[#EDE3CB]/60">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400 sepia:text-[#8C4712]">
              {i18n.quiz.title}
            </span>
            <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 sepia:text-[#382716] line-clamp-1">
              {story.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 sepia:hover:text-[#382716] hover:bg-stone-200/60 dark:hover:bg-stone-800 sepia:hover:bg-[#EDE3CB] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {!isFinished && currentQuestion ? (
            <div>
              {/* Question counter & progress bar */}
              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 sepia:text-[#78644E] mb-2">
                <span>
                  {i18n.quiz.questionCounter.replace('{current}', String(currentQuestionIndex + 1)).replace('{total}', String(questions.length))}
                </span>
                <span className="font-semibold text-stone-700 dark:text-stone-300 sepia:text-[#382716]">
                  {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-stone-100 dark:bg-stone-800 sepia:bg-[#EDE3CB] h-1.5 rounded-full overflow-hidden mb-6">
                <div
                  className="bg-amber-600 dark:bg-amber-500 sepia:bg-[#8C4712] h-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                  }}
                />
              </div>

              {/* Question Text */}
              <h4 className="text-lg font-serif font-bold text-stone-950 dark:text-stone-50 sepia:text-[#382716] leading-snug">
                {currentQuestion.question}
              </h4>

              {/* Options */}
              <div className="mt-5 space-y-2.5">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === idx;
                  const isCorrect = currentQuestion.answer === idx;

                  let optionStyle =
                    'border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6] hover:border-amber-400 dark:hover:border-amber-500 sepia:hover:border-[#B45309] bg-white dark:bg-[#16181C] sepia:bg-[#FAF4E6] text-stone-800 dark:text-stone-200 sepia:text-[#382716]';

                  if (showExplanation) {
                    if (isCorrect) {
                      optionStyle =
                        'border-emerald-500 dark:border-emerald-600 sepia:border-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 sepia:bg-emerald-100/80 text-emerald-950 dark:text-emerald-200 sepia:text-emerald-950 font-medium ring-1 ring-emerald-500';
                    } else if (isSelected && !isCorrect) {
                      optionStyle =
                        'border-rose-400 dark:border-rose-600 sepia:border-rose-500 bg-rose-50 dark:bg-rose-950/70 sepia:bg-rose-100/80 text-rose-950 dark:text-rose-200 sepia:text-rose-950 font-medium';
                    } else {
                      optionStyle = 'border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] opacity-50 bg-stone-50 dark:bg-stone-850 sepia:bg-[#EDE3CB] text-stone-500 dark:text-stone-400';
                    }
                  } else if (isSelected) {
                    optionStyle =
                      'border-amber-600 dark:border-amber-500 sepia:border-[#8C4712] bg-amber-50 dark:bg-amber-950/70 sepia:bg-[#F2DEBA] text-amber-950 dark:text-amber-200 sepia:text-amber-950 font-medium';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={showExplanation}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm sm:text-base transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                    >
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold shrink-0 mt-0.5 bg-stone-100 dark:bg-stone-800 sepia:bg-[#EDE3CB] text-stone-700 dark:text-stone-300 sepia:text-[#382716] border border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6]">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{option}</span>
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

              {/* Explanation section when answered */}
              {showExplanation && (
                <div className="mt-5 p-4 rounded-2xl bg-amber-50/80 dark:bg-stone-900/60 sepia:bg-[#EDE3CB]/80 border border-amber-200/90 dark:border-stone-750 sepia:border-[#DDCFB6] text-xs sm:text-sm animate-in fade-in">
                  <div className="font-semibold text-amber-950 dark:text-amber-200 sepia:text-[#783908] mb-1 flex items-center gap-1.5">
                    {selectedAnswers[currentQuestionIndex] === currentQuestion.answer ? (
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">{i18n.quiz.correctFeedback}</span>
                    ) : (
                      <span className="text-rose-700 dark:text-rose-400 font-bold">{i18n.quiz.wrongFeedback}</span>
                    )}
                  </div>
                  <p className="text-stone-700 dark:text-stone-300 sepia:text-[#4A3825] font-sans leading-relaxed mt-1">
                    <span className="font-semibold">{i18n.quiz.explanationLabel}</span> {currentQuestion.explanation}
                  </p>
                  {currentQuestion.explanationBn && (
                    <p className="text-amber-950 dark:text-amber-300 sepia:text-[#783908] mt-2 pt-2 border-t border-amber-200/60 dark:border-stone-800 sepia:border-[#DDCFB6] font-bn leading-relaxed">
                      <span className="font-semibold">{i18n.quiz.banglaExplanationLabel}</span> {currentQuestion.explanationBn}
                    </p>
                  )}

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleNext}
                      className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white dark:text-stone-950 sepia:bg-[#382716] sepia:hover:bg-[#4A3825] sepia:text-[#FAF4E6] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer"
                    >
                      {currentQuestionIndex + 1 < questions.length
                        ? i18n.quiz.nextQuestionBtn
                        : i18n.quiz.seeResultsBtn}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-2 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/70 sepia:bg-amber-200/80 text-amber-800 dark:text-amber-300 sepia:text-amber-950 mx-auto border border-amber-300 dark:border-amber-800 sepia:border-amber-400">
                <Award size={36} />
              </div>
              <div>
                <h4 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 sepia:text-[#382716]">
                  {i18n.quiz.resultsTitle}
                </h4>
                <p className="text-stone-500 dark:text-stone-400 sepia:text-[#78644E] text-sm mt-1">
                  {i18n.quiz.scoreMessage}{' '}
                  <span className="font-bold text-amber-800 dark:text-amber-400 sepia:text-[#8C4712] text-base">
                    {correctCount} / {questions.length}
                  </span>{' '}
                  ({scorePct}%)
                </p>
                {previousRecord && (
                  <p className="text-xs text-stone-400 dark:text-stone-500 sepia:text-[#78644E] mt-0.5">
                    {i18n.quiz.bestScoreMessage} {Math.max(previousRecord.bestScore, scorePct)}%
                  </p>
                )}
              </div>

              {/* Questions Breakdown */}
              <div className="text-left bg-stone-50 dark:bg-stone-900/40 sepia:bg-[#EDE3CB]/60 rounded-2xl p-4 border border-stone-200 dark:border-stone-800 sepia:border-[#DDCFB6] space-y-2.5 max-h-56 overflow-y-auto">
                <span className="text-[11px] uppercase font-bold text-stone-500 dark:text-stone-400 sepia:text-[#78644E] block">
                  {i18n.quiz.breakdownTitle}
                </span>
                {questions.map((q, idx) => {
                  const userChoice = selectedAnswers[idx];
                  const isCorrect = userChoice === q.answer;

                  return (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white dark:bg-[#1E2126] sepia:bg-[#FAF4E6] border border-stone-200/70 dark:border-stone-800 sepia:border-[#DDCFB6] text-xs space-y-1"
                    >
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle size={15} className="text-rose-500 dark:text-rose-400 shrink-0 mt-0.5" />
                        )}
                        <span className="font-medium text-stone-900 dark:text-stone-100 sepia:text-[#382716]">
                          Q{idx + 1}. {q.question}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div className="pl-6 text-stone-500 dark:text-stone-400 sepia:text-[#78644E] space-y-0.5">
                          <p className="text-rose-700 dark:text-rose-400">
                            {i18n.quiz.yourAnswer} {q.options[userChoice] || 'No answer'}
                          </p>
                          <p className="text-emerald-700 dark:text-emerald-400 font-semibold">
                            {i18n.quiz.correctAnswer} {q.options[q.answer]}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 sepia:border-[#DDCFB6] hover:bg-stone-50 dark:hover:bg-stone-800 sepia:hover:bg-[#EDE3CB] text-stone-700 dark:text-stone-300 sepia:text-[#382716] text-sm font-medium transition-colors cursor-pointer"
                >
                  <RotateCcw size={15} /> {i18n.quiz.retakeBtn}
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white dark:text-stone-950 sepia:bg-[#382716] sepia:hover:bg-[#4A3825] sepia:text-[#FAF4E6] text-white text-sm font-semibold transition-colors shadow-xs cursor-pointer"
                >
                  {i18n.quiz.finishBtn}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
