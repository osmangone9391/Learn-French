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

  let lemmaDisplay: string | undefined = undefined;
  if (vocab.pos === 'noun') {
    lemmaDisplay = vocab.lemmaWithArticle || vocab.lemma;
  } else if (vocab.pos === 'verb') {
    lemmaDisplay = vocab.lemma;
  } else if (vocab.lemma && vocab.lemma.toLowerCase() !== word.toLowerCase()) {
    lemmaDisplay = vocab.lemma;
  }

  return {
    pos: vocab.pos,
    gender: vocab.gender,
    number: vocab.number,
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

  // 1. Direct fields if already stored in savedWord
  if (
    savedWord.gender ||
    savedWord.number ||
    savedWord.person ||
    savedWord.tense ||
    savedWord.lemmaWithArticle
  ) {
    let lemmaDisplay: string | undefined = undefined;
    if (savedWord.pos === 'noun') {
      lemmaDisplay = savedWord.lemmaWithArticle || savedWord.lemma;
    } else if (savedWord.pos === 'verb') {
      lemmaDisplay = savedWord.lemma;
    } else if (savedWord.lemma && savedWord.lemma.toLowerCase() !== savedWord.word.toLowerCase()) {
      lemmaDisplay = savedWord.lemma;
    }

    return {
      pos: savedWord.pos,
      gender: savedWord.gender,
      number: savedWord.number,
      person: savedWord.person,
      tense: savedWord.tense,
      lemmaDisplay
    };
  }

  // 2. Fallback: look up in story vocabulary cache
  const wordKey = savedWord.word.toLowerCase().trim();
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
    return getGrammarForVocab(savedWord.word, match);
  }

  // Older saved word not in any story data: return basic pos without crashing
  if (savedWord.pos) {
    return {
      pos: savedWord.pos,
      lemmaDisplay:
        savedWord.lemma && savedWord.lemma.toLowerCase() !== savedWord.word.toLowerCase()
          ? savedWord.lemma
          : undefined
    };
  }

  return null;
}
