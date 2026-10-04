import { VocabEntry } from '../types';

export interface WordToken {
  id: string;
  rawText: string; // original token text as displayed (may include preceding/trailing space)
  cleanWord: string; // trimmed, cleaned word without punctuation
  isWord: boolean;
  vocab?: VocabEntry;
  sentenceContext: string;
}

export interface SentenceToken {
  id: string;
  text: string;
  tokens: WordToken[];
}

export interface ParagraphStructure {
  id: string;
  originalText: string;
  sentences: SentenceToken[];
}

/**
 * Normalizes a word for vocabulary dictionary lookup.
 * Strips punctuation, quotes, trailing hyphens, and handles common French elisions.
 */
export function cleanFrenchWord(raw: string): string {
  if (!raw) return '';
  let cleaned = raw
    .toLowerCase()
    .replace(/^[«"'(—\s]+/, '')
    .replace(/[»"'),.;:!?—\s]+$/, '');

  // Handle common French elisions: l', d', j', c', qu', s', n', m', t'
  if (/^[ldjcsnmt]'|^qu'/i.test(cleaned)) {
    const afterApostrophe = cleaned.replace(/^[ldjcsnmt]'|^qu'/i, '');
    if (afterApostrophe.length > 0) {
      cleaned = afterApostrophe;
    }
  }

  // Remove interior punctuation if any remains
  return cleaned.trim();
}

/**
 * Finds a matching VocabEntry from story vocabulary or common French baseline words.
 */
export function lookupWord(
  rawWord: string,
  vocabMap: Record<string, VocabEntry>
): { cleanWord: string; entry?: VocabEntry } {
  const cleaned = cleanFrenchWord(rawWord);
  if (!cleaned) return { cleanWord: '' };

  // 1. Exact match in story vocab
  if (vocabMap[cleaned]) {
    return { cleanWord: cleaned, entry: vocabMap[cleaned] };
  }

  // 2. Try removing hyphens or apostrophe variations (e.g., 'petitdéjeuner' vs 'petit-déjeuner')
  const noHyphen = cleaned.replace(/[-_']/g, '');
  if (vocabMap[noHyphen]) {
    return { cleanWord: cleaned, entry: vocabMap[noHyphen] };
  }

  // 3. Try lowercase original token
  const simpleLower = rawWord.toLowerCase().replace(/[^a-zà-öø-ÿ]/gi, '');
  if (vocabMap[simpleLower]) {
    return { cleanWord: simpleLower, entry: vocabMap[simpleLower] };
  }

  // 4. Fallback search across lemmas
  for (const [key, entry] of Object.entries(vocabMap)) {
    if (
      entry.lemma.toLowerCase() === cleaned ||
      entry.lemma.toLowerCase().replace(/[-_']/g, '') === noHyphen
    ) {
      return { cleanWord: key, entry };
    }
  }

  return { cleanWord: cleaned };
}

/**
 * Parses a paragraph into individual sentences and tokens for high-precision tapping.
 * Preserves punctuation, contractions (e.g. "s'arrête", "l'entrée"), and dialogue quotes.
 */
export function parseParagraph(
  paragraph: string,
  vocabMap: Record<string, VocabEntry>,
  paragraphIndex: number
): ParagraphStructure {
  // Regex to split into sentences while retaining sentence ending punctuation
  // Matches segments ending with [.!?] followed by a space, quote, or end of string
  const rawSentences = paragraph.match(/[^.!?]+[.!?]+["»]?|\S+/g) || [paragraph];

  const sentences: SentenceToken[] = rawSentences.map((sentenceText, sIndex) => {
    const trimmedSentence = sentenceText.trim();
    const sentenceId = `p${paragraphIndex}-s${sIndex}`;

    // Tokenize sentence into word and non-word pieces
    // We treat French contractions: l'ami -> ["l'", "ami"] or "s'arrête" -> ["s'", "arrête"]
    // using regex that captures words with accents and apostrophe prefixes
    const tokenRegex = /([a-zA-ZÀ-ÖØ-öø-ÿ]+['’]|[a-zA-ZÀ-ÖØ-öø-ÿ]+|[^a-zA-ZÀ-ÖØ-öø-ÿ\s]+|\s+)/g;
    const rawTokens = trimmedSentence.match(tokenRegex) || [trimmedSentence];

    const tokens: WordToken[] = rawTokens.map((rawToken, tIndex) => {
      const isWord = /[a-zA-ZÀ-ÖØ-öø-ÿ]/.test(rawToken);
      const clean = cleanFrenchWord(rawToken);
      const { entry } = isWord ? lookupWord(rawToken, vocabMap) : { entry: undefined };

      return {
        id: `${sentenceId}-t${tIndex}`,
        rawText: rawToken,
        cleanWord: clean,
        isWord,
        vocab: entry,
        sentenceContext: trimmedSentence
      };
    });

    return {
      id: sentenceId,
      text: trimmedSentence,
      tokens
    };
  });

  return {
    id: `para-${paragraphIndex}`,
    originalText: paragraph,
    sentences
  };
}
