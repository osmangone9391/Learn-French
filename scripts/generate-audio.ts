/**
 * Audio generation script for LireFacile
 * Run with: npx tsx scripts/generate-audio.ts
 *
 * Reads all stories and vocabulary from src/data/stories.ts,
 * generates human neural audio files using TTS API (Google Cloud TTS / Edge TTS),
 * saves them as lightweight mono MP3s in public/audio/{lang}/,
 * and maintains public/audio/manifest.json.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { INITIAL_STORIES } from '../src/data/stories';

// Load environment variables from .env
dotenv.config();

const API_KEY = process.env.GOOGLE_TTS_API_KEY || process.env.TTS_API_KEY || process.env.GEMINI_API_KEY;

const PUBLIC_AUDIO_DIR = path.resolve(process.cwd(), 'public/audio');
const MANIFEST_PATH = path.resolve(PUBLIC_AUDIO_DIR, 'manifest.json');

const VOICES = {
  fr: {
    name: 'fr-FR-Neural2-A', // Natural French female neural voice
    gender: 'FEMALE',
    languageCode: 'fr-FR'
  },
  frMale: {
    name: 'fr-FR-Neural2-B', // Natural French male neural voice
    gender: 'MALE',
    languageCode: 'fr-FR'
  },
  en: {
    name: 'en-US-Neural2-F', // Natural US English female voice
    gender: 'FEMALE',
    languageCode: 'en-US'
  }
};

interface AudioItemToGenerate {
  text: string;
  ttsText: string;
  lang: 'fr' | 'en';
  voice: string;
  speed: number;
  category: 'sentence' | 'word' | 'translation';
  sourceTitle: string;
}

// Compute deterministic hash for audio caching
export function computeAudioHash(text: string, voice: string, speed: number): string {
  const normalized = text.trim().toLowerCase();
  return crypto
    .createHash('md5')
    .update(`${normalized}_${voice}_${speed.toFixed(2)}`)
    .digest('hex')
    .slice(0, 12);
}

// Ensure directories exist
function ensureDirs() {
  if (!fs.existsSync(PUBLIC_AUDIO_DIR)) fs.mkdirSync(PUBLIC_AUDIO_DIR, { recursive: true });
  const frDir = path.resolve(PUBLIC_AUDIO_DIR, 'fr');
  const enDir = path.resolve(PUBLIC_AUDIO_DIR, 'en');
  if (!fs.existsSync(frDir)) fs.mkdirSync(frDir, { recursive: true });
  if (!fs.existsSync(enDir)) fs.mkdirSync(enDir, { recursive: true });
}

// Read or initialize manifest
function loadManifest(): any {
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
    } catch {
      // fallback
    }
  }
  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    provider: 'google-cloud-tts',
    voiceFr: VOICES.fr.name,
    voiceEn: VOICES.en.name,
    files: {}
  };
}

// Gather all items from stories
export function collectAudioItems(): AudioItemToGenerate[] {
  const items: AudioItemToGenerate[] = [];
  const seenHashes = new Set<string>();

  INITIAL_STORIES.forEach((story) => {
    // 1. Sentences in French (Normal 1.0x & Slow 0.8x)
    story.paragraphs.forEach((p, pIdx) => {
      const sentences = p.match(/[^.!?]+[.!?]+["»]?|\S+/g) || [p];
      const ttsOverride = story.paragraphTts?.[pIdx];

      sentences.forEach((sentence) => {
        const cleanSent = sentence.trim();
        if (!cleanSent) return;

        // Normal speed 1.0x
        items.push({
          text: cleanSent,
          ttsText: ttsOverride || cleanSent,
          lang: 'fr',
          voice: VOICES.fr.name,
          speed: 1.0,
          category: 'sentence',
          sourceTitle: story.title
        });

        // Slow speed 0.8x
        items.push({
          text: cleanSent,
          ttsText: ttsOverride || cleanSent,
          lang: 'fr',
          voice: VOICES.fr.name,
          speed: 0.8,
          category: 'sentence',
          sourceTitle: story.title
        });
      });
    });

    // 2. English translations
    story.paragraphTranslations.forEach((translation) => {
      const cleanEn = translation.trim();
      if (!cleanEn) return;
      items.push({
        text: cleanEn,
        ttsText: cleanEn,
        lang: 'en',
        voice: VOICES.en.name,
        speed: 1.0,
        category: 'translation',
        sourceTitle: story.title
      });
    });

    // 3. Vocabulary words and lemmas
    Object.entries(story.vocabulary).forEach(([key, entry]) => {
      const wordText = key.trim();
      const lemmaText = entry.lemma.trim();

      const wordHash = computeAudioHash(wordText, VOICES.fr.name, 1.0);
      if (!seenHashes.has(wordHash)) {
        seenHashes.add(wordHash);
        items.push({
          text: wordText,
          ttsText: entry.ttsText || wordText,
          lang: 'fr',
          voice: VOICES.fr.name,
          speed: 1.0,
          category: 'word',
          sourceTitle: story.title
        });
      }

      if (lemmaText && lemmaText.toLowerCase() !== wordText.toLowerCase()) {
        const lemmaHash = computeAudioHash(lemmaText, VOICES.fr.name, 1.0);
        if (!seenHashes.has(lemmaHash)) {
          seenHashes.add(lemmaHash);
          items.push({
            text: lemmaText,
            ttsText: entry.ttsText || lemmaText,
            lang: 'fr',
            voice: VOICES.fr.name,
            speed: 1.0,
            category: 'word',
            sourceTitle: story.title
          });
        }
      }
    });
  });

  return items;
}

// Call Google Cloud TTS API
async function synthesizeGoogleTTS(
  text: string,
  voiceName: string,
  languageCode: string,
  speed: number,
  apiKey: string
): Promise<Buffer> {
  const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;

  const requestBody = {
    input: { text },
    voice: {
      languageCode,
      name: voiceName
    },
    audioConfig: {
      audioEncoding: 'MP3',
      speakingRate: speed,
      sampleRateHertz: 24000
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google TTS error (${response.status}): ${errorText}`);
  }

  const data = (await response.json()) as { audioContent: string };
  return Buffer.from(data.audioContent, 'base64');
}

// Main execution routine
export async function main() {
  console.log('=====================================================');
  console.log('LireFacile — Human Neural Audio Generation Pipeline');
  console.log('=====================================================\n');

  ensureDirs();
  const manifest = loadManifest();
  const allItems = collectAudioItems();

  // Calculate statistics
  let totalCharacters = 0;
  let frenchChars = 0;
  let englishChars = 0;

  allItems.forEach((i) => {
    totalCharacters += i.ttsText.length;
    if (i.lang === 'fr') frenchChars += i.ttsText.length;
    else englishChars += i.ttsText.length;
  });

  console.log(`Total audio items identified: ${allItems.length}`);
  console.log(`- French sentences (normal + 0.8x): ${allItems.filter(i => i.lang === 'fr' && i.category === 'sentence').length}`);
  console.log(`- French vocabulary words: ${allItems.filter(i => i.lang === 'fr' && i.category === 'word').length}`);
  console.log(`- English paragraph translations: ${allItems.filter(i => i.lang === 'en').length}`);
  console.log(`\nTotal text volume: ${totalCharacters.toLocaleString()} characters`);
  console.log(`- French: ${frenchChars.toLocaleString()} characters`);
  console.log(`- English: ${englishChars.toLocaleString()} characters\n`);

  if (!API_KEY) {
    console.warn('⚠️  NO TTS_API_KEY FOUND IN .env');
    console.log('-----------------------------------------------------');
    console.log('To generate neural MP3 audio files:');
    console.log('1. Add your Google Cloud API key in .env:');
    console.log('   GOOGLE_TTS_API_KEY="AIzaSy..."');
    console.log('2. Re-run this script: npx tsx scripts/generate-audio.ts\n');
    console.log('The app will use Layer B (high-quality browser voice) until audio is generated.');
    return;
  }

  console.log(`Using TTS API Key: ${API_KEY.slice(0, 6)}...${API_KEY.slice(-4)}`);
  console.log('Generating missing audio files...\n');

  let generatedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (let i = 0; i < allItems.length; i++) {
    const item = allItems[i];
    const hash = computeAudioHash(item.text, item.voice, item.speed);
    const relPath = `audio/${item.lang}/${hash}.mp3`;
    const fullPath = path.resolve(PUBLIC_AUDIO_DIR, item.lang, `${hash}.mp3`);

    if (fs.existsSync(fullPath) && manifest.files[hash]) {
      skippedCount++;
      continue;
    }

    try {
      const langCode = item.lang === 'fr' ? 'fr-FR' : 'en-US';
      process.stdout.write(`[${i + 1}/${allItems.length}] Synthesizing (${item.lang}, ${item.speed}x): "${item.text.slice(0, 30)}..." `);

      const buffer = await synthesizeGoogleTTS(
        item.ttsText,
        item.voice,
        langCode,
        item.speed,
        API_KEY
      );

      fs.writeFileSync(fullPath, buffer);

      manifest.files[hash] = {
        hash,
        text: item.text,
        language: item.lang,
        voice: item.voice,
        speed: item.speed,
        filePath: relPath
      };

      generatedCount++;
      console.log('✓ Done');

      // Rate limit safety
      await new Promise(r => setTimeout(r, 100));
    } catch (err: any) {
      console.log(`✕ Failed: ${err.message}`);
      errorCount++;
    }
  }

  // Save updated manifest
  manifest.generatedAt = new Date().toISOString();
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8');

  console.log('\n=====================================================');
  console.log(`Audio Generation Finished!`);
  console.log(`- Newly generated: ${generatedCount}`);
  console.log(`- Cached / Skipped: ${skippedCount}`);
  console.log(`- Errors: ${errorCount}`);
  console.log(`- Total audio files in manifest: ${Object.keys(manifest.files).length}`);
  console.log('=====================================================\n');
}

// Run if called directly
if (process.argv[1]?.endsWith('generate-audio.ts')) {
  main().catch(console.error);
}
