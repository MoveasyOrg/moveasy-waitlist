import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_COOKIE,
  adminConfigured,
  checkPassword,
  makeSession,
  sessionCookieOptions,
} from "@/lib/admin-auth";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientKey(req: NextRequest) {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0].trim() : "anonymous";
}

export async function POST(req: NextRequest) {
  if (!adminConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Admin is not configured. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET.",
      },
      { status: 503 },
    );
  }

  // Cheap brute-force guard
  const limit = rateLimit(`admin-login:${clientKey(req)}`);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again shortly." },
      { status: 429 },
    );
  }

  let body: { password?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const provided = typeof body.password === "string" ? body.password : "";
  if (!checkPassword(provided)) {
    // Tarpit just enough to discourage scripted guessing
    await new Promise((r) => setTimeout(r, 350));
    return NextResponse.json(
      { ok: false, error: "Wrong password." },
      { status: 401 },
    );
  }

  const token = await makeSession();
  if (!token) {
    return NextResponse.json(
      { ok: false, error: "Server session secret is missing." },
      { status: 503 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, sessionCookieOptions);
  return res;
}
