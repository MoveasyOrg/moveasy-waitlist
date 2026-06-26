type Bucket = { count: number; resetAt: number };

const store = new Map<string, Bucket>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

export function rateLimit(key: string): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const bucket = store.get(key);
  if (!bucket || bucket.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, retryAfter: 0 };
  }
  if (bucket.count >= MAX_REQUESTS) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  bucket.count += 1;
  return { ok: true, retryAfter: 0 };
}
