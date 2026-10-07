interface NetlifyContext {
  ip?: string;
  [key: string]: any;
}
import { SECURITY_LIMITS } from '../../server/config';
import { counterStorage, hashIp } from '../../server/storage';
import { generateDraft, generateVocabulary, ServiceError } from '../../server/storyService';
import { verifyTurnstileToken } from '../../server/turnstile';

export default async (req: Request, context: NetlifyContext) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'METHOD_NOT_ALLOWED' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const ip = context.ip || '127.0.0.1';

  // 1. Kill Switch
  if (!SECURITY_LIMITS.isAiStoriesEnabled) {
    counterStorage.recordError('feature_disabled');
    return new Response(
      JSON.stringify({
        error: 'FEATURE_DISABLED',
        message: 'Story creation is temporarily unavailable.'
      }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let body: any = {};
  try {
    body = await req.json();
  } catch {
    return new Response(
      JSON.stringify({ error: 'INVALID_JSON', message: 'Malformed JSON payload.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 2. Turnstile Bot Check
  const turnstileCheck = await verifyTurnstileToken(body.turnstileToken, ip);
  if (!turnstileCheck.success) {
    counterStorage.recordError('turnstile_rejected');
    return new Response(
      JSON.stringify({
        error: 'BOT_VERIFICATION_FAILED',
        message: 'Security verification failed. Please refresh the page and try again.'
      }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 3. Quotas
  const userId = typeof body.userId === 'string' && body.userId.trim() ? body.userId.trim().slice(0, 60) : 'anonymous';
  const counts = counterStorage.getCounts(userId, ip);
  const userLimit = SECURITY_LIMITS.userDailyLimit;
  const globalCap = SECURITY_LIMITS.globalDailyCap;

  if (counts.globalCount >= globalCap) {
    counterStorage.recordError('global_cap_reached');
    return new Response(
      JSON.stringify({
        error: 'GLOBAL_CAP_REACHED',
        message: 'Story creation is paused for today, please come back tomorrow.'
      }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const maxUserUsed = Math.max(counts.userCount, counts.ipCount);
  if (maxUserUsed >= userLimit) {
    counterStorage.recordError('daily_limit_reached');
    return new Response(
      JSON.stringify({
        error: 'DAILY_LIMIT_REACHED',
        message: `You have reached your limit of ${userLimit} stories for today. Please come back tomorrow!`
      }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const step = body.step || 'full';
  const topic = typeof body.topic === 'string' ? body.topic.trim().slice(0, SECURITY_LIMITS.maxTopicLength) : '';
  const level = SECURITY_LIMITS.allowedLevels.includes(body.level) ? body.level : 'A2';
  const length = SECURITY_LIMITS.allowedLengths.includes(body.length) ? body.length : 'medium';
  const style = SECURITY_LIMITS.allowedStyles.includes(body.style) ? body.style : 'casual';
  const grammarFocus = SECURITY_LIMITS.allowedGrammar.includes(body.grammarFocus) ? body.grammarFocus : 'none';

  const userWords = Array.isArray(body.userWords)
    ? body.userWords
        .filter((w: any) => typeof w === 'string' && w.trim().length > 0)
        .slice(0, SECURITY_LIMITS.maxMyWords)
        .map((w: string) => w.trim().slice(0, SECURITY_LIMITS.maxWordLength))
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
      return new Response(JSON.stringify({ step: 'draft', draft }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (step === 'vocab') {
      const paragraphs = Array.isArray(body.paragraphs) ? body.paragraphs : [];
      if (paragraphs.length === 0) {
        return new Response(
          JSON.stringify({ error: 'INVALID_INPUT', message: 'Paragraphs required.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      const vocabulary = await generateVocabulary(paragraphs, body.tokens);
      counterStorage.increment(userId, ip);
      return new Response(JSON.stringify({ step: 'vocab', vocabulary }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const draft = await generateDraft({
      topic,
      level,
      length,
      style,
      grammarFocus: grammarFocus !== 'none' ? grammarFocus : undefined,
      userWords
    });

    const vocabulary = await generateVocabulary(draft.paragraphs, draft.tokens);
    counterStorage.increment(userId, ip);

    return new Response(
      JSON.stringify({
        title: draft.title,
        subtitle: draft.subtitle,
        topic: draft.topic,
        paragraphs: draft.paragraphs,
        paragraphTranslations: draft.paragraphTranslations,
        quiz: draft.quiz,
        vocabulary
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    const errorType = err instanceof ServiceError ? err.code : 'UNKNOWN_ERROR';
    counterStorage.recordError(errorType);

    if (err instanceof ServiceError) {
      return new Response(
        JSON.stringify({ error: err.code, message: err.message }),
        { status: err.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'SERVER_ERROR', message: 'Story creation encountered an error.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
