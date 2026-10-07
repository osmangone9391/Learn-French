/**
 * Optional Cloudflare Turnstile Bot Protection
 * 
 * Disabled by default. Activated if TURNSTILE_SECRET_KEY environment variable is provided.
 */

export async function verifyTurnstileToken(token: string | undefined, remoteIp?: string): Promise<{ success: boolean; error?: string }> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  
  // If not configured, Turnstile check is disabled
  if (!secretKey || !secretKey.trim()) {
    return { success: true };
  }

  if (!token || !token.trim()) {
    return { success: false, error: 'Bot verification token is missing' };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey.trim());
    formData.append('response', token.trim());
    if (remoteIp) {
      formData.append('remoteip', remoteIp);
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const data: any = await response.json();
    if (data.success) {
      return { success: true };
    }

    return {
      success: false,
      error: `Turnstile verification failed: ${(data['error-codes'] || []).join(', ')}`
    };
  } catch (err: any) {
    console.error('[Turnstile] Verification request error:', err);
    return { success: false, error: 'Could not connect to bot verification service' };
  }
}
