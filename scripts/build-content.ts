import * as fs from 'fs';
import * as path from 'path';
import { cleanFrenchWord } from '../src/utils/textParser';
import { CEFRLevel, Story, VocabEntry, QuizQuestion } from '../src/types';

interface LexiconEntry extends VocabEntry {
  status: 'reviewed' | 'new';
}

interface Frontmatter {
  id: string;
  title: string;
  subtitle: string;
  level: CEFRLevel;
  topics?: string[];
  topic?: string;
  series?: string;
  overrides?: Record<string, Partial<VocabEntry>>;
}

export const CANONICAL_STORY_ORDER = [
  'a-la-boulangerie',
  'trajet-en-metro',
  'rendez-vous-prefecture',
  'au-supermarche',
  'pause-cafe-informatique',
  'chez-le-medecin',
  'au-restaurant',
  'a-la-pharmacie',
  'acheter-carte-sim',
  'bonjour-voisin',
  'chercher-appartement',
  'ouvrir-compte-bancaire',
  'entretien-embauche-informatique',
  'rendez-vous-france-travail',
  'sinscrire-formation'
];

/**
 * Parses markdown story files with YAML frontmatter into structured data.
 */
export function parseStoryMarkdown(fileContent: string): {
  meta: Frontmatter;
  paragraphs: string[];
  translations: string[];
  quiz: QuizQuestion[];
} {
  const parts = fileContent.split(/^---$/m);
  if (parts.length < 3) {
    throw new Error('Invalid story markdown format: missing frontmatter delimiters (---)');
  }

  const rawYaml = parts[1].trim();
  const body = parts.slice(2).join('---').trim();

  const meta: Frontmatter = {
    id: '',
    title: '',
    subtitle: '',
    level: 'A1',
    topics: []
  };

  const yamlLines = rawYaml.split('\n');
  let currentKey = '';
  let inOverrides = false;
  let currentOverrideWord = '';

  for (let i = 0; i < yamlLines.length; i++) {
    const line = yamlLines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    if (/^overrides:\s*$/.test(line)) {
      meta.overrides = {};
      inOverrides = true;
      currentKey = 'overrides';
      continue;
    }

    if (inOverrides) {
      const indent = line.search(/\S|$/);
      if (indent === 2 && trimmed.endsWith(':')) {
        currentOverrideWord = trimmed.replace(/:$/, '').replace(/^["']|["']$/g, '');
        if (meta.overrides) meta.overrides[currentOverrideWord] = {};
        continue;
      } else if (indent >= 4 && currentOverrideWord && meta.overrides) {
        const colonIdx = trimmed.indexOf(':');
        if (colonIdx > 0) {
          const k = trimmed.slice(0, colonIdx).trim().replace(/^["']|["']$/g, '');
          let v = trimmed.slice(colonIdx + 1).trim();
          if (v.startsWith('"') && v.endsWith('"')) {
            try { v = JSON.parse(v); } catch {}
          } else if (v.startsWith("'") && v.endsWith("'")) {
            v = v.slice(1, -1);
          }
          (meta.overrides[currentOverrideWord] as any)[k] = v;
        }
        continue;
      } else if (indent === 0) {
        inOverrides = false;
      }
    }

    if (!inOverrides) {
      if (trimmed.startsWith('- ') && currentKey === 'topics') {
        const val = trimmed.slice(2).trim().replace(/^["']|["']$/g, '');
        meta.topics!.push(val);
      } else {
        const colonIdx = line.indexOf(':');
        if (colonIdx > 0) {
          const k = line.slice(0, colonIdx).trim();
          let v = line.slice(colonIdx + 1).trim();
          if (v.startsWith('"') && v.endsWith('"')) {
            try { v = JSON.parse(v); } catch {}
          } else if (v.startsWith("'") && v.endsWith("'")) {
            v = v.slice(1, -1);
          }
          currentKey = k;
          if (k === 'id') meta.id = v;
          else if (k === 'title') meta.title = v;
          else if (k === 'subtitle') meta.subtitle = v;
          else if (k === 'level') meta.level = v as CEFRLevel;
          else if (k === 'series') meta.series = v;
          else if (k === 'topic') meta.topic = v;
        }
      }
    }
  }

  const sections = body.split(/^##\s+/m);
  let paragraphs: string[] = [];
  let translations: string[] = [];
  let quiz: QuizQuestion[] = [];

  for (const sec of sections) {
    const trimmedSec = sec.trim();
    if (!trimmedSec) continue;

    const firstLineEnd = trimmedSec.indexOf('\n');
    const header = (firstLineEnd > 0 ? trimmedSec.slice(0, firstLineEnd) : trimmedSec).trim().toLowerCase();
    const secContent = firstLineEnd > 0 ? trimmedSec.slice(firstLineEnd).trim() : '';

    if (header === 'french') {
      paragraphs = secContent
        .split(/\n\s*\n/)
        .map(p => p.trim())
        .filter(p => p.length > 0);
    } else if (header === 'translation') {
      translations = secContent
        .split(/\n\s*\n/)
        .map(p => p.trim())
        .filter(p => p.length > 0);
    } else if (header === 'quiz') {
      const qBlocks = secContent.split(/^###\s+/m).filter(b => b.trim().length > 0);
      for (const qb of qBlocks) {
        const qLines = qb.trim().split('\n');
        const qTitleMatch = qLines[0].replace(/^Q\d+:\s*/i, '').trim();
        const options: string[] = [];
        let answerIndex = -1;
        let explanation = '';
        let explanationBn = '';

        for (let lIdx = 1; lIdx < qLines.length; lIdx++) {
          const l = qLines[lIdx].trim();
          if (l.startsWith('- [ ] ') || l.startsWith('- [x] ') || l.startsWith('- [X] ')) {
            const isCorrect = l.startsWith('- [x] ') || l.startsWith('- [X] ');
            const optText = l.slice(6).trim();
            if (isCorrect) answerIndex = options.length;
            options.push(optText);
          } else if (l.startsWith('**Explanation**:')) {
            explanation = l.replace(/^\*\*Explanation\*\*:\s*/, '').trim();
          } else if (l.startsWith('**Explanation (Bangla)**:')) {
            explanationBn = l.replace(/^\*\*Explanation \(Bangla\)\*\*:\s*/, '').trim();
          }
        }

        quiz.push({
          question: qTitleMatch,
          options,
          answer: answerIndex,
          explanation,
          explanationBn
        });
      }
    }
  }

  return { meta, paragraphs, translations, quiz };
}

/**
 * Tokenizes French text exactly matching reader tokenization in parseParagraph (src/utils/textParser.ts).
 */
export function extractStoryWordForms(paragraphs: string[]): { forms: Set<string>; tokenToSentence: Map<string, string> } {
  const forms = new Set<string>();
  const tokenToSentence = new Map<string, string>();

  // Token regex exactly matching src/utils/textParser.ts
  const tokenRegex = /([a-zA-ZÀ-ÖØ-öø-ÿ0-9]+['’]|[a-zA-ZÀ-ÖØ-öø-ÿ0-9]+|[^a-zA-ZÀ-ÖØ-öø-ÿ0-9\s]+|\s+)/g;

  for (const p of paragraphs) {
    const rawSentences = p.match(/[^.!?]+[.!?]+["»]?|\S+/g) || [p];
    for (const sent of rawSentences) {
      const trimmed = sent.trim();
      const tokens = trimmed.match(tokenRegex) || [];
      for (const rawToken of tokens) {
        if (/[a-zA-ZÀ-ÖØ-öø-ÿ0-9]/.test(rawToken)) {
          const clean = cleanFrenchWord(rawToken).toLowerCase();
          if (clean) {
            forms.add(clean);
            if (!tokenToSentence.has(clean)) tokenToSentence.set(clean, trimmed);
          }
        }
      }

      // Also support compound words and hyphens (e.g. petit-déjeuner, rendez-vous)
      const baseTokens = trimmed.match(/[a-zA-ZÀ-ÖØ-öø-ÿ0-9'’-]+/g) || [];
      for (const tok of baseTokens) {
        if (tok.includes('-')) {
          const clean = cleanFrenchWord(tok).toLowerCase();
          if (clean) {
            forms.add(clean);
            if (!tokenToSentence.has(clean)) tokenToSentence.set(clean, trimmed);
          }
        }
        // Handle special compounds: "aujourd'hui", "jusqu'au", "lorsqu'un"
        const lowerNoPunct = tok.toLowerCase().replace(/^[«"'(—\s]+/, '').replace(/[»"'),.;:!?—\s]+$/, '');
        if (/^aujourd['’]hui$/i.test(lowerNoPunct)) {
          forms.add("aujourd'hui");
          if (!tokenToSentence.has("aujourd'hui")) tokenToSentence.set("aujourd'hui", trimmed);
        } else if (/^jusqu['’]au$/i.test(lowerNoPunct)) {
          forms.add("jusqu'au");
          if (!tokenToSentence.has("jusqu'au")) tokenToSentence.set("jusqu'au", trimmed);
        } else if (/^lorsqu['’]un$/i.test(lowerNoPunct)) {
          forms.add("lorsqu'un");
          if (!tokenToSentence.has("lorsqu'un")) tokenToSentence.set("lorsqu'un", trimmed);
        }
        // Handle alphanumeric splits (e.g. 4G -> 4, G)
        const alphaParts = tok.match(/[a-zA-ZÀ-ÖØ-öø-ÿ]+|[0-9]+/g);
        if (alphaParts && alphaParts.length > 1) {
          for (const part of alphaParts) {
            const cp = cleanFrenchWord(part).toLowerCase();
            if (cp) {
              forms.add(cp);
              if (!tokenToSentence.has(cp)) tokenToSentence.set(cp, trimmed);
            }
          }
        }
      }
    }
  }

  return { forms, tokenToSentence };
}

/**
 * Builds all stories from markdown and lexicon, validating completeness.
 */
export function buildContent(): { success: boolean; missingWordsCount: number } {
  const contentDir = path.resolve('content');
  const storiesDir = path.join(contentDir, 'stories');
  const lexiconFile = path.join(contentDir, 'lexicon.json');
  const missingWordsFile = path.join(contentDir, 'missing-words.csv');

  if (!fs.existsSync(lexiconFile)) {
    throw new Error('content/lexicon.json not found!');
  }

  const lexicon: Record<string, LexiconEntry> = JSON.parse(fs.readFileSync(lexiconFile, 'utf8'));
  let storyFiles = fs.readdirSync(storiesDir).filter(f => f.endsWith('.md'));

  // Sort files according to canonical story order first, then alphabetically
  storyFiles.sort((a, b) => {
    const idA = a.replace(/\.md$/, '');
    const idB = b.replace(/\.md$/, '');
    const idxA = CANONICAL_STORY_ORDER.indexOf(idA);
    const idxB = CANONICAL_STORY_ORDER.indexOf(idB);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });

  const missingWords: Map<string, { form: string; sentence: string }> = new Map();
  const parsedStories: Story[] = [];

  for (const sFile of storyFiles) {
    const fullPath = path.join(storiesDir, sFile);
    const content = fs.readFileSync(fullPath, 'utf8');
    const { meta, paragraphs, translations, quiz } = parseStoryMarkdown(content);

    const storyVocabulary: Record<string, VocabEntry> = {};
    const { forms, tokenToSentence } = extractStoryWordForms(paragraphs);

    for (const form of forms) {
      if (/^\d+$/.test(form)) continue; // skip pure digits

      let def: VocabEntry | undefined;
      if (meta.overrides && meta.overrides[form]) {
        def = meta.overrides[form] as VocabEntry;
      } else if (lexicon[form]) {
        def = lexicon[form];
      } else if (lexicon[form.replace(/[-_']/g, '')]) {
        def = lexicon[form.replace(/[-_']/g, '')];
      }

      if (!def) {
        if (!missingWords.has(form)) {
          missingWords.set(form, {
            form,
            sentence: tokenToSentence.get(form) || ''
          });
        }
      } else {
        const cleanedEntry = { ...def };
        delete (cleanedEntry as any).status;
        storyVocabulary[form] = cleanedEntry;
      }
    }

    // Include explicitly declared overrides
    if (meta.overrides) {
      for (const [ovKey, ovDef] of Object.entries(meta.overrides)) {
        const cleanedEntry = { ...ovDef } as VocabEntry;
        delete (cleanedEntry as any).status;
        storyVocabulary[ovKey] = cleanedEntry;
      }
    }

    const fullText = paragraphs.join(' ');
    const actualTokens = fullText.split(/\s+/).filter(w => w.length > 0);
    const wordCount = actualTokens.length;
    const estimatedMinutes = Math.max(1, Math.ceil(wordCount / 100));

    const finalStory: Story = {
      id: meta.id,
      title: meta.title,
      subtitle: meta.subtitle,
      level: meta.level,
      topic: meta.topic || (meta.topics && meta.topics[0]) || 'daily life',
      topics: meta.topics && meta.topics.length > 0 ? meta.topics : [meta.topic || 'daily life'],
      series: meta.series,
      wordCount,
      estimatedMinutes,
      paragraphs,
      paragraphTranslations: translations,
      vocabulary: storyVocabulary,
      quiz
    };

    parsedStories.push(finalStory);
  }

  // If missing words found, write content/missing-words.csv and halt
  if (missingWords.size > 0) {
    let csv = 'form,sentence,lemma,lemmaWithArticle,en,bn,pos,gender,number,tense,person,ttsText\n';
    for (const item of missingWords.values()) {
      const escapedForm = `"${item.form.replace(/"/g, '""')}"`;
      const escapedSent = `"${item.sentence.replace(/"/g, '""')}"`;
      csv += `${escapedForm},${escapedSent},,,,,,,,,,\n`;
    }
    fs.writeFileSync(missingWordsFile, csv);
    console.error(`\n[content:build ERROR] ${missingWords.size} word forms are not in content/lexicon.json!`);
    console.error(`Written missing entries to: content/missing-words.csv`);
    console.error(`Fill in the missing fields and run: npm run content:import\n`);
    return { success: false, missingWordsCount: missingWords.size };
  }

  // Clean missing-words.csv if everything is resolved
  if (fs.existsSync(missingWordsFile)) {
    fs.unlinkSync(missingWordsFile);
  }

  // Generate src/data/stories.ts with header comment
  const banner = `/**
 * DO NOT EDIT THIS FILE BY HAND!
 * -------------------------------------------------------------
 * This file is automatically generated by the LireFacile content pipeline
 * from markdown story files in content/stories/ and content/lexicon.json.
 *
 * To add or edit stories, edit the files in content/ and run:
 *   npm run content:build
 * -------------------------------------------------------------
 */

import { Story } from '../types';

export const INITIAL_STORIES: Story[] = ${JSON.stringify(parsedStories, null, 2)};
`;

  fs.writeFileSync(path.resolve('src/data/stories.ts'), banner);
  console.log(`[content:build SUCCESS] Successfully compiled ${parsedStories.length} stories into src/data/stories.ts`);
  return { success: true, missingWordsCount: 0 };
}

if (process.argv[1]?.endsWith('build-content.ts')) {
  const result = buildContent();
  if (!result.success) {
    process.exit(1);
  }
}
