/**
 * Server-Side Gemini Story Generation Service
 * 
 * Securely accesses Gemini using GEMINI_API_KEY from process.env.
 * The API key is NEVER sent to the client, logged, or exposed in error messages.
 */

import { GoogleGenAI } from '@google/genai';
import { AI_CONFIG } from './config';
import {
  buildStep1Prompt,
  STEP1_RESPONSE_SCHEMA,
  buildStep2Prompt,
  STEP2_RESPONSE_SCHEMA,
  PromptInputParams
} from './prompts';

export class ServiceError extends Error {
  public code: string;
  public status: number;

  constructor(code: string, message: string, status: number = 400) {
    super(message);
    this.name = 'ServiceError';
    this.code = code;
    this.status = status;
  }
}

/**
 * Extracts unique French word tokens from paragraphs
 */
export function extractWordTokens(paragraphs: string[]): string[] {
  const seen = new Set<string>();
  const text = paragraphs.join(' ');
  // Match French words and contractions like l', d', qu', c', s', n', j', m', t'
  const matches = text.match(/[a-zA-ZÀ-ÿœŒæÆ]+(?:'[a-zA-ZÀ-ÿœŒæÆ]+)?|[a-zA-ZÀ-ÿœŒæÆ]+/g) || [];

  for (const raw of matches) {
    const cleaned = raw.toLowerCase().trim();
    if (cleaned.length > 0) {
      // If word has apostrophe contraction, also ensure both pieces are represented
      if (cleaned.includes("'")) {
        const parts = cleaned.split("'");
        if (parts[0]) seen.add(parts[0] + "'");
        if (parts[1]) seen.add(parts[1]);
        seen.add(cleaned);
      } else {
        seen.add(cleaned);
      }
    }
  }

  return Array.from(seen);
}

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !apiKey.trim()) {
    console.error('[StoryService] GEMINI_API_KEY environment variable is missing.');
    throw new ServiceError(
      'FEATURE_DISABLED',
      'Story creation is temporarily unavailable.',
      503
    );
  }
  return new GoogleGenAI({ apiKey: apiKey.trim() });
}

async function generateContentWithFallback(
  ai: GoogleGenAI,
  requestOptions: {
    contents: string;
    config: any;
  }
) {
  const configured = AI_CONFIG.model;
  const candidateModels = [
    'gemini-3.1-flash-lite',
    configured,
    'gemini-flash-latest',
    'gemini-3.8-flash',
    ...(AI_CONFIG.fallbackModels || [])
  ].filter(m => m && m !== 'gemini-2.5-flash');

  const modelsToTry = Array.from(new Set(candidateModels));
  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: requestOptions.contents,
        config: requestOptions.config
      });
      return response;
    } catch (err: any) {
      lastError = err;
      const status = err?.status || err?.statusCode;
      const msg = err?.message || String(err);
      console.warn(`[StoryService] Model ${model} unavailable (${status || msg.slice(0, 60)}), trying next candidate...`);
      // If auth failure, fail immediately
      if (status === 401 || status === 403) {
        throw err;
      }
    }
  }

  throw lastError;
}

function formatApiError(err: any): ServiceError {
  if (err instanceof ServiceError) return err;

  const msg = err?.message || String(err);
  const status = err?.status || err?.statusCode;

  // Rate limit or capacity
  if (
    status === 429 ||
    status === 503 ||
    msg.includes('RESOURCE_EXHAUSTED') ||
    msg.includes('quota') ||
    msg.includes('rate limit') ||
    msg.includes('overloaded')
  ) {
    return new ServiceError(
      'MODEL_BUSY',
      'The story creator is temporarily busy. Please try again in a minute.',
      429
    );
  }

  if (msg.includes('SERVER_TIMEOUT') || err?.code === 'SERVER_TIMEOUT') {
    return new ServiceError(
      'SERVER_TIMEOUT',
      'The server took too long to create the story. Please try again.',
      504
    );
  }

  // Network / Connection
  if (msg.includes('Failed to fetch') || msg.includes('ENOTFOUND') || msg.includes('ECONNREFUSED')) {
    return new ServiceError(
      'NETWORK_ERROR',
      'Could not reach the AI service. Please check network connection.',
      502
    );
  }

  console.error('[StoryService] Generation failure:', msg.slice(0, 150));
  return new ServiceError(
    'MODEL_ERROR',
    'Story generation encountered an error. Please try again.',
    500
  );
}

/**
 * Step 1: Generates story draft (paragraphs, translations, quiz)
 * Typical duration: 4-7 seconds.
 */
export async function generateDraft(params: PromptInputParams): Promise<{
  title: string;
  subtitle: string;
  topic: string;
  paragraphs: string[];
  paragraphTranslations: string[];
  quiz: any[];
  tokens: string[];
}> {
  const ai = getGeminiClient();
  const prompt = buildStep1Prompt(params);

  try {
    const response = await generateContentWithFallback(ai, {
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: STEP1_RESPONSE_SCHEMA,
        temperature: AI_CONFIG.temperature,
        maxOutputTokens: AI_CONFIG.maxOutputTokens
      }
    });

    const text = response.text?.trim() || '{}';
    const parsed = JSON.parse(text);

    if (!parsed.paragraphs || !Array.isArray(parsed.paragraphs) || parsed.paragraphs.length === 0) {
      throw new ServiceError('MALFORMED_OUTPUT', 'Story drafting returned incomplete output.', 500);
    }

    const tokens = extractWordTokens(parsed.paragraphs);

    return {
      title: parsed.title || 'Histoire personnalisée',
      subtitle: parsed.subtitle || '',
      topic: parsed.topic || params.topic,
      paragraphs: parsed.paragraphs,
      paragraphTranslations: parsed.paragraphTranslations || [],
      quiz: parsed.quiz || [],
      tokens
    };
  } catch (err) {
    throw formatApiError(err);
  }
}

/**
 * Step 2: Annotates vocabulary for generated paragraphs
 * Typical duration: 6-10 seconds.
 */
export async function generateVocabulary(paragraphs: string[], tokens?: string[]): Promise<any[]> {
  const ai = getGeminiClient();
  const wordTokens = tokens && tokens.length > 0 ? tokens : extractWordTokens(paragraphs);
  const prompt = buildStep2Prompt(paragraphs, wordTokens);

  try {
    const response = await generateContentWithFallback(ai, {
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: STEP2_RESPONSE_SCHEMA,
        temperature: 0.3,
        maxOutputTokens: AI_CONFIG.maxOutputTokens
      }
    });

    const text = response.text?.trim() || '{}';
    const parsed = JSON.parse(text);

    if (!parsed.vocabulary || !Array.isArray(parsed.vocabulary)) {
      throw new ServiceError('MALFORMED_OUTPUT', 'Vocabulary annotation returned incomplete output.', 500);
    }

    return parsed.vocabulary;
  } catch (err) {
    throw formatApiError(err);
  }
}
