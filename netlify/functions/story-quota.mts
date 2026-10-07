interface NetlifyContext {
  ip?: string;
  [key: string]: any;
}
import { SECURITY_LIMITS } from '../../server/config';
import { counterStorage } from '../../server/storage';

export default async (req: Request, context: NetlifyContext) => {
  const enabled = SECURITY_LIMITS.isAiStoriesEnabled;
  if (!enabled) {
    return new Response(
      JSON.stringify({
        enabled: false,
        userRemaining: 0,
        userLimit: SECURITY_LIMITS.userDailyLimit,
        globalRemaining: 0,
        globalCap: SECURITY_LIMITS.globalDailyCap,
        globalPaused: false,
        message: 'Story creation is temporarily unavailable.'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const url = new URL(req.url);
  const userId = url.searchParams.get('userId')?.trim() || 'anonymous';
  const ip = context.ip || '127.0.0.1';
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

  return new Response(
    JSON.stringify({
      enabled: true,
      userRemaining,
      userLimit,
      globalRemaining,
      globalCap,
      globalPaused,
      message
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
