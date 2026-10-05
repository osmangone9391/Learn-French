import { Story, VocabEntry } from '../types';
import { lookupWord, cleanFrenchWord } from './textParser';

const VALID_POS = new Set([
  'noun',
  'verb',
  'adjective',
  'adverb',
  'preposition',
  'pronoun',
  'conjunction',
  'expression',
  'article',
  'interjection',
  'number'
]);

const VALID_GENDERS = new Set(['masculine', 'feminine']);
const VALID_NUMBERS = new Set(['singular', 'plural']);
const VALID_TENSES = new Set([
  'present',
  'imperfect',
  'future',
  'conditional',
  'subjunctive',
  'imperative',
  'infinitive',
  'past participle',
  'present participle'
]);
const VALID_PERSONS = new Set([
  '1st person singular',
  '2nd person singular',
  '3rd person singular',
  '1st person plural',
  '2nd person plural',
  '3rd person plural'
]);

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  wordCount: number;
}

export function validateStory(
  story: Story,
  options?: {
    expectedLevel?: 'A1' | 'A2';
    expectedLength?: 'short' | 'medium' | 'long';
  }
): ValidationResult {
  const errors: string[] = [];

  // 1. Basic Fields
  if (!story.title?.trim()) errors.push('Missing French story title');
  if (!story.subtitle?.trim()) errors.push('Missing French story subtitle');
  if (!story.topic?.trim()) errors.push('Missing story topic');
  if (!Array.isArray(story.paragraphs) || story.paragraphs.length === 0) {
    errors.push('Story must have at least one paragraph');
  }

  // 2. Word count calculation
  const fullText = (story.paragraphs || []).join(' ');
  const actualTokens = fullText.split(/\s+/).filter(w => w.length > 0);
  const actualWordCount = actualTokens.length;

  if (options?.expectedLength === 'short') {
    if (actualWordCount < 90 || actualWordCount > 195) {
      errors.push(`Short story word count is ${actualWordCount} (expected 100-180 words)`);
    }
  } else if (options?.expectedLength === 'medium') {
    if (actualWordCount < 170 || actualWordCount > 320) {
      errors.push(`Medium story word count is ${actualWordCount} (expected 180-300 words)`);
    }
  } else if (options?.expectedLength === 'long') {
    if (actualWordCount < 280 || actualWordCount > 470) {
      errors.push(`Long story word count is ${actualWordCount} (expected 300-450 words)`);
    }
  }

  // 3. Paragraph and translation alignment
  if (!Array.isArray(story.paragraphTranslations)) {
    errors.push('Missing paragraphTranslations array');
  } else if (story.paragraphs.length !== story.paragraphTranslations.length) {
    errors.push(
      `Paragraph count mismatch: ${story.paragraphs.length} French paragraphs vs ${story.paragraphTranslations.length} translations`
    );
  } else {
    story.paragraphs.forEach((p, idx) => {
      const trans = story.paragraphTranslations[idx];
      if (!trans || !trans.trim()) {
        errors.push(`Empty translation for paragraph ${idx + 1}`);
        return;
      }
      const frSentences = p.match(/[^.!?]+[.!?]+["»]?|\S+/g) || [];
      const enSentences = trans.match(/[^.!?]+[.!?]+["»]?|\S+/g) || [];
      if (Math.abs(frSentences.length - enSentences.length) > 1) {
        errors.push(
          `Paragraph ${idx + 1} sentence count mismatch: ${frSentences.length} French vs ${enSentences.length} English sentences`
        );
      }
    });
  }

  // 4. Quiz Validation
  if (!Array.isArray(story.quiz) || story.quiz.length < 3) {
    errors.push(`Quiz must contain at least 3 questions (found ${story.quiz?.length || 0})`);
  } else {
    story.quiz.forEach((q, idx) => {
      if (!q.question?.trim()) errors.push(`Quiz Q${idx + 1}: empty question`);
      if (!Array.isArray(q.options) || q.options.length < 3) {
        errors.push(`Quiz Q${idx + 1}: needs at least 3 options`);
      }
      if (typeof q.answer !== 'number' || q.answer < 0 || q.answer >= (q.options?.length || 0)) {
        errors.push(`Quiz Q${idx + 1}: invalid answer index ${q.answer}`);
      }
      if (!q.explanation?.trim()) errors.push(`Quiz Q${idx + 1}: missing English explanation`);
      if (!q.explanationBn?.trim()) errors.push(`Quiz Q${idx + 1}: missing Bangla explanation`);
    });
  }

  // 5. Vocabulary Map Validation
  const vocab = story.vocabulary || {};
  for (const [key, entry] of Object.entries(vocab)) {
    if (!entry.lemma?.trim()) errors.push(`Vocab "${key}": missing lemma`);
    if (!entry.en?.trim()) errors.push(`Vocab "${key}": missing English meaning`);
    if (!entry.bn?.trim()) errors.push(`Vocab "${key}": missing Bangla meaning`);
    if (!entry.pos || !VALID_POS.has(entry.pos)) {
      errors.push(`Vocab "${key}": invalid part of speech "${entry.pos}"`);
    }

    if (entry.pos === 'noun') {
      if (!entry.gender || !VALID_GENDERS.has(entry.gender)) {
        errors.push(`Vocab "${key}" (noun): missing or invalid gender`);
      }
      if (!entry.number || !VALID_NUMBERS.has(entry.number)) {
        errors.push(`Vocab "${key}" (noun): missing or invalid number`);
      }
      if (!entry.lemmaWithArticle?.trim()) {
        errors.push(`Vocab "${key}" (noun): missing lemmaWithArticle`);
      }
    } else if (entry.pos === 'adjective') {
      if (!entry.gender || !VALID_GENDERS.has(entry.gender)) {
        errors.push(`Vocab "${key}" (adjective): missing or invalid gender`);
      }
      if (!entry.number || !VALID_NUMBERS.has(entry.number)) {
        errors.push(`Vocab "${key}" (adjective): missing or invalid number`);
      }
    } else if (entry.pos === 'article') {
      const lowerKey = key.toLowerCase();
      if (lowerKey === 'les' || lowerKey === 'des' || entry.lemma === 'les') {
        if (entry.gender) {
          errors.push(`Vocab "${key}" (article): "les" and "des" must not have gender`);
        }
        if (entry.number !== 'plural') {
          errors.push(`Vocab "${key}" (article): "les" and "des" must have number "plural"`);
        }
      } else if (['le', 'la', 'un', 'une', 'du'].includes(lowerKey)) {
        if (!entry.gender || !VALID_GENDERS.has(entry.gender)) {
          errors.push(`Vocab "${key}" (article): missing or invalid gender`);
        }
        if (entry.number !== 'singular') {
          errors.push(`Vocab "${key}" (article): must have number "singular"`);
        }
      } else if (lowerKey === 'l') {
        if (entry.number !== 'singular') {
          errors.push(`Vocab "l" (article): must have number "singular"`);
        }
      }
    } else if (entry.pos === 'number') {
      if (entry.gender) {
        errors.push(`Vocab "${key}" (number): numbers must not have gender`);
      }
      if (entry.number) {
        errors.push(`Vocab "${key}" (number): numbers must not have singular/plural number chip`);
      }
    } else if (entry.pos === 'verb') {
      if (entry.gender || entry.number) {
        errors.push(`Vocab "${key}" (verb): verbs must not have gender or number`);
      }
      if (!entry.tense || !VALID_TENSES.has(entry.tense)) {
        errors.push(`Vocab "${key}" (verb): missing or invalid tense "${entry.tense}"`);
      }
      const isNonFinite =
        entry.tense === 'infinitive' ||
        entry.tense === 'past participle' ||
        entry.tense === 'present participle';
      if (!isNonFinite && (!entry.person || !VALID_PERSONS.has(entry.person))) {
        errors.push(`Vocab "${key}" (verb): finite verb requires valid person`);
      }
    }
  }

  // 6. Token Coverage Check in Paragraphs
  const missingTokens = new Set<string>();
  story.paragraphs.forEach(p => {
    const tokens = p.match(/[a-zA-ZÀ-ÿ0-9'’-]+/g) || [];
    tokens.forEach(tok => {
      if (/^\d+$/.test(tok)) return; // skip pure numbers
      const cleaned = cleanFrenchWord(tok);
      if (!cleaned || (cleaned.length <= 1 && !['a', 'y', 'à', 'ô'].includes(cleaned))) return;

      const { entry } = lookupWord(tok, story.vocabulary);
      if (!entry) {
        missingTokens.add(tok);
      }
    });
  });

  if (missingTokens.size > 0) {
    errors.push(
      `Missing vocabulary mapping for ${missingTokens.size} words: ${Array.from(missingTokens).slice(0, 8).join(', ')}${missingTokens.size > 8 ? '...' : ''}`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
    wordCount: actualWordCount
  };
}
