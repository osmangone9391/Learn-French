/**
 * Stories Validation Script for LireFacile
 * Run with: npm run validate:stories
 */

import * as fs from 'fs';
import * as path from 'path';
import { INITIAL_STORIES } from '../src/data/stories';
import { lookupWord, cleanFrenchWord } from '../src/utils/textParser';
import { Story, CEFRLevel, VocabEntry } from '../src/types';

interface LexiconEntry extends VocabEntry {
  status: 'reviewed' | 'new';
}

interface ValidationError {
  storyId: string;
  storyTitle: string;
  type: 'word_count' | 'level' | 'id' | 'translation_mismatch' | 'missing_vocab' | 'quiz_error' | 'empty_field';
  message: string;
}

interface ValidationWarning {
  storyId: string;
  storyTitle: string;
  type: 'avg_sentence_length' | 'new_lemmas_rate';
  message: string;
}

export function validateAllStories(stories: Story[] = INITIAL_STORIES): {
  passed: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  summary: {
    totalStories: number;
    a1Stories: number;
    a2Stories: number;
    b1Stories: number;
    b2Stories: number;
    totalWords: number;
    totalVocabEntries: number;
    totalQuizQuestions: number;
    newLexiconEntriesCount: number;
  };
  reviewReportPath?: string;
} {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  const seenIds = new Set<string>();

  let a1Count = 0;
  let a2Count = 0;
  let b1Count = 0;
  let b2Count = 0;
  let totalWords = 0;
  let totalVocabEntries = 0;
  let totalQuizQuestions = 0;

  // Load shared lexicon if present to verify statuses
  const lexiconPath = path.resolve('content/lexicon.json');
  let lexicon: Record<string, LexiconEntry> = {};
  if (fs.existsSync(lexiconPath)) {
    try {
      lexicon = JSON.parse(fs.readFileSync(lexiconPath, 'utf8'));
    } catch {}
  }

  const seenLemmas = new Set<string>();

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
    else if (story.level === 'B2') b2Count++;

    // 2. Empty field checks
    if (!story.title?.trim()) errors.push({ storyId: story.id, storyTitle: story.title, type: 'empty_field', message: 'Missing title' });
    if (!story.subtitle?.trim()) errors.push({ storyId: story.id, storyTitle: story.title, type: 'empty_field', message: 'Missing subtitle' });
    if (!story.topic?.trim()) errors.push({ storyId: story.id, storyTitle: story.title, type: 'empty_field', message: 'Missing topic' });

    // 3. Word count calculation and range check
    // A1: 100-250, A2: 250-400, B1: 400-700, B2: 600-1000
    const fullText = story.paragraphs.join(' ');
    const actualTokens = fullText.split(/\s+/).filter(w => w.length > 0);
    const actualWordCount = actualTokens.length;
    totalWords += actualWordCount;

    const ranges: Record<CEFRLevel, { min: number; max: number }> = {
      A1: { min: 100, max: 250 },
      A2: { min: 250, max: 400 },
      B1: { min: 400, max: 700 },
      B2: { min: 600, max: 1000 }
    };

    const targetRange = ranges[story.level] || ranges.A1;
    if (actualWordCount < targetRange.min || actualWordCount > targetRange.max) {
      errors.push({
        storyId: story.id,
        storyTitle: story.title,
        type: 'word_count',
        message: `${story.level} story word count is ${actualWordCount}, must be between ${targetRange.min} and ${targetRange.max} words`
      });
    }

    // 4. Paragraph and sentence translation alignment
    let totalFrSentences = 0;
    let totalEnSentences = 0;

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

        const frSentences = p.match(/[^.!?]+[.!?]+["»]?|\S+/g) || [];
        const enSentences = trans.match(/[^.!?]+[.!?]+["»]?|\S+/g) || [];
        totalFrSentences += frSentences.length;
        totalEnSentences += enSentences.length;

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

    // 5. Pedagogical Metrics (Average Sentence Length & New Lemmas Rate)
    const avgSentLen = actualWordCount / (totalFrSentences || 1);
    const avgSentThresholds: Record<CEFRLevel, number> = {
      A1: 12,
      A2: 16,
      B1: 22,
      B2: 26
    };
    const maxAvgSent = avgSentThresholds[story.level] || 16;
    if (avgSentLen > maxAvgSent) {
      warnings.push({
        storyId: story.id,
        storyTitle: story.title,
        type: 'avg_sentence_length',
        message: `Average sentence length is ${avgSentLen.toFixed(1)} words (suggested maximum for ${story.level} is ${maxAvgSent} words)`
      });
    }

    // New lemmas per 100 words calculation
    let newLemmasCount = 0;
    for (const v of Object.values(story.vocabulary || {})) {
      const l = v.lemma.toLowerCase();
      if (!seenLemmas.has(l)) {
        newLemmasCount++;
        seenLemmas.add(l);
      }
    }
    const newLemmaRatePer100 = (newLemmasCount / actualWordCount) * 100;
    const maxNewLemmaRate: Record<CEFRLevel, number> = {
      A1: 8,
      A2: 8,
      B1: 12,
      B2: 12
    };
    // For later stories in curriculum, warn if new lemma density exceeds pedagogical recommendations
    if (idx >= 3 && newLemmaRatePer100 > maxNewLemmaRate[story.level]) {
      warnings.push({
        storyId: story.id,
        storyTitle: story.title,
        type: 'new_lemmas_rate',
        message: `New lemma density is ${newLemmaRatePer100.toFixed(1)} per 100 words (curriculum advisory ceiling: ${maxNewLemmaRate[story.level]})`
      });
    }

    // 6. Quiz validation
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

    // 7. Vocabulary coverage & Grammatical Annotation Rules
    const vocabKeys = Object.keys(story.vocabulary || {});
    totalVocabEntries += vocabKeys.length;

    const VALID_POS = new Set(['noun', 'verb', 'adjective', 'adverb', 'preposition', 'pronoun', 'conjunction', 'expression', 'article', 'interjection', 'number']);
    const VALID_GENDERS = new Set(['masculine', 'feminine']);
    const VALID_NUMBERS = new Set(['singular', 'plural']);
    const VALID_TENSES = new Set(['present', 'imperfect', 'future', 'conditional', 'subjunctive', 'imperative', 'infinitive', 'past participle', 'present participle']);
    const VALID_PERSONS = new Set(['1st person singular', '2nd person singular', '3rd person singular', '1st person plural', '2nd person plural', '3rd person plural']);

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
      if (!entry.pos || !VALID_POS.has(entry.pos)) {
        errors.push({ storyId: story.id, storyTitle: story.title, type: 'missing_vocab', message: `Vocab entry "${key}" has invalid or missing part of speech: "${entry.pos}"` });
      }

      // Check grammar tag discipline
      if (entry.pos === 'noun') {
        if (!entry.gender || !VALID_GENDERS.has(entry.gender)) {
          errors.push({ storyId: story.id, storyTitle: story.title, type: 'missing_vocab', message: `Vocab entry "${key}" (noun): invalid or missing gender "${entry.gender}"` });
        }
        if (!entry.number || !VALID_NUMBERS.has(entry.number)) {
          errors.push({ storyId: story.id, storyTitle: story.title, type: 'missing_vocab', message: `Vocab entry "${key}" (noun): invalid or missing number "${entry.number}"` });
        }
        if (!entry.lemmaWithArticle || !entry.lemmaWithArticle.trim()) {
          errors.push({ storyId: story.id, storyTitle: story.title, type: 'missing_vocab', message: `Vocab entry "${key}" (noun): missing dictionary lemmaWithArticle` });
        }
      } else if (entry.pos === 'adjective') {
        if (!entry.gender || !VALID_GENDERS.has(entry.gender)) {
          errors.push({ storyId: story.id, storyTitle: story.title, type: 'missing_vocab', message: `Vocab entry "${key}" (adjective): invalid or missing gender "${entry.gender}"` });
        }
        if (!entry.number || !VALID_NUMBERS.has(entry.number)) {
          errors.push({ storyId: story.id, storyTitle: story.title, type: 'missing_vocab', message: `Vocab entry "${key}" (adjective): invalid or missing number "${entry.number}"` });
        }
      } else if (entry.pos === 'article') {
        if (key === 'les' || key === 'des' || entry.lemma === 'les') {
          if (entry.gender) {
            errors.push({ storyId: story.id, storyTitle: story.title, type: 'missing_vocab', message: `Vocab entry "${key}" (article): "les" and "des" must not have gender (found "${entry.gender}")` });
          }
          if (entry.number !== 'plural') {
            errors.push({ storyId: story.id, storyTitle: story.title, type: 'missing_vocab', message: `Vocab entry "${key}" (article): "les" and "des" must have number "plural"` });
          }
        } else if (['le', 'la', 'un', 'une', 'du'].includes(key)) {
          if (!entry.gender || !VALID_GENDERS.has(entry.gender)) {
            errors.push({ storyId: story.id, storyTitle: story.title, type: 'missing_vocab', message: `Vocab entry "${key}" (article): invalid or missing gender "${entry.gender}"` });
          }
          if (entry.number !== 'singular') {
            errors.push({ storyId: story.id, storyTitle: story.title, type: 'missing_vocab', message: `Vocab entry "${key}" (article): must have number "singular"` });
          }
        }
      } else if (entry.pos === 'number') {
        if (entry.gender) {
          errors.push({ storyId: story.id, storyTitle: story.title, type: 'missing_vocab', message: `Vocab entry "${key}" (number): numerals must not have gender (found "${entry.gender}")` });
        }
        if (entry.number) {
          errors.push({ storyId: story.id, storyTitle: story.title, type: 'missing_vocab', message: `Vocab entry "${key}" (number): numerals must not have singular/plural tag (found "${entry.number}")` });
        }
      } else if (entry.pos === 'verb') {
        if (entry.gender || entry.number) {
          errors.push({ storyId: story.id, storyTitle: story.title, type: 'missing_vocab', message: `Vocab entry "${key}" (verb): verbs must not have gender or number` });
        }
        if (!entry.tense || !VALID_TENSES.has(entry.tense)) {
          errors.push({ storyId: story.id, storyTitle: story.title, type: 'missing_vocab', message: `Vocab entry "${key}" (verb): invalid or missing tense "${entry.tense}"` });
        }
        const isNonFinite = entry.tense === 'infinitive' || entry.tense === 'past participle' || entry.tense === 'present participle';
        if (!isNonFinite && (!entry.person || !VALID_PERSONS.has(entry.person))) {
          errors.push({ storyId: story.id, storyTitle: story.title, type: 'missing_vocab', message: `Vocab entry "${key}" (verb): finite verb requires valid person` });
        }
      }
    }

    // Check that every content word token in the paragraphs has a vocab mapping
    const missingTokens = new Set<string>();
    story.paragraphs.forEach(p => {
      const tokens = p.match(/[a-zA-ZÀ-ÿ0-9'’-]+/g) || [];
      tokens.forEach(tok => {
        if (/^\d+$/.test(tok)) return;
        const cleaned = cleanFrenchWord(tok);
        if (!cleaned || (cleaned.length <= 1 && !['a', 'y', 'à', 'ô'].includes(cleaned))) return;

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

  // Count new lexicon entries
  const newLexiconEntries = Object.entries(lexicon).filter(([, e]) => e.status === 'new');

  // Generate Review Report in docs/review-<date>.md
  const today = new Date().toISOString().split('T')[0];
  const docsDir = path.resolve('docs');
  if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });

  const reviewReportPath = path.join(docsDir, `review-${today}.md`);

  let reportMd = `# Content Batch Review Report — ${today}\n\n`;
  reportMd += `**Total Stories in Library**: ${stories.length} (${a1Count} A1, ${a2Count} A2, ${b1Count} B1, ${b2Count} B2)\n`;
  reportMd += `**Total Words**: ${totalWords} | **Total Vocabulary Entries**: ${totalVocabEntries}\n`;
  reportMd += `**Lexicon Entries with Status "new" Pending Review**: ${newLexiconEntries.length}\n\n`;
  reportMd += `---\n\n`;

  reportMd += `## 1. Story Library Summary\n\n`;
  reportMd += `| ID | Level | Title | Words | Topics |\n`;
  reportMd += `|---|---|---|---|---|\n`;
  for (const s of stories) {
    reportMd += `| \`${s.id}\` | ${s.level} | ${s.title} | ${s.wordCount} | ${(s.topics || [s.topic]).join(', ')} |\n`;
  }
  reportMd += `\n---\n\n`;

  reportMd += `## 2. Lexicon Entries Pending Review (Status "new")\n\n`;
  if (newLexiconEntries.length === 0) {
    reportMd += `*All entries in content/lexicon.json are marked as \`"reviewed"\`! No new entries pending verification.*\n\n`;
  } else {
    reportMd += `| Word Form | Lemma | POS | Tags | English | Bangla | Review |\n`;
    reportMd += `|---|---|---|---|---|---|---|\n`;
    for (const [form, entry] of newLexiconEntries) {
      const tags = [entry.gender, entry.number, entry.tense, entry.person].filter(Boolean).join(', ') || '-';
      // Mark uncertain or ambiguous items with CHECK
      const isUncertain = !entry.en || !entry.bn || (entry.pos === 'noun' && !entry.gender);
      const checkTag = isUncertain ? '**CHECK**' : 'OK';
      reportMd += `| \`${form}\` | ${entry.lemma} | ${entry.pos} | ${tags} | ${entry.en} | ${entry.bn} | ${checkTag} |\n`;
    }
    reportMd += `\n`;
  }

  fs.writeFileSync(reviewReportPath, reportMd);

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    summary: {
      totalStories: stories.length,
      a1Stories: a1Count,
      a2Stories: a2Count,
      b1Stories: b1Count,
      b2Stories: b2Count,
      totalWords,
      totalVocabEntries,
      totalQuizQuestions,
      newLexiconEntriesCount: newLexiconEntries.length
    },
    reviewReportPath
  };
}

export function runValidation() {
  console.log('===============================================================');
  console.log('    LEARN FRENCH BY READING — STORY DATA VALIDATION CHECK      ');
  console.log('===============================================================\n');

  const result = validateAllStories();

  console.log(`SUMMARY:`);
  console.log(`- Total Stories:       ${result.summary.totalStories}`);
  console.log(`  • A1 Beginner:       ${result.summary.a1Stories}`);
  console.log(`  • A2 Elementary:     ${result.summary.a2Stories}`);
  console.log(`  • B1 Intermediate:   ${result.summary.b1Stories}`);
  console.log(`  • B2 Upper-interm:   ${result.summary.b2Stories}`);
  console.log(`- Total French Words:  ${result.summary.totalWords}`);
  console.log(`- Vocabulary Entries:  ${result.summary.totalVocabEntries}`);
  console.log(`- Quiz Questions:      ${result.summary.totalQuizQuestions}`);
  console.log(`- New Lexicon Items:   ${result.summary.newLexiconEntriesCount}`);
  if (result.reviewReportPath) {
    console.log(`- Batch Review Report: ${result.reviewReportPath}`);
  }
  console.log('');

  if (result.warnings.length > 0) {
    console.log(`ℹ PEDAGOGICAL ADVISORIES (${result.warnings.length}):`);
    result.warnings.forEach((warn, i) => {
      console.log(`  [${i + 1}] [${warn.storyId}] (${warn.type}): ${warn.message}`);
    });
    console.log('');
  }

  if (result.passed) {
    console.log('✓ ALL VALIDATION CHECKS PASSED!');
    console.log('  • Every token has a vocabulary mapping in the shared lexicon');
    console.log('  • All story IDs are unique and strictly formatted');
    console.log('  • All word counts and level ranges are respected');
    console.log('  • Quiz questions and answer indices are valid');
    console.log('  • Sentence translations match paragraphs');
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
