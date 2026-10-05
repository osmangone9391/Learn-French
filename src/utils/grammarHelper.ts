import { VocabEntry, SavedWord, PartOfSpeech, Gender, GrammaticalNumber } from '../types';
import { INITIAL_STORIES } from '../data/stories';

export interface GrammarDisplayInfo {
  pos: PartOfSpeech;
  gender?: Gender;
  number?: GrammaticalNumber;
  person?: string;
  tense?: string;
  lemmaDisplay?: string; // e.g. "la baguette", "le croissant", "petit", "manger"
}

// Build lookup caches across stories
const storyVocabLookup = new Map<string, VocabEntry>();
const globalVocabLookup = new Map<string, VocabEntry>();

INITIAL_STORIES.forEach((story) => {
  if (!story.vocabulary) return;
  Object.entries(story.vocabulary).forEach(([key, entry]) => {
    const lowerKey = key.toLowerCase().trim();
    storyVocabLookup.set(`${story.id}:${lowerKey}`, entry);
    if (!globalVocabLookup.has(lowerKey)) {
      globalVocabLookup.set(lowerKey, entry);
    }
    if (entry.lemma) {
      const lowerLemma = entry.lemma.toLowerCase().trim();
      if (!globalVocabLookup.has(lowerLemma)) {
        globalVocabLookup.set(lowerLemma, entry);
      }
    }
  });
});

/**
 * Extracts and formats grammar details from a vocabulary entry
 */
export function getGrammarForVocab(
  word: string,
  vocab?: VocabEntry
): GrammarDisplayInfo | null {
  if (!vocab) return null;

  // Rule 1: The articles "les" and "des" must show only "article · plural" (no gender)
  const isPluralArticle =
    vocab.pos === 'article' &&
    (vocab.number === 'plural' ||
      word.toLowerCase() === 'les' ||
      word.toLowerCase() === 'des' ||
      vocab.lemma === 'les' ||
      vocab.lemma === 'des');

  // Rule 2: Numbers (deux, trois, etc.) must show "number" as POS with no gender and no singular/plural chip
  const isNumber = vocab.pos === 'number';

  let lemmaDisplay: string | undefined = undefined;
  if (!isNumber) {
    if (vocab.pos === 'noun') {
      lemmaDisplay = vocab.lemmaWithArticle || vocab.lemma;
    } else if (vocab.pos === 'verb') {
      lemmaDisplay = vocab.lemma;
    } else if (vocab.lemma && vocab.lemma.toLowerCase() !== word.toLowerCase()) {
      lemmaDisplay = vocab.lemma;
    }
  }

  return {
    pos: vocab.pos,
    gender: isPluralArticle || isNumber ? undefined : vocab.gender,
    number: isNumber ? undefined : (isPluralArticle ? 'plural' : vocab.number),
    person: vocab.person,
    tense: vocab.tense,
    lemmaDisplay
  };
}

/**
 * Retrieves grammar info for a saved word.
 * If the saved word already has grammar fields stored, uses them.
 * If saved before this update, looks it up safely from the story data.
 * If not found, returns null so the card displays gracefully without crashing.
 */
export function getGrammarForSavedWord(savedWord: SavedWord): GrammarDisplayInfo | null {
  if (!savedWord) return null;

  const lowerWord = savedWord.word.toLowerCase().trim();
  const isPluralArticle =
    savedWord.pos === 'article' &&
    (savedWord.number === 'plural' ||
      lowerWord === 'les' ||
      lowerWord === 'des' ||
      savedWord.lemma === 'les' ||
      savedWord.lemma === 'des');
  const isNumber = savedWord.pos === 'number';

  // 1. Direct fields if already stored in savedWord
  if (
    savedWord.gender ||
    savedWord.number ||
    savedWord.person ||
    savedWord.tense ||
    savedWord.lemmaWithArticle ||
    isNumber
  ) {
    let lemmaDisplay: string | undefined = undefined;
    if (!isNumber) {
      if (savedWord.pos === 'noun') {
        lemmaDisplay = savedWord.lemmaWithArticle || savedWord.lemma;
      } else if (savedWord.pos === 'verb') {
        lemmaDisplay = savedWord.lemma;
      } else if (savedWord.lemma && savedWord.lemma.toLowerCase() !== lowerWord) {
        lemmaDisplay = savedWord.lemma;
      }
    }

    let resolvedGender = isPluralArticle || isNumber ? undefined : savedWord.gender;

    // For l', if gender is missing, check sentence for the noun it belongs to
    if (!resolvedGender && (lowerWord === 'l' || lowerWord === "l'")) {
      const match = savedWord.sentence?.match(/\bl['’]([a-zA-ZÀ-ÖØ-öø-ÿ]+)/i);
      if (match) {
        const nounKey = match[1].toLowerCase().trim();
        const nounVocab =
          (savedWord.storyId ? storyVocabLookup.get(`${savedWord.storyId}:${nounKey}`) : undefined) ||
          globalVocabLookup.get(nounKey);
        if (nounVocab && nounVocab.pos === 'noun' && nounVocab.gender) {
          resolvedGender = nounVocab.gender;
        }
      }
    }

    return {
      pos: savedWord.pos,
      gender: resolvedGender,
      number: isNumber ? undefined : (isPluralArticle ? 'plural' : savedWord.number),
      person: savedWord.person,
      tense: savedWord.tense,
      lemmaDisplay
    };
  }

  // 2. Fallback: look up in story vocabulary cache
  const wordKey = lowerWord;
  const lemmaKey = savedWord.lemma ? savedWord.lemma.toLowerCase().trim() : '';

  let match: VocabEntry | undefined;
  if (savedWord.storyId) {
    match =
      storyVocabLookup.get(`${savedWord.storyId}:${wordKey}`) ||
      storyVocabLookup.get(`${savedWord.storyId}:${lemmaKey}`);
  }
  if (!match) {
    match = globalVocabLookup.get(wordKey) || globalVocabLookup.get(lemmaKey);
  }

  if (match) {
    const info = getGrammarForVocab(savedWord.word, match);
    if (info && !info.gender && (lowerWord === 'l' || lowerWord === "l'")) {
      const matchWord = savedWord.sentence?.match(/\bl['’]([a-zA-ZÀ-ÖØ-öø-ÿ]+)/i);
      if (matchWord) {
        const nounKey = matchWord[1].toLowerCase().trim();
        const nounVocab =
          (savedWord.storyId ? storyVocabLookup.get(`${savedWord.storyId}:${nounKey}`) : undefined) ||
          globalVocabLookup.get(nounKey);
        if (nounVocab && nounVocab.pos === 'noun' && nounVocab.gender) {
          info.gender = nounVocab.gender;
        }
      }
    }
    return info;
  }

  // Older saved word not in any story data: return basic pos without crashing
  if (savedWord.pos) {
    return {
      pos: savedWord.pos,
      number: isPluralArticle ? 'plural' : undefined,
      lemmaDisplay:
        !isNumber && savedWord.lemma && savedWord.lemma.toLowerCase() !== lowerWord
          ? savedWord.lemma
          : undefined
    };
  }

  return null;
}
