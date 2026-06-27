import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { getSupabase, hasServiceRole } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";
import { isValidEmail, normalizeEmail } from "@/lib/utils";
import { welcomeEmailHtml, welcomeEmailText } from "@/lib/emails";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientKey(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0].trim() : "anonymous";
}

async function currentCount(): Promise<number> {
  const baseline = Number(process.env.NEXT_PUBLIC_WAITLIST_BASELINE ?? "128");
  const sb = getSupabase();
  // Counting rows requires bypassing RLS; only the service role can do that.
  if (!sb || !hasServiceRole()) return baseline;
  const { count } = await sb
    .from("waitlist")
    .select("*", { count: "exact", head: true });
  return Math.max(baseline, count ?? 0);
}

export async function GET() {
  return NextResponse.json({ ok: true, count: await currentCount() });
}

export async function POST(req: NextRequest) {
  const key = clientKey(req);
  const limit = rateLimit(key);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body: { email?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (typeof body.email !== "string" || !isValidEmail(body.email)) {
    return NextResponse.json(
      { ok: false, error: "Use a valid email address." },
      { status: 400 },
    );
  }

  const email = normalizeEmail(body.email);
  const ua = req.headers.get("user-agent") ?? null;
  const referer = req.headers.get("referer") ?? null;

  let duplicate = false;
  const sb = getSupabase();
  if (sb) {
    const { error } = await sb
      .from("waitlist")
      .insert({ email, ip_hash: key, user_agent: ua, referer });

    if (error) {
      const isDupe =
        error.code === "23505" ||
        /duplicate/i.test(error.message ?? "");
      if (isDupe) {
        duplicate = true;
      } else {
        return NextResponse.json(
          { ok: false, error: "Could not save your signup." },
          { status: 500 },
        );
      }
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (resendKey && from && !duplicate) {
    try {
      const resend = new Resend(resendKey);
      const result = await resend.emails.send({
        from,
        to: email,
        subject: "You're on the Moveasy waitlist",
        html: welcomeEmailHtml(),
        text: welcomeEmailText(),
      });
      if (result.error) {
        console.error("[waitlist] resend send error", result.error);
      }
    } catch (err) {
      console.error("[waitlist] resend threw", err);
    }
  }

  return NextResponse.json({
    ok: true,
    duplicate,
    count: await currentCount(),
  });
}
