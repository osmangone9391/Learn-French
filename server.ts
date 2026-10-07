/**
 * LireFacile Full-Stack Server
 * 
 * Provides:
 * 1. GET /api/story-quota - Rate limit status and feature availability check
 * 2. POST /api/generate-story - Secure server-side Gemini story generation
 * 3. Vite development middleware in dev / static asset serving in production
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { AI_CONFIG, SECURITY_LIMITS } from './server/config';
import { counterStorage } from './server/storage';
import { verifyTurnstileToken } from './server/turnstile';
import { generateDraft, generateVocabulary, ServiceError } from './server/storyService';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const isProd = process.env.NODE_ENV === 'production';

// Basic CORS & preflight handling
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Strict body size limit for abuse defense (10 KB)
app.use(express.json({ limit: '10kb' }));

// Helper to get client IP
function getClientIp(req: express.Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || req.socket.remoteAddress || '127.0.0.1';
}

/**
 * GET /api/story-quota
 * Returns feature availability and remaining quota for the user and globally.
 */
app.get('/api/story-quota', (req, res) => {
  const enabled = SECURITY_LIMITS.isAiStoriesEnabled;
  if (!enabled) {
    return res.json({
      enabled: false,
      userRemaining: 0,
      userLimit: SECURITY_LIMITS.userDailyLimit,
      globalRemaining: 0,
      globalCap: SECURITY_LIMITS.globalDailyCap,
      globalPaused: false,
      message: 'Story creation is temporarily unavailable.'
    });
  }

  const userId = typeof req.query.userId === 'string' ? req.query.userId.trim() : 'anonymous';
  const ip = getClientIp(req);
  const counts = counterStorage.getCounts(userId, ip);

  const userLimit = SECURITY_LIMITS.userDailyLimit;
  const globalCap = SECURITY_LIMITS.globalDailyCap;

  const maxUserUsed = Math.max(counts.userCount, counts.ipCount);
  const userRemaining = Math.max(0, userLimit - maxUserUsed);
  const globalRemaining = Math.max(0, globalCap - counts.globalCount);
  const globalPaused = counts.globalCount >= globalCap;

  let message: string | undefined;
  if (globalPaused) {
    message = 'Story creation is paused for today, please come back tomorrow.';
  } else if (userRemaining <= 0) {
    message = `You have reached your limit of ${userLimit} stories for today. Please come back tomorrow!`;
  }

  return res.json({
    enabled: true,
    userRemaining,
    userLimit,
    globalRemaining,
    globalCap,
    globalPaused,
    message
  });
});

/**
 * POST /api/generate-story
 * Secure generation endpoint supporting split calls (step=draft, step=vocab) or full generation.
 */
app.post('/api/generate-story', async (req, res) => {
  const ip = getClientIp(req);

  // 1. Kill Switch Check
  if (!SECURITY_LIMITS.isAiStoriesEnabled) {
    counterStorage.recordError('feature_disabled');
    return res.status(503).json({
      error: 'FEATURE_DISABLED',
      message: 'Story creation is temporarily unavailable.'
    });
  }

  // 2. Bot Protection (Cloudflare Turnstile)
  const turnstileCheck = await verifyTurnstileToken(req.body.turnstileToken, ip);
  if (!turnstileCheck.success) {
    counterStorage.recordError('turnstile_rejected');
    return res.status(403).json({
      error: 'BOT_VERIFICATION_FAILED',
      message: 'Security verification failed. Please refresh the page and try again.'
    });
  }

  // 3. Rate Limit & Daily Quota Checks
  const userId = typeof req.body.userId === 'string' && req.body.userId.trim()
    ? req.body.userId.trim().substring(0, 60)
    : 'anonymous';

  const counts = counterStorage.getCounts(userId, ip);
  const userLimit = SECURITY_LIMITS.userDailyLimit;
  const globalCap = SECURITY_LIMITS.globalDailyCap;

  if (counts.globalCount >= globalCap) {
    counterStorage.recordError('global_cap_reached');
    return res.status(429).json({
      error: 'GLOBAL_CAP_REACHED',
      message: 'Story creation is paused for today, please come back tomorrow.'
    });
  }

  const maxUserUsed = Math.max(counts.userCount, counts.ipCount);
  if (maxUserUsed >= userLimit) {
    counterStorage.recordError('daily_limit_reached');
    return res.status(429).json({
      error: 'DAILY_LIMIT_REACHED',
      message: `You have reached your limit of ${userLimit} stories for today. Please come back tomorrow!`
    });
  }

  // 4. Validate Input Constraints
  const step = req.body.step || 'full';
  const topic = typeof req.body.topic === 'string' ? req.body.topic.trim().substring(0, SECURITY_LIMITS.maxTopicLength) : '';
  const level = SECURITY_LIMITS.allowedLevels.includes(req.body.level) ? req.body.level : 'A2';
  const length = SECURITY_LIMITS.allowedLengths.includes(req.body.length) ? req.body.length : 'medium';
  const style = SECURITY_LIMITS.allowedStyles.includes(req.body.style) ? req.body.style : 'casual';
  const grammarFocus = SECURITY_LIMITS.allowedGrammar.includes(req.body.grammarFocus) ? req.body.grammarFocus : 'none';

  const userWords = Array.isArray(req.body.userWords)
    ? req.body.userWords
        .filter((w: any) => typeof w === 'string' && w.trim().length > 0)
        .slice(0, SECURITY_LIMITS.maxMyWords)
        .map((w: string) => w.trim().substring(0, SECURITY_LIMITS.maxWordLength))
    : [];

  try {
    if (step === 'draft') {
      const draft = await generateDraft({
        topic,
        level,
        length,
        style,
        grammarFocus: grammarFocus !== 'none' ? grammarFocus : undefined,
        userWords
      });
      return res.json({ step: 'draft', draft });
    }

    if (step === 'vocab') {
      const paragraphs = Array.isArray(req.body.paragraphs) ? req.body.paragraphs : [];
      if (paragraphs.length === 0) {
        return res.status(400).json({ error: 'INVALID_INPUT', message: 'Paragraphs are required for vocabulary annotation.' });
      }

      const tokens = Array.isArray(req.body.tokens) ? req.body.tokens : undefined;
      const vocabulary = await generateVocabulary(paragraphs, tokens);

      // Increment story consumption count upon successful completion of vocabulary
      counterStorage.increment(userId, ip);

      return res.json({ step: 'vocab', vocabulary });
    }

    // Default: 'full' generation (Draft then Vocabulary)
    const draft = await generateDraft({
      topic,
      level,
      length,
      style,
      grammarFocus: grammarFocus !== 'none' ? grammarFocus : undefined,
      userWords
    });

    const vocabulary = await generateVocabulary(draft.paragraphs, draft.tokens);

    // Increment quota count
    counterStorage.increment(userId, ip);

    return res.json({
      title: draft.title,
      subtitle: draft.subtitle,
      topic: draft.topic,
      paragraphs: draft.paragraphs,
      paragraphTranslations: draft.paragraphTranslations,
      quiz: draft.quiz,
      vocabulary
    });
  } catch (err: any) {
    const errorType = err instanceof ServiceError ? err.code : 'UNKNOWN_ERROR';
    counterStorage.recordError(errorType);

    if (err instanceof ServiceError) {
      return res.status(err.status).json({
        error: err.code,
        message: err.message
      });
    }

    console.error('[GenerateStory] Unexpected error:', err);
    return res.status(500).json({
      error: 'SERVER_ERROR',
      message: 'Story creation encountered an error. Please try again.'
    });
  }
});

// App server setup (Vite in dev, static files in prod)
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[LireFacile Server] Running on http://0.0.0.0:${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
