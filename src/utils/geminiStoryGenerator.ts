import { Story, CEFRLevel, SavedWord, VocabEntry, PartOfSpeech, Gender, GrammaticalNumber } from '../types';
import { validateStory, ValidationResult } from './storyValidator';
import { cleanFrenchWord } from './textParser';
import { getAnonymousUserId } from './storage';

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
  turnstileToken?: string;
  onProgress?: (stepDescription: string) => void;
  signal?: AbortSignal;
}

export type GenerationErrorCode =
  | 'DAILY_LIMIT_REACHED'
  | 'GLOBAL_CAP_REACHED'
  | 'FEATURE_DISABLED'
  | 'MODEL_BUSY'
  | 'SERVER_TIMEOUT'
  | 'NETWORK_ERROR'
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

export interface StoryQuotaInfo {
  enabled: boolean;
  userRemaining: number;
  userLimit: number;
  globalRemaining: number;
  globalCap: number;
  globalPaused: boolean;
  message?: string;
}

/**
 * Checks remaining daily stories and system status
 */
export async function getStoryQuotaStatus(): Promise<StoryQuotaInfo> {
  const userId = getAnonymousUserId();
  try {
    const res = await fetch(`/api/story-quota?userId=${encodeURIComponent(userId)}`);
    if (!res.ok) {
      return {
        enabled: true,
        userRemaining: 3,
        userLimit: 3,
        globalRemaining: 100,
        globalCap: 100,
        globalPaused: false
      };
    }
    return await res.json();
  } catch (e) {
    return {
      enabled: true,
      userRemaining: 3,
      userLimit: 3,
      globalRemaining: 100,
      globalCap: 100,
      globalPaused: false
    };
  }
}

/**
 * Transforms raw story output into the application's Story data format.
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
 * Handles client-side API error classification into friendly GenerationError.
 */
function handleApiError(error: any): GenerationError {
  if (error instanceof GenerationError) return error;

  if (error?.name === 'AbortError') {
    return new GenerationError('ABORTED', 'Story creation was cancelled.');
  }

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return new GenerationError(
      'NETWORK_ERROR',
      'No internet connection detected. Please check your network and try again.'
    );
  }

  const msg = error?.message || String(error);
  const status = error?.status || error?.statusCode;

  if (status === 504 || msg.includes('timeout') || msg.includes('SERVER_TIMEOUT')) {
    return new GenerationError(
      'SERVER_TIMEOUT',
      'The server took too long to create the story. Please try again.'
    );
  }

  if (status === 429 || msg.includes('DAILY_LIMIT_REACHED')) {
    return new GenerationError(
      'DAILY_LIMIT_REACHED',
      'You have reached your limit of 3 stories for today. Please come back tomorrow!'
    );
  }

  if (msg.includes('GLOBAL_CAP_REACHED')) {
    return new GenerationError(
      'GLOBAL_CAP_REACHED',
      'Story creation is paused for today, please come back tomorrow.'
    );
  }

  if (status === 503 || msg.includes('FEATURE_DISABLED')) {
    return new GenerationError(
      'FEATURE_DISABLED',
      'Story creation is temporarily unavailable.'
    );
  }

  if (msg.includes('MODEL_BUSY') || msg.includes('RESOURCE_EXHAUSTED')) {
    return new GenerationError(
      'MODEL_BUSY',
      'The story creator is temporarily busy. Please try again in a minute.'
    );
  }

  return new GenerationError(
    'UNKNOWN',
    'Story generation encountered an error. Please try again.'
  );
}

/**
 * Generates an original personalized French story using the secure server endpoint.
 * Splits generation into two phases (Phase 1: Draft + translations + quiz; Phase 2: Vocabulary map)
 * to stay comfortably within standard free-tier execution limits and provide real-time step progress.
 */
export async function generatePersonalizedStory(params: GenerateStoryParams): Promise<Story> {
  const userId = getAnonymousUserId();

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    throw new GenerationError(
      'NETWORK_ERROR',
      'No internet connection detected. Please check your network and try again.'
    );
  }

  // 1. Narrative outline and tone
  const narrativeStructure =
    NARRATIVE_STRUCTURES[Math.floor(Math.random() * NARRATIVE_STRUCTURES.length)];
  const tone = STORY_TONES[Math.floor(Math.random() * STORY_TONES.length)];

  const reusedWords = params.useMyWords && params.userWords ? params.userWords : [];
  const reusedKeys = reusedWords.map(w => w.word.toLowerCase());

  // Function to execute one complete generation cycle (draft + vocabulary)
  async function executeCycle(): Promise<Story> {
    params.onProgress?.('Drafting French story and sentence translations (1/2)...');

    // Step 1: Request draft (paragraphs, translations, quiz)
    const draftRes = await fetch('/api/generate-story', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        step: 'draft',
        topic: params.topic,
        level: params.level,
        length: params.length,
        style: params.style,
        grammarFocus: params.grammarFocus !== 'none' ? params.grammarFocus : undefined,
        userWords: reusedKeys,
        turnstileToken: params.turnstileToken
      }),
      signal: params.signal
    });

    if (!draftRes.ok) {
      const errData = await draftRes.json().catch(() => ({}));
      const code = errData.error || (draftRes.status === 429 ? 'DAILY_LIMIT_REACHED' : 'SERVER_ERROR');
      const msg = errData.message || (draftRes.status === 504 ? 'The server took too long to create the story. Please try again.' : 'Story generation failed.');
      throw new GenerationError(code as GenerationErrorCode, msg);
    }

    const draftData = await draftRes.json();
    const draft = draftData.draft;

    params.onProgress?.('Annotating bilingual vocabulary & grammar tags (2/2)...');

    // Step 2: Request vocabulary annotations for the generated paragraphs
    const vocabRes = await fetch('/api/generate-story', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        step: 'vocab',
        paragraphs: draft.paragraphs,
        tokens: draft.tokens,
        turnstileToken: params.turnstileToken
      }),
      signal: params.signal
    });

    if (!vocabRes.ok) {
      const errData = await vocabRes.json().catch(() => ({}));
      const code = errData.error || 'SERVER_ERROR';
      const msg = errData.message || 'Vocabulary generation failed.';
      throw new GenerationError(code as GenerationErrorCode, msg);
    }

    const vocabData = await vocabRes.json();

    const combinedRaw = {
      title: draft.title,
      subtitle: draft.subtitle,
      topic: draft.topic,
      paragraphs: draft.paragraphs,
      paragraphTranslations: draft.paragraphTranslations,
      quiz: draft.quiz,
      vocabulary: vocabData.vocabulary
    };

    return transformRawStory(combinedRaw, params, narrativeStructure, tone, reusedKeys);
  }

  let story: Story;
  try {
    story = await executeCycle();
  } catch (err) {
    throw handleApiError(err);
  }

  // 2. Client-Side Validation
  params.onProgress?.('Verifying story rules and grammar tags...');
  let validation = validateStory(story, {
    expectedLevel: params.level,
    expectedLength: params.length
  });

  // 3. One-time Auto-Retry if initial generation fails client-side validation
  if (!validation.valid) {
    params.onProgress?.('Refining vocabulary coverage and correcting linguistic tags...');
    try {
      story = await executeCycle();
      validation = validateStory(story, {
        expectedLevel: params.level,
        expectedLength: params.length
      });
    } catch (retryErr) {
      console.warn('Retry failed:', retryErr);
    }
  }

  // If still invalid after 2 attempts
  if (!validation.valid) {
    throw new GenerationError(
      'VALIDATION_FAILED',
      'The story could not be verified for grammar and vocabulary accuracy. Please try another topic or level.',
      validation.errors.join('\n')
    );
  }

  params.onProgress?.('Story verified and ready to read!');
  return story;
}
