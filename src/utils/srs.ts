import { SavedWord, ReviewCardMode } from '../types';

/**
 * Leitner Box Intervals in days
 * Box 1: 1 day
 * Box 2: 3 days
 * Box 3: 7 days
 * Box 4: 14 days
 * Box 5: 30 days (Mastered)
 */
export const LEITNER_INTERVALS_DAYS: Record<number, number> = {
  1: 1,
  2: 3,
  3: 7,
  4: 14,
  5: 30
};

export const MAX_SRS_BOX = 5;

/**
 * Normalizes a date to YYYY-MM-DD for accurate day-level comparison.
 */
export function toDateString(d: Date | string): string {
  const dateObj = typeof d === 'string' ? new Date(d) : d;
  if (isNaN(dateObj.getTime())) {
    return new Date().toISOString().split('T')[0];
  }
  return dateObj.toISOString().split('T')[0];
}

/**
 * Adds N days to a date.
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Checks if a card is due for review today or overdue.
 */
export function isCardDue(card: SavedWord, targetDate: Date = new Date()): boolean {
  // If never reviewed, it's a new card ready to learn
  if (card.timesReviewed === 0) return true;

  const todayStr = toDateString(targetDate);
  const reviewDueStr = toDateString(card.nextReviewDate);
  return reviewDueStr <= todayStr;
}

/**
 * Selects due cards based on daily review and new words limits.
 */
export function getDailyStudyQueue(
  cards: SavedWord[],
  reviewLimit: number = 20,
  newWordsLimit: number = 10,
  targetDate: Date = new Date()
): { dueReviewCards: SavedWord[]; newCards: SavedWord[]; totalQueue: SavedWord[] } {
  const todayStr = toDateString(targetDate);

  // Separate new cards (0 reviews) and review cards (>0 reviews)
  const newCardsAll = cards.filter(c => c.timesReviewed === 0);
  const reviewCardsAll = cards.filter(c => c.timesReviewed > 0 && toDateString(c.nextReviewDate) <= todayStr);

  // Sort review cards: oldest due dates first, lower boxes first
  const sortedReviews = [...reviewCardsAll].sort((a, b) => {
    if (a.srsStage !== b.srsStage) return a.srsStage - b.srsStage;
    return a.nextReviewDate.localeCompare(b.nextReviewDate);
  });

  const dueReviewCards = sortedReviews.slice(0, reviewLimit);
  const newCards = newCardsAll.slice(0, newWordsLimit);

  // Combine: reviews first for retention, then new cards
  const totalQueue = [...dueReviewCards, ...newCards];

  return {
    dueReviewCards,
    newCards,
    totalQueue
  };
}

/**
 * Processes a card answer according to Leitner rules:
 * - If correct: moves up one box (max 5). Next review = now + INTERVALS[newBox].
 * - If wrong: resets to Box 1. Next review = now + 1 day.
 */
export function processCardReview(
  card: SavedWord,
  isCorrect: boolean
): {
  updatedCard: SavedWord;
  previousBox: number;
  newBox: number;
  movedUp: boolean;
  movedDown: boolean;
} {
  const currentBox = Math.max(1, Math.min(MAX_SRS_BOX, card.srsStage || 1));
  const now = new Date();

  let newBox = currentBox;
  let movedUp = false;
  let movedDown = false;

  if (isCorrect) {
    if (currentBox < MAX_SRS_BOX) {
      newBox = currentBox + 1;
      movedUp = true;
    }
  } else {
    newBox = 1; // drop back to Box 1 on mistake
    if (currentBox > 1) {
      movedDown = true;
    }
  }

  const intervalDays = LEITNER_INTERVALS_DAYS[newBox] || 1;
  const nextDate = addDays(now, intervalDays);

  const updatedCard: SavedWord = {
    ...card,
    srsStage: newBox,
    nextReviewDate: nextDate.toISOString(),
    timesReviewed: (card.timesReviewed || 0) + 1,
    timesCorrect: (card.timesCorrect || 0) + (isCorrect ? 1 : 0),
    lastReviewedDate: now.toISOString()
  };

  return {
    updatedCard,
    previousBox: currentBox,
    newBox,
    movedUp,
    movedDown
  };
}

/**
 * Determines the review mode based on card box level:
 * - Box 1-2: recognition (fr_to_meaning) & listening (listen_to_meaning)
 * - Box 3-5: recall (meaning_to_fr) & cloze (sentence_cloze)
 */
export function pickReviewCardMode(
  box: number,
  card: SavedWord,
  indexInSession: number
): ReviewCardMode {
  const currentBox = Math.max(1, Math.min(MAX_SRS_BOX, box));
  const hasSentence = Boolean(
    card.sentence &&
    card.sentence.trim().length > 10 &&
    card.sentence.toLowerCase().includes(card.word.toLowerCase())
  );

  if (currentBox <= 2) {
    // Alternate between French recognition and listening comprehension
    return indexInSession % 2 === 0 ? 'fr_to_meaning' : 'listen_to_meaning';
  } else {
    // Advanced: recall & cloze
    if (hasSentence && indexInSession % 2 === 1) {
      return 'sentence_cloze';
    }
    return 'meaning_to_fr';
  }
}

/**
 * Creates cloze test string by replacing the target word with blank "________"
 */
export function createClozeSentence(sentence: string, targetWord: string): string {
  if (!sentence || !targetWord) return sentence;
  const escaped = targetWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
  if (regex.test(sentence)) {
    return sentence.replace(regex, '________');
  }
  // Fallback: replace any occurrence
  return sentence.replace(new RegExp(escaped, 'gi'), '________');
}

/**
 * Generates 3 distractors from the pool of saved words or baseline vocabulary
 */
export function generateDistractors(
  targetCard: SavedWord,
  allPool: SavedWord[],
  mode: ReviewCardMode
): { label: string; isCorrect: boolean; rawWord?: string }[] {
  const isFrenchAnswer = mode === 'meaning_to_fr' || mode === 'sentence_cloze';

  // Correct option
  const correctOption = {
    label: isFrenchAnswer
      ? targetCard.word
      : `${targetCard.bn} (${targetCard.en})`,
    isCorrect: true,
    rawWord: targetCard.word
  };

  // Filter pool excluding current target
  const otherItems = allPool.filter(
    c => c.id !== targetCard.id && c.word.toLowerCase() !== targetCard.word.toLowerCase()
  );

  // Shuffle and pick 3
  const shuffledOthers = [...otherItems].sort(() => 0.5 - Math.random());
  const selectedDistractors = shuffledOthers.slice(0, 3).map(c => ({
    label: isFrenchAnswer
      ? c.word
      : `${c.bn} (${c.en})`,
    isCorrect: false,
    rawWord: c.word
  }));

  // If pool has fewer than 3 items, provide high-frequency French fallback options
  const FALLBACK_DISTRACTORS = [
    { word: 'baguette', bn: 'বাগেট রুটি', en: 'baguette' },
    { word: 'métro', bn: 'মেট্রো', en: 'metro' },
    { word: 'café', bn: 'কফি', en: 'coffee' },
    { word: 'billet', bn: 'টিকিট / নোট', en: 'ticket' },
    { word: 'école', bn: 'স্কুল', en: 'school' },
    { word: 'ordinateur', bn: 'কম্পিউটার', en: 'computer' }
  ];

  while (selectedDistractors.length < 3) {
    const fallback = FALLBACK_DISTRACTORS.find(
      f =>
        f.word.toLowerCase() !== targetCard.word.toLowerCase() &&
        !selectedDistractors.some(d => d.rawWord?.toLowerCase() === f.word.toLowerCase())
    );
    if (!fallback) break;
    selectedDistractors.push({
      label: isFrenchAnswer
        ? fallback.word
        : `${fallback.bn} (${fallback.en})`,
      isCorrect: false,
      rawWord: fallback.word
    });
  }

  // Combine and shuffle the 4 options
  const finalOptions = [correctOption, ...selectedDistractors].sort(() => 0.5 - Math.random());
  return finalOptions;
}
