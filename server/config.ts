/**
 * Server Configuration & Constants
 * 
 * Central location for AI model configuration, provider, rate limits, and security boundaries.
 * Google Gemini official documentation: https://ai.google.dev/gemini-api/docs/models/gemini
 * Google Gemini pricing & terms: https://ai.google.dev/pricing and https://ai.google.dev/terms
 */

export const AI_CONFIG = {
  // Provider name
  provider: 'google-genai' as const,

  // Exact recommended production model from official Google Gemini documentation:
  // Documentation: https://ai.google.dev/gemini-api/docs/models/gemini
  // Can be overridden via GEMINI_MODEL environment variable
  model: process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite',

  // Fallback models if primary model is unavailable or encounters high demand spikes
  fallbackModels: ['gemini-3.1-flash-lite', 'gemini-flash-latest', 'gemini-3.8-flash'],

  // Maximum output tokens for model response
  maxOutputTokens: 8192,

  // Temperature for balanced creativity and strict grammatical precision
  temperature: 0.7,

  // Per-call request timeout in milliseconds (e.g. 50 seconds)
  timeoutMs: 50000,
};

export const SECURITY_LIMITS = {
  // Kill switch: when 'false', no model calls are made
  get isAiStoriesEnabled(): boolean {
    return process.env.AI_STORIES_ENABLED !== 'false';
  },

  // Per-user daily story limit (per anonymous browser ID and per IP)
  get userDailyLimit(): number {
    const val = parseInt(process.env.USER_DAILY_STORY_LIMIT || '3', 10);
    return isNaN(val) || val <= 0 ? 3 : val;
  },

  // Global daily cap for all users combined across the entire instance
  get globalDailyCap(): number {
    const val = parseInt(process.env.GLOBAL_DAILY_STORY_CAP || '100', 10);
    return isNaN(val) || val <= 0 ? 100 : val;
  },

  // Input sanitization and size limits
  maxTopicLength: 150,
  maxMyWords: 8,
  maxWordLength: 35,
  maxRequestBytes: 10 * 1024, // 10 KB

  // Allowed parameter values
  allowedLevels: ['A1', 'A2', 'B1', 'B2'] as const,
  allowedLengths: ['short', 'medium', 'long'] as const,
  allowedStyles: ['casual', 'formal', 'humorous', 'dramatic'] as const,
  allowedGrammar: [
    'none',
    'present',
    'passe_compose',
    'imparfait',
    'futur_proche',
    'futur_simple',
    'subjonctif',
    'reflexive'
  ] as const,
};
