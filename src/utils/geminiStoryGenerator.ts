import { GoogleGenAI, Type } from '@google/genai';
import { Story, CEFRLevel, SavedWord, VocabEntry, PartOfSpeech, Gender, GrammaticalNumber } from '../types';
import { validateStory, ValidationResult } from './storyValidator';
import { cleanFrenchWord } from './textParser';
import { getGeminiApiKey } from './storage';

export const NARRATIVE_STRUCTURES = [
  'A small everyday problem solved with patience and communication',
  'A harmless misunderstanding between neighbors or colleagues resolved warmly',
  'A first day at a new job, course, or community activity in France',
  'A pleasant surprise meeting with a friend or helpful acquaintance in town',
  'A thoughtful decision between two appealing options (menu, apartment, route, item)',
  'A calm, descriptive day in the life with an unexpected rewarding moment',
  'A lost-and-found situation that brings people together',
  'Asking for and following directions in an unfamiliar neighborhood or station',
  'Ordering food, coffee, or a special pastry for a celebration',
  'An unexpected delay during public transport turned into an engaging conversation',
  'Borrowing or lending a household item or tool with friendly courtesy',
  'Trying a new local activity, workshop, or sport for the first time',
  'Exchanging or returning an item at a boutique or local market',
  'Welcoming a newcomer and sharing practical local advice',
  'Planning a simple weekend picnic or stroll in a nearby park'
];

export const STORY_TONES = [
  'warm and welcoming',
  'lighthearted and slightly humorous',
  'calm and comforting',
  'curious and observant',
  'practical and realistic',
  'encouraging and confidence-building',
  'thoughtful and appreciative',
  'lively and sociable',
  'gentle and reassuring',
  'cheerful and cooperative'
];

export const QUICK_TOPIC_SUGGESTIONS = [
  { id: 'shopping', label: '🛒 Shopping & Bakery', fr: 'Faire les courses & Boulangerie' },
  { id: 'health', label: '🩺 Health & Doctor', fr: 'Santé & Rendez-vous médical' },
  { id: 'work', label: '💼 Work & Office', fr: 'Au bureau & Emploi' },
  { id: 'housing', label: '🏠 Housing & Landlord', fr: 'Logement & Vie chez soi' },
  { id: 'transport', label: '🚇 Metro & Transport', fr: 'Transports en commun & Métro' },
  { id: 'school', label: '🎓 School & Training', fr: 'École & Formation' },
  { id: 'friends', label: '☕ Friends & Café', fr: 'Sorties entre amis & Café' },
  { id: 'food', label: '🥖 Food & Cooking', fr: 'Marché, cuisine & repas' },
  { id: 'tech', label: '📱 Phone & Internet', fr: 'Téléphone, forfait & technologie' },
  { id: 'leisure', label: '🌳 Leisure & Weekend', fr: 'Loisirs & Balade du week-end' }
];

export interface GenerateStoryParams {
  topic: string;
  level: CEFRLevel;
  length: 'short' | 'medium' | 'long';
  style: 'dialogue' | 'narrative';
  grammarFocus?: string;
  useMyWords: boolean;
  userWords?: SavedWord[];
  onProgress?: (stepDescription: string) => void;
  signal?: AbortSignal;
}

export type GenerationErrorCode =
  | 'NO_KEY'
  | 'INVALID_KEY'
  | 'QUOTA_EXCEEDED'
  | 'NETWORK_ERROR'
  | 'MALFORMED_OUTPUT'
  | 'VALIDATION_FAILED'
  | 'ABORTED'
  | 'UNKNOWN';

export class GenerationError extends Error {
  code: GenerationErrorCode;
  details?: string;

  constructor(code: GenerationErrorCode, message: string, details?: string) {
    super(message);
    this.name = 'GenerationError';
    this.code = code;
    this.details = details;
  }
}

/**
 * Builds the exact prompt sent to Gemini.
 */
export function buildPrompt(params: {
  topic: string;
  level: CEFRLevel;
  length: 'short' | 'medium' | 'long';
  style: 'dialogue' | 'narrative';
  grammarFocus?: string;
  reusedWords: SavedWord[];
  narrativeStructure: string;
  tone: string;
}): string {
  const targetWords =
    params.length === 'short'
      ? '120 to 160 words'
      : params.length === 'medium'
      ? '210 to 270 words'
      : '330 to 420 words';

  const levelRules =
    params.level === 'A1'
      ? `CEFR A1 LEVEL CONSTRAINTS:
- Use primarily present tense (présent de l'indicatif) with very common, high-frequency everyday vocabulary.
- Keep sentences short, direct, and straightforward.
- Dialogues should use polite standard French (bonjour, s'il vous plaît, merci, au revoir).
- Avoid complex subclauses or rare tenses.`
      : `CEFR A2 LEVEL CONSTRAINTS:
- May incorporate passé composé (avoir/être), futur proche (aller + infinitive), and common reflexive verbs (se réveiller, s'habiller...).
- Use clear everyday connectors (parce que, donc, ensuite, mais, alors, d'abord).
- Sentence length can be slightly more varied, while remaining crystal clear.
- Introduce at most about 8 new lemmas per 100 words.`;

  const grammarInstruction = params.grammarFocus && params.grammarFocus !== 'none'
    ? `\nSPECIFIC GRAMMAR FOCUS:
- Naturally emphasize and include multiple natural occurrences of: "${params.grammarFocus}".\n`
    : '';

  const wordsInstruction = params.reusedWords.length > 0
    ? `\nMANDATORY VOCABULARY TO REUSE:
You MUST naturally include the following French words/lemmas currently being learned by the student into the story:
${params.reusedWords.map(w => `- "${w.word}" (lemma: "${w.lemma}", meaning: "${w.en}")`).join('\n')}
Make sure each of these words appears in the paragraphs and has an accurate entry in the vocabulary array.\n`
    : '';

  return `You are an expert French educational author creating an authentic, personalized French graded reading story for a student living or preparing for daily life in France.

STORY SPECIFICATIONS:
- Topic: ${params.topic}
- CEFR Level: ${params.level}
- Target Length: ${targetWords} (strictly respect this range)
- Format / Style: ${params.style === 'dialogue' ? 'Realistic Dialogue between characters' : 'Narrative Story with actions and thoughts'}
- Narrative Structure: ${params.narrativeStructure}
- Tone: ${params.tone}
${grammarInstruction}${wordsInstruction}
${levelRules}

SAFETY & FACTUAL BOUNDARY:
- Do NOT state rigid legal rules, specific government visa fees, strict administrative deadlines, medical prescriptions or dosages, or exhaustive official document lists. Keep all situations everyday, realistic, helpful, and general.

STRICT GRAMMAR & VOCABULARY TAGGING RULES:
1. Every single unique French word token that appears in your paragraphs MUST have an entry in the "vocabulary" array. Do not miss any word!
2. The "key" field must be the lowercase word token without punctuation (e.g. for "boulangerie", key is "boulangerie"; for "j'achète", create key "j" and key "achète"; for "l'eau", create key "l" and key "eau").
3. Articles "les" and "des":
   - pos must be "article"
   - number must be "plural"
   - DO NOT include gender for "les" or "des"! (Must show only "article · plural").
4. Numbers (deux, trois, cinq, dix, soixante, cent, etc.):
   - pos must be "number"
   - DO NOT include gender or number for numerals!
   - Exception: "un" and "une" are articles and keep their gender ("masculine" for un, "feminine" for une, number "singular").
5. Nouns:
   - pos: "noun"
   - gender: "masculine" or "feminine"
   - number: "singular" or "plural" (reflecting whether it appears singular or plural in context)
   - lemmaWithArticle: dictionary lemma preceded by singular definite article (e.g. "le croissant", "la baguette", "l'ami", "l'eau", or base name for proper nouns e.g. "Paris")
6. Adjectives:
   - pos: "adjective"
   - gender: "masculine" or "feminine"
   - number: "singular" or "plural"
7. Verbs:
   - pos: "verb"
   - tense: "present", "imperfect", "future", "conditional", "subjunctive", "imperative", "infinitive", "past participle", or "present participle"
   - person: for finite verbs, "1st person singular", "2nd person singular", "3rd person singular", "1st person plural", "2nd person plural", or "3rd person plural". (Omit for infinitive and participles)
   - Verbs must NEVER have gender or number!
8. Bangla & English Translations:
   - Provide a clear, accurate English translation ("en") and an authentic, natural Bangla translation in Bengali script ("bn") for every vocabulary item and quiz explanation.
9. Paragraphs and Sentence Alignment:
   - Break the French story into 2 to 4 paragraphs.
   - For every French paragraph, provide an exact English translation in "paragraphTranslations", aligned sentence by sentence.
10. Comprehension Quiz:
   - Exactly 3 multiple-choice questions testing reading comprehension.
   - 4 options each, in French.
   - "answer" is the 0-based index (0, 1, 2, or 3) of the correct option.
   - Provide "explanation" (simple English) and "explanationBn" (Bangla).

Return ONLY the structured JSON output adhering strictly to the schema.`;
}

const STORY_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: 'French title' },
    subtitle: { type: Type.STRING, description: 'Short French subtitle or summary' },
    topic: { type: Type.STRING, description: 'Topic category' },
    paragraphs: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'French paragraphs of the story'
    },
    paragraphTranslations: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'English translations for each paragraph, sentence-aligned'
    },
    vocabulary: {
      type: Type.ARRAY,
      description: 'List of vocabulary entries covering EVERY word token in the paragraphs',
      items: {
        type: Type.OBJECT,
        properties: {
          key: { type: Type.STRING, description: 'Lowercase word token without punctuation' },
          lemma: { type: Type.STRING, description: 'Base dictionary form' },
          en: { type: Type.STRING, description: 'English translation in context' },
          bn: { type: Type.STRING, description: 'Bangla translation (বাংলা অর্থ)' },
          pos: {
            type: Type.STRING,
            enum: ['noun', 'verb', 'adjective', 'adverb', 'preposition', 'pronoun', 'conjunction', 'expression', 'article', 'interjection', 'number'],
            description: 'Part of speech'
          },
          gender: {
            type: Type.STRING,
            enum: ['masculine', 'feminine'],
            description: 'Gender (nouns, adjectives, singular articles)'
          },
          number: {
            type: Type.STRING,
            enum: ['singular', 'plural'],
            description: 'Number (nouns, adjectives, articles)'
          },
          person: {
            type: Type.STRING,
            description: 'Person for finite verbs'
          },
          tense: {
            type: Type.STRING,
            description: 'Tense for verbs'
          },
          lemmaWithArticle: {
            type: Type.STRING,
            description: 'Dictionary lemma with article for nouns'
          }
        },
        required: ['key', 'lemma', 'en', 'bn', 'pos']
      }
    },
    quiz: {
      type: Type.ARRAY,
      description: 'Exactly 3 comprehension questions',
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING, description: 'Question text' },
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: '4 options in French'
          },
          answer: { type: Type.INTEGER, description: '0-based index of correct option' },
          explanation: { type: Type.STRING, description: 'Explanation in English' },
          explanationBn: { type: Type.STRING, description: 'Explanation in Bangla' }
        },
        required: ['question', 'options', 'answer', 'explanation', 'explanationBn']
      }
    }
  },
  required: ['title', 'subtitle', 'topic', 'paragraphs', 'paragraphTranslations', 'vocabulary', 'quiz']
};

/**
 * Transforms raw Gemini output into the application's Story data format.
 */
function transformRawStory(
  raw: any,
  params: GenerateStoryParams,
  narrativeStructure: string,
  tone: string,
  reusedWordKeys: string[]
): Story {
  const vocabulary: Record<string, VocabEntry> = {};

  if (Array.isArray(raw.vocabulary)) {
    raw.vocabulary.forEach((item: any) => {
      const cleanKey = cleanFrenchWord(item.key) || item.key?.toLowerCase().trim();
      if (!cleanKey) return;

      const pos = item.pos as PartOfSpeech;
      const entry: VocabEntry = {
        lemma: item.lemma || cleanKey,
        en: item.en || '',
        bn: item.bn || '',
        pos
      };

      // Rules enforcement on transformed vocabulary
      if (pos === 'article' && (cleanKey === 'les' || cleanKey === 'des' || item.number === 'plural')) {
        entry.number = 'plural';
      } else if (pos === 'number') {
        // Numbers: no gender, no number chip
      } else {
        if (item.gender === 'masculine' || item.gender === 'feminine') {
          entry.gender = item.gender as Gender;
        }
        if (item.number === 'singular' || item.number === 'plural') {
          entry.number = item.number as GrammaticalNumber;
        }
      }

      if (pos === 'verb') {
        if (item.person) entry.person = item.person;
        if (item.tense) entry.tense = item.tense;
      }

      if (pos === 'noun' && item.lemmaWithArticle) {
        entry.lemmaWithArticle = item.lemmaWithArticle;
      }

      vocabulary[cleanKey] = entry;
    });
  }

  const fullText = (raw.paragraphs || []).join(' ');
  const wordCount = fullText.split(/\s+/).filter((w: string) => w.length > 0).length;
  const estimatedMinutes = Math.max(1, Math.round(wordCount / 70));

  const storyId = `ai-story-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

  return {
    id: storyId,
    title: raw.title || 'Histoire personnalisée',
    subtitle: raw.subtitle || 'Histoire générée par IA pour votre niveau',
    level: params.level,
    topic: raw.topic || params.topic,
    wordCount,
    estimatedMinutes,
    paragraphs: raw.paragraphs || [],
    paragraphTranslations: raw.paragraphTranslations || [],
    vocabulary,
    quiz: raw.quiz || [],
    isAiGenerated: true,
    reusedWords: reusedWordKeys,
    generationSettings: {
      topic: params.topic,
      level: params.level,
      length: params.length,
      style: params.style,
      grammarFocus: params.grammarFocus,
      useMyWords: params.useMyWords,
      reusedWords: reusedWordKeys,
      narrativeStructure,
      tone,
      timestamp: new Date().toISOString()
    }
  };
}

/**
 * Handles error classification into user-friendly GenerationError.
 */
function handleApiError(error: any): GenerationError {
  if (error instanceof GenerationError) return error;

  const msg = error?.message || String(error);
  const status = error?.status || error?.statusCode;

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return new GenerationError(
      'NETWORK_ERROR',
      'No internet connection detected. Please check your network and try again.'
    );
  }

  if (
    status === 400 ||
    status === 401 ||
    status === 403 ||
    msg.includes('API_KEY_INVALID') ||
    msg.includes('invalid API key') ||
    msg.includes('API key not valid')
  ) {
    return new GenerationError(
      'INVALID_KEY',
      'Your Gemini API key appears to be invalid or expired. Please check your key in Settings.'
    );
  }

  if (
    status === 429 ||
    msg.includes('RESOURCE_EXHAUSTED') ||
    msg.includes('quota') ||
    msg.includes('rate limit')
  ) {
    return new GenerationError(
      'QUOTA_EXCEEDED',
      'Gemini API quota exceeded or rate limit reached. Please wait a moment and try again.'
    );
  }

  if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('Network request failed')) {
    return new GenerationError(
      'NETWORK_ERROR',
      'Network connection to Gemini API failed. Please verify your connection.'
    );
  }

  if (error instanceof SyntaxError || msg.includes('JSON')) {
    return new GenerationError(
      'MALFORMED_OUTPUT',
      'The AI returned an unreadable response format. Please try generating again.'
    );
  }

  return new GenerationError(
    'UNKNOWN',
    `Story generation failed: ${msg.slice(0, 150)}`
  );
}

/**
 * Generates an original personalized French story with client-side validation and 1-time retry.
 */
export async function generatePersonalizedStory(params: GenerateStoryParams): Promise<Story> {
  const apiKey = getGeminiApiKey();
  if (!apiKey || !apiKey.trim()) {
    throw new GenerationError(
      'NO_KEY',
      'No Gemini API key found. Please add your API key in Settings to generate personalized stories.'
    );
  }

  // 1. Select Narrative Structure & Tone
  const narrativeStructure =
    NARRATIVE_STRUCTURES[Math.floor(Math.random() * NARRATIVE_STRUCTURES.length)];
  const tone = STORY_TONES[Math.floor(Math.random() * STORY_TONES.length)];

  // 2. Select Reused Words
  const reusedWords = params.useMyWords && params.userWords ? params.userWords : [];
  const reusedKeys = reusedWords.map(w => w.word.toLowerCase());

  params.onProgress?.('Designing narrative outline and character dialogue...');

  const prompt = buildPrompt({
    topic: params.topic,
    level: params.level,
    length: params.length,
    style: params.style,
    grammarFocus: params.grammarFocus,
    reusedWords,
    narrativeStructure,
    tone
  });

  const ai = new GoogleGenAI({ apiKey: apiKey.trim() });

  params.onProgress?.('Drafting French story with level-appropriate vocabulary...');

  let rawStoryData: any;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: STORY_RESPONSE_SCHEMA,
        temperature: 0.7
      }
    });

    const responseText = response.text?.trim() || '{}';
    rawStoryData = JSON.parse(responseText);
  } catch (err) {
    throw handleApiError(err);
  }

  params.onProgress?.('Annotating bilingual meanings and validating grammar consistency...');

  let story = transformRawStory(rawStoryData, params, narrativeStructure, tone, reusedKeys);

  // 3. Client-Side Validation
  let validation = validateStory(story, {
    expectedLevel: params.level,
    expectedLength: params.length
  });

  // 4. One-time Auto-Retry if validation failed
  if (!validation.valid) {
    params.onProgress?.('Refining vocabulary coverage and correcting linguistic tags...');

    const retryPrompt = `${prompt}

IMPORTANT: The previous generation failed validation with the following specific issues:
${validation.errors.map((e, idx) => `${idx + 1}. ${e}`).join('\n')}

Please fix every single one of these errors:
- Ensure EVERY word token appearing in the French text has an entry in the vocabulary array.
- Follow all grammatical rules (no gender on "les", "des", or numerals; exact gender/number for nouns and adjectives; valid person/tense for verbs; lemmaWithArticle for nouns).
- Ensure paragraph and sentence translation counts match.
Return the complete corrected JSON output.`;

    try {
      const retryResponse = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: retryPrompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: STORY_RESPONSE_SCHEMA,
          temperature: 0.4
        }
      });

      const retryText = retryResponse.text?.trim() || '{}';
      const retryData = JSON.parse(retryText);
      story = transformRawStory(retryData, params, narrativeStructure, tone, reusedKeys);
      validation = validateStory(story, {
        expectedLevel: params.level,
        expectedLength: params.length
      });
    } catch (retryErr) {
      console.warn('Retry failed:', retryErr);
    }
  }

  // If still invalid after retry, report clear message
  if (!validation.valid) {
    throw new GenerationError(
      'VALIDATION_FAILED',
      `The generated story did not pass quality checks: ${validation.errors.slice(0, 3).join('; ')}`,
      validation.errors.join('\n')
    );
  }

  params.onProgress?.('Story generated and verified successfully!');
  return story;
}
