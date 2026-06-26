import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { getSupabase, hasServiceRole } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";
import { isValidEmail, normalizeEmail } from "@/lib/utils";

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

  const sb = getSupabase();
  if (sb) {
    const { error } = await sb
      .from("waitlist")
      .insert({ email, ip_hash: key, user_agent: ua, referer });

    if (error) {
      const isDupe =
        error.code === "23505" ||
        /duplicate/i.test(error.message ?? "");
      if (!isDupe) {
        return NextResponse.json(
          { ok: false, error: "Could not save your signup." },
          { status: 500 },
        );
      }
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (resendKey && from) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from,
        to: email,
        subject: "You're on the Moveasy waitlist",
        html: `
          <div style="font-family:Inter,system-ui,sans-serif;color:#0B123B;max-width:480px;margin:auto;padding:24px">
            <h1 style="font-size:20px;margin:0 0 12px">Welcome to Moveasy.</h1>
            <p style="font-size:15px;line-height:1.5;color:#3a4063;margin:0 0 16px">
              You're on the list for the WhatsApp-native way to move around Nigeria.
              We start in Awka, then roll across the country.
            </p>
            <p style="font-size:15px;line-height:1.5;color:#3a4063;margin:0 0 16px">
              When we open up your city, you'll be the first to know.
            </p>
            <p style="font-size:13px;color:#7a7f9c;margin-top:24px">
              Born in Akwa. Built for Africa.
            </p>
          </div>
        `,
      });
    } catch {
      // Confirmation email is best-effort. Signup still counts.
    }
  }

  return NextResponse.json({ ok: true, count: await currentCount() });
}
