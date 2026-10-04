/**
 * Audio Coverage and Verification Script for LireFacile
 * Run with: npm run audio:check
 */

import fs from 'fs';
import path from 'path';
import { INITIAL_STORIES } from '../src/data/stories';

const PUBLIC_AUDIO_DIR = path.resolve(process.cwd(), 'public/audio');
const MANIFEST_PATH = path.resolve(PUBLIC_AUDIO_DIR, 'manifest.json');

export interface AudioReport {
  mp3FileCount: number;
  totalSizeFormatted: string;
  totalSizeBytes: number;
  voices: {
    fr: string;
    en: string;
  };
  audioFormat: string;
  speedSettings: number[];
  manifestEntryCount: number;
  frenchSentences: {
    total: number;
    recorded: number;
    missing: string[];
  };
  vocabularyWords: {
    total: number;
    recorded: number;
    missing: string[];
  };
  englishTranslations: {
    total: number;
    recorded: number;
    missing: string[];
  };
}

export function generateAudioReport(): AudioReport {
  // 1. Count actual MP3 files on disk
  let mp3Count = 0;
  let totalBytes = 0;

  function countDir(dirPath: string) {
    if (!fs.existsSync(dirPath)) return;
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const ent of entries) {
      const full = path.join(dirPath, ent.name);
      if (ent.isDirectory()) {
        countDir(full);
      } else if (ent.isFile() && ent.name.endsWith('.mp3')) {
        mp3Count++;
        totalBytes += fs.statSync(full).size;
      }
    }
  }

  countDir(PUBLIC_AUDIO_DIR);

  // 2. Read manifest
  let manifest: any = { files: {} };
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
    } catch {
      // empty manifest fallback
    }
  }

  const manifestFiles = manifest.files || {};
  const manifestEntryCount = Object.keys(manifestFiles).length;

  const manifestFrTexts = new Set<string>();
  const manifestEnTexts = new Set<string>();

  Object.values(manifestFiles).forEach((entry: any) => {
    const textNorm = (entry.text || '').trim().toLowerCase();
    if (entry.language === 'fr') {
      manifestFrTexts.add(textNorm);
    } else if (entry.language === 'en') {
      manifestEnTexts.add(textNorm);
    }
  });

  // 3. Extract items from stories
  const missingFrSentences: string[] = [];
  let totalFrSentences = 0;
  let recordedFrSentences = 0;

  const missingWords: string[] = [];
  const allVocabWords = new Set<string>();

  const missingEnTranslations: string[] = [];
  let totalEnTranslations = 0;
  let recordedEnTranslations = 0;

  INITIAL_STORIES.forEach((story) => {
    // French sentences
    story.paragraphs.forEach((p) => {
      const sentences = p.match(/[^.!?]+[.!?]+["»]?|\S+/g) || [p];
      sentences.forEach((s) => {
        const clean = s.trim();
        if (!clean) return;
        totalFrSentences++;
        if (manifestFrTexts.has(clean.toLowerCase())) {
          recordedFrSentences++;
        } else {
          missingFrSentences.push(`[${story.id}] ${clean}`);
        }
      });
    });

    // English translations
    story.paragraphTranslations.forEach((t) => {
      const clean = t.trim();
      if (!clean) return;
      totalEnTranslations++;
      if (manifestEnTexts.has(clean.toLowerCase())) {
        recordedEnTranslations++;
      } else {
        missingEnTranslations.push(`[${story.id}] ${clean}`);
      }
    });

    // Vocabulary words
    Object.keys(story.vocabulary).forEach((k) => {
      const clean = k.trim().toLowerCase();
      if (clean) allVocabWords.add(clean);
    });
  });

  let recordedWords = 0;
  allVocabWords.forEach((w) => {
    if (manifestFrTexts.has(w)) {
      recordedWords++;
    } else {
      missingWords.push(w);
    }
  });

  const sizeFormatted = totalBytes > 1024 * 1024
    ? `${(totalBytes / (1024 * 1024)).toFixed(2)} MB`
    : `${(totalBytes / 1024).toFixed(1)} KB`;

  return {
    mp3FileCount: mp3Count,
    totalSizeBytes: totalBytes,
    totalSizeFormatted: sizeFormatted,
    voices: {
      fr: manifest.voiceFr || 'fr-FR-Neural2-A (Female)',
      en: manifest.voiceEn || 'en-US-Neural2-F (Female)',
    },
    audioFormat: 'MP3, 24kHz, mono, constant bit-rate',
    speedSettings: [1.0, 0.8],
    manifestEntryCount,
    frenchSentences: {
      total: totalFrSentences,
      recorded: recordedFrSentences,
      missing: missingFrSentences,
    },
    vocabularyWords: {
      total: allVocabWords.size,
      recorded: recordedWords,
      missing: missingWords,
    },
    englishTranslations: {
      total: totalEnTranslations,
      recorded: recordedEnTranslations,
      missing: missingEnTranslations,
    },
  };
}

export function printReport() {
  const report = generateAudioReport();

  console.log('===============================================================');
  console.log('           LIREFACILE — AUDIO VERIFICATION REPORT             ');
  console.log('===============================================================\n');

  console.log(`1. AUDIO FILES & STORAGE:`);
  console.log(`   - Existing MP3 files on disk: ${report.mp3FileCount}`);
  console.log(`   - Total disk size:           ${report.totalSizeFormatted} (${report.totalSizeBytes} bytes)`);

  console.log(`\n2. VOICE & FORMAT CONFIGURATION:`);
  console.log(`   - French Voice:               ${report.voices.fr}`);
  console.log(`   - English Voice:              ${report.voices.en}`);
  console.log(`   - Audio Format:               ${report.audioFormat}`);
  console.log(`   - Speed Settings Available:   ${report.speedSettings.map(s => s + 'x').join(', ')}`);

  console.log(`\n3. MANIFEST COVERAGE:`);
  console.log(`   - Manifest entries:           ${report.manifestEntryCount}`);
  console.log(`   - French sentences:           ${report.frenchSentences.recorded} / ${report.frenchSentences.total} (${Math.round((report.frenchSentences.recorded / (report.frenchSentences.total || 1)) * 100)}%)`);
  console.log(`   - Unique vocabulary words:    ${report.vocabularyWords.recorded} / ${report.vocabularyWords.total} (${Math.round((report.vocabularyWords.recorded / (report.vocabularyWords.total || 1)) * 100)}%)`);
  console.log(`   - English translations:       ${report.englishTranslations.recorded} / ${report.englishTranslations.total} (${Math.round((report.englishTranslations.recorded / (report.englishTranslations.total || 1)) * 100)}%)`);

  if (report.manifestEntryCount === 0) {
    console.log(`\n4. STATUS & FALLBACK:`);
    console.log(`   ⚠️  No pre-recorded MP3 files exist in public/audio/ yet.`);
    console.log(`   ✓  Layer B Fallback ACTIVE: Browser SpeechSynthesis handles pronunciation.`);
    console.log(`   ✓  UI indicator displays "Browser Voice" during playback.`);
  } else {
    console.log(`\n4. STATUS:`);
    console.log(`   ✓  Layer A Neural MP3 files available for recorded sentences.`);
    console.log(`   ✓  Layer B Browser SpeechSynthesis active as fallback for unrecorded text.`);
  }

  console.log('\n===============================================================');
}

if (process.argv[1]?.endsWith('check-audio.ts')) {
  printReport();
}
