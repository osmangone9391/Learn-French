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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col text-stone-800 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 bg-stone-50">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              {i18n.quiz.title}
            </span>
            <h3 className="text-base font-serif font-bold text-stone-900 line-clamp-1">
              {story.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {!isFinished && currentQuestion ? (
            <div>
              {/* Question counter & progress bar */}
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span>
                  {i18n.quiz.questionCounter.replace('{current}', String(currentQuestionIndex + 1)).replace('{total}', String(questions.length))}
                </span>
                <span className="font-semibold text-stone-700">
                  {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden mb-6">
                <div
                  className="bg-amber-600 h-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                  }}
                />
              </div>

              {/* Question Text */}
              <h4 className="text-lg font-serif font-bold text-stone-950 leading-snug">
                {currentQuestion.question}
              </h4>

              {/* Options */}
              <div className="mt-5 space-y-2.5">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === idx;
                  const isCorrect = currentQuestion.answer === idx;

                  let optionStyle =
                    'border-stone-200 hover:border-amber-400 bg-white text-stone-800';

                  if (showExplanation) {
                    if (isCorrect) {
                      optionStyle =
                        'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium ring-1 ring-emerald-500';
                    } else if (isSelected && !isCorrect) {
                      optionStyle =
                        'border-rose-400 bg-rose-50 text-rose-950 font-medium';
                    } else {
                      optionStyle = 'border-stone-200 opacity-60 bg-stone-50';
                    }
                  } else if (isSelected) {
                    optionStyle =
                      'border-amber-600 bg-amber-50 text-amber-950 font-medium';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={showExplanation}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm sm:text-base transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                    >
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold shrink-0 mt-0.5 bg-stone-100 text-stone-700 border border-stone-200">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {showExplanation && isCorrect && (
                        <CheckCircle size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                      )}
                      {showExplanation && isSelected && !isCorrect && (
                        <AlertCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation section when answered */}
              {showExplanation && (
                <div className="mt-5 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-xs sm:text-sm animate-in fade-in">
                  <div className="font-semibold text-amber-950 mb-1 flex items-center gap-1.5">
                    {selectedAnswers[currentQuestionIndex] === currentQuestion.answer ? (
                      <span className="text-emerald-700 font-bold">{i18n.quiz.correctFeedback}</span>
                    ) : (
                      <span className="text-rose-700 font-bold">{i18n.quiz.wrongFeedback}</span>
                    )}
                  </div>
                  <p className="text-stone-700 font-sans leading-relaxed mt-1">
                    <span className="font-semibold">{i18n.quiz.explanationLabel}</span> {currentQuestion.explanation}
                  </p>
                  {currentQuestion.explanationBn && (
                    <p className="text-amber-900 mt-2 pt-2 border-t border-amber-200/60 font-bn leading-relaxed">
                      <span className="font-semibold">{i18n.quiz.banglaExplanationLabel}</span> {currentQuestion.explanationBn}
                    </p>
                  )}

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleNext}
                      className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-medium transition-colors shadow-xs cursor-pointer"
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
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-800 mx-auto">
                <Award size={36} />
              </div>
              <div>
                <h4 className="text-2xl font-serif font-bold text-stone-900">
                  {i18n.quiz.resultsTitle}
                </h4>
                <p className="text-stone-500 text-sm mt-1">
                  {i18n.quiz.scoreMessage}{' '}
                  <span className="font-bold text-amber-800 text-base">
                    {correctCount} / {questions.length}
                  </span>{' '}
                  ({scorePct}%)
                </p>
                {previousRecord && (
                  <p className="text-xs text-stone-400 mt-0.5">
                    {i18n.quiz.bestScoreMessage} {Math.max(previousRecord.bestScore, scorePct)}%
                  </p>
                )}
              </div>

              {/* Questions Breakdown: which ones were correct / incorrect */}
              <div className="text-left bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2.5 max-h-56 overflow-y-auto">
                <span className="text-[11px] uppercase font-bold text-stone-500 block">
                  {i18n.quiz.breakdownTitle}
                </span>
                {questions.map((q, idx) => {
                  const userChoice = selectedAnswers[idx];
                  const isCorrect = userChoice === q.answer;

                  return (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white border border-stone-200/70 text-xs space-y-1"
                    >
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle size={15} className="text-rose-500 shrink-0 mt-0.5" />
                        )}
                        <span className="font-medium text-stone-900">
                          Q{idx + 1}. {q.question}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div className="pl-6 text-stone-500 space-y-0.5">
                          <p className="text-rose-700">
                            {i18n.quiz.yourAnswer} {q.options[userChoice] || 'No answer'}
                          </p>
                          <p className="text-emerald-700 font-semibold">
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
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-sm font-medium transition-colors cursor-pointer"
                >
                  <RotateCcw size={15} /> {i18n.quiz.retakeBtn}
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium transition-colors shadow-xs cursor-pointer"
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
