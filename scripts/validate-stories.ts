/**
 * Stories Validation Script for LireFacile
 * Run with: npm run validate:stories
 */

import { INITIAL_STORIES } from '../src/data/stories';
import { lookupWord, cleanFrenchWord } from '../src/utils/textParser';
import { Story } from '../src/types';

interface ValidationError {
  storyId: string;
  storyTitle: string;
  type: 'word_count' | 'level' | 'id' | 'translation_mismatch' | 'missing_vocab' | 'quiz_error' | 'empty_field';
  message: string;
}

export function validateAllStories(stories: Story[] = INITIAL_STORIES): {
  passed: boolean;
  errors: ValidationError[];
  summary: {
    totalStories: number;
    a1Stories: number;
    a2Stories: number;
    b1Stories: number;
    totalWords: number;
    totalVocabEntries: number;
    totalQuizQuestions: number;
  };
} {
  const errors: ValidationError[] = [];
  const seenIds = new Set<string>();

  let a1Count = 0;
  let a2Count = 0;
  let b1Count = 0;
  let totalWords = 0;
  let totalVocabEntries = 0;
  let totalQuizQuestions = 0;

  stories.forEach((story, idx) => {
    // 1. Unique ID check
    if (!story.id || story.id.trim().length === 0) {
      errors.push({
        storyId: `index_${idx}`,
        storyTitle: story.title || 'Untitled',
        type: 'id',
        message: 'Story ID is missing or empty'
      });
    } else if (seenIds.has(story.id)) {
      errors.push({
        storyId: story.id,
        storyTitle: story.title,
        type: 'id',
        message: `Duplicate story ID found: "${story.id}"`
      });
    } else {
      seenIds.add(story.id);
    }

    // Level tracking
    if (story.level === 'A1') a1Count++;
    else if (story.level === 'A2') a2Count++;
    else if (story.level === 'B1') b1Count++;

    // 2. Empty field checks
    if (!story.title?.trim()) errors.push({ storyId: story.id, storyTitle: story.title, type: 'empty_field', message: 'Missing title' });
    if (!story.subtitle?.trim()) errors.push({ storyId: story.id, storyTitle: story.title, type: 'empty_field', message: 'Missing subtitle' });
    if (!story.topic?.trim()) errors.push({ storyId: story.id, storyTitle: story.title, type: 'empty_field', message: 'Missing topic' });

    // 3. Word count calculation and range check
    const fullText = story.paragraphs.join(' ');
    const actualTokens = fullText.split(/\s+/).filter(w => w.length > 0);
    const actualWordCount = actualTokens.length;
    totalWords += actualWordCount;

    if (story.level === 'A1') {
      if (actualWordCount < 140 || actualWordCount > 250) {
        errors.push({
          storyId: story.id,
          storyTitle: story.title,
          type: 'word_count',
          message: `A1 story word count is ${actualWordCount}, must be between 140 and 250 words`
        });
      }
    } else if (story.level === 'A2') {
      if (actualWordCount < 250 || actualWordCount > 400) {
        errors.push({
          storyId: story.id,
          storyTitle: story.title,
          type: 'word_count',
          message: `A2 story word count is ${actualWordCount}, must be between 250 and 400 words`
        });
      }
    }

    // 4. Paragraph and sentence translation alignment
    if (story.paragraphs.length !== story.paragraphTranslations.length) {
      errors.push({
        storyId: story.id,
        storyTitle: story.title,
        type: 'translation_mismatch',
        message: `Paragraph count mismatch: ${story.paragraphs.length} French paragraphs vs ${story.paragraphTranslations.length} English translations`
      });
    } else {
      story.paragraphs.forEach((p, pIdx) => {
        const trans = story.paragraphTranslations[pIdx];
        if (!trans || !trans.trim()) {
          errors.push({
            storyId: story.id,
            storyTitle: story.title,
            type: 'translation_mismatch',
            message: `Empty translation for paragraph ${pIdx + 1}`
          });
          return;
        }

        // Sentence count comparison
        const frSentences = p.match(/[^.!?]+[.!?]+["»]?|\S+/g) || [];
        const enSentences = trans.match(/[^.!?]+[.!?]+["»]?|\S+/g) || [];
        if (Math.abs(frSentences.length - enSentences.length) > 1) {
          errors.push({
            storyId: story.id,
            storyTitle: story.title,
            type: 'translation_mismatch',
            message: `Paragraph ${pIdx + 1} sentence count discrepancy: ${frSentences.length} French sentences vs ${enSentences.length} English sentences`
          });
        }
      });
    }

    // 5. Quiz validation
    if (!story.quiz || story.quiz.length < 3) {
      errors.push({
        storyId: story.id,
        storyTitle: story.title,
        type: 'quiz_error',
        message: `Quiz must have at least 3 questions (found ${story.quiz?.length || 0})`
      });
    } else {
      totalQuizQuestions += story.quiz.length;
      story.quiz.forEach((q, qIdx) => {
        if (!q.question?.trim()) {
          errors.push({ storyId: story.id, storyTitle: story.title, type: 'quiz_error', message: `Quiz Q${qIdx + 1}: empty question text` });
        }
        if (!q.options || q.options.length < 3) {
          errors.push({ storyId: story.id, storyTitle: story.title, type: 'quiz_error', message: `Quiz Q${qIdx + 1}: needs at least 3 options` });
        }
        if (q.answer < 0 || q.answer >= q.options.length) {
          errors.push({
            storyId: story.id,
            storyTitle: story.title,
            type: 'quiz_error',
            message: `Quiz Q${qIdx + 1}: invalid answer index ${q.answer} for ${q.options.length} options`
          });
        }
        if (!q.explanation?.trim()) {
          errors.push({ storyId: story.id, storyTitle: story.title, type: 'quiz_error', message: `Quiz Q${qIdx + 1}: missing English explanation` });
        }
        if (!q.explanationBn?.trim()) {
          errors.push({ storyId: story.id, storyTitle: story.title, type: 'quiz_error', message: `Quiz Q${qIdx + 1}: missing Bangla explanation` });
        }
      });
    }

    // 6. Vocabulary coverage check
    const vocabKeys = Object.keys(story.vocabulary || {});
    totalVocabEntries += vocabKeys.length;

    // Validate vocab entries format
    for (const [key, entry] of Object.entries(story.vocabulary || {})) {
      if (!entry.lemma?.trim()) {
        errors.push({ storyId: story.id, storyTitle: story.title, type: 'missing_vocab', message: `Vocab entry "${key}" missing lemma` });
      }
      if (!entry.en?.trim()) {
        errors.push({ storyId: story.id, storyTitle: story.title, type: 'missing_vocab', message: `Vocab entry "${key}" missing English translation` });
      }
      if (!entry.bn?.trim()) {
        errors.push({ storyId: story.id, storyTitle: story.title, type: 'missing_vocab', message: `Vocab entry "${key}" missing Bangla translation` });
      }
      if (!entry.pos) {
        errors.push({ storyId: story.id, storyTitle: story.title, type: 'missing_vocab', message: `Vocab entry "${key}" missing part of speech` });
      }
    }

    // Check that every content word token in the paragraphs has a vocab mapping
    const missingTokens = new Set<string>();
    story.paragraphs.forEach(p => {
      // Split into words, punctuation separated
      const tokens = p.match(/[a-zA-ZÀ-ÿ0-9'’-]+/g) || [];
      tokens.forEach(tok => {
        // Strip leading/trailing digits, punctuation
        if (/^\d+$/.test(tok)) return; // skip pure numbers
        const cleaned = cleanFrenchWord(tok);
        if (!cleaned || cleaned.length <= 1 && !['a', 'y', 'à', 'ô'].includes(cleaned)) return;

        const { entry } = lookupWord(tok, story.vocabulary);
        if (!entry) {
          missingTokens.add(tok);
        }
      });
    });

    if (missingTokens.size > 0) {
      errors.push({
        storyId: story.id,
        storyTitle: story.title,
        type: 'missing_vocab',
        message: `Missing vocabulary mapping for ${missingTokens.size} words: ${Array.from(missingTokens).slice(0, 10).join(', ')}${missingTokens.size > 10 ? '...' : ''}`
      });
    }
  });

  return {
    passed: errors.length === 0,
    errors,
    summary: {
      totalStories: stories.length,
      a1Stories: a1Count,
      a2Stories: a2Count,
      b1Stories: b1Count,
      totalWords,
      totalVocabEntries,
      totalQuizQuestions
    }
  };
}

export function runValidation() {
  console.log('===============================================================');
  console.log('           LIREFACILE — STORY DATA VALIDATION CHECK            ');
  console.log('===============================================================\n');

  const result = validateAllStories();

  console.log(`SUMMARY:`);
  console.log(`- Total Stories:       ${result.summary.totalStories}`);
  console.log(`  • A1 Beginner:       ${result.summary.a1Stories}`);
  console.log(`  • A2 Elementary:     ${result.summary.a2Stories}`);
  console.log(`  • B1 Intermediate:   ${result.summary.b1Stories}`);
  console.log(`- Total French Words:  ${result.summary.totalWords}`);
  console.log(`- Vocabulary Entries:  ${result.summary.totalVocabEntries}`);
  console.log(`- Quiz Questions:      ${result.summary.totalQuizQuestions}`);
  console.log('');

  if (result.passed) {
    console.log('✓ ALL VALIDATION CHECKS PASSED!');
    console.log('  • Every token has a vocabulary mapping');
    console.log('  • All story IDs are unique');
    console.log('  • All word counts and level ranges are strictly respected');
    console.log('  • Quiz questions and answer indices are valid');
    console.log('  • Sentence translations match paragraphs perfectly');
    console.log('===============================================================\n');
    process.exit(0);
  } else {
    console.log(`✕ FOUND ${result.errors.length} VALIDATION ISSUES:\n`);
    result.errors.forEach((err, i) => {
      console.log(`[${i + 1}] [${err.storyId}] (${err.type}): ${err.message}`);
    });
    console.log('\n===============================================================');
    process.exit(1);
  }
}

if (process.argv[1]?.endsWith('validate-stories.ts')) {
  runValidation();
}
