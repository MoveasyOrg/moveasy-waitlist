/**
 * Lightweight HMAC-signed session cookies for the single-admin dashboard.
 * Uses Web Crypto so it runs in both the Node runtime (API routes) and
 * the edge runtime (middleware).
 */

export const ADMIN_COOKIE = "moveasy_admin";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function enc(s: string) {
  return new TextEncoder().encode(s);
}

function base64url(arr: ArrayBuffer | Uint8Array) {
  const bytes = arr instanceof Uint8Array ? arr : new Uint8Array(arr);
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function hmac(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc(data));
  return base64url(new Uint8Array(sig));
}

function secret(): string | null {
  const s = process.env.ADMIN_SESSION_SECRET;
  return s && s.length >= 16 ? s : null;
}

export async function makeSession(): Promise<string | null> {
  const sec = secret();
  if (!sec) return null;
  const exp = Date.now() + SESSION_TTL_MS;
  const payload = `${exp}`;
  const sig = await hmac(sec, payload);
  return `${payload}.${sig}`;
}

export async function verifySession(cookie: string | undefined | null): Promise<boolean> {
  if (!cookie) return false;
  const sec = secret();
  if (!sec) return false;
  const dot = cookie.indexOf(".");
  if (dot < 1) return false;
  const exp = cookie.slice(0, dot);
  const sig = cookie.slice(dot + 1);
  const expected = await hmac(sec, exp);
  if (sig !== expected) return false;
  const ts = Number(exp);
  if (!Number.isFinite(ts) || ts < Date.now()) return false;
  return true;
}

/** Timing-safe password comparison (constant-time over the longest of the two). */
export function checkPassword(provided: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected) return false;
  if (provided.length !== expected.length) {
    // Still walk both strings to keep timing consistent.
    let diff = provided.length ^ expected.length;
    for (let i = 0; i < Math.max(provided.length, expected.length); i++) {
      diff |= (provided.charCodeAt(i) || 0) ^ (expected.charCodeAt(i) || 0);
    }
    return diff === 0;
  }
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return diff === 0;
}

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && secret());
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_TTL_MS / 1000,
};
