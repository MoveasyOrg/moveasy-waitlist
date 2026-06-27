import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { getSupabase, hasServiceRole } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";
import {
  firstName,
  isValidEmail,
  normalizeCity,
  normalizeEmail,
  normalizeName,
} from "@/lib/utils";
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

  let body: { email?: unknown; name?: unknown; city?: unknown } = {};
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
  const rawName = typeof body.name === "string" ? body.name : "";
  const name = normalizeName(rawName) || null;
  const rawCity = typeof body.city === "string" ? body.city : "";
  const city = normalizeCity(rawCity) || null;
  const ua = req.headers.get("user-agent") ?? null;
  const referer = req.headers.get("referer") ?? null;

  let duplicate = false;
  let storedName: string | null = name;

  const sb = getSupabase();
  if (sb) {
    const { error } = await sb
      .from("waitlist")
      .insert({ email, name, city, ip_hash: key, user_agent: ua, referer });

    if (error) {
      const isDupe =
        error.code === "23505" ||
        /duplicate/i.test(error.message ?? "");
      if (isDupe) {
        duplicate = true;
        // Look up the existing name so the toast / email can use it.
        if (hasServiceRole()) {
          const { data } = await sb
            .from("waitlist")
            .select("name")
            .eq("email", email)
            .maybeSingle();
          if (data?.name) storedName = data.name;
        }
      } else {
        console.error("[waitlist] insert error", error);
        return NextResponse.json(
          { ok: false, error: "Could not save your signup." },
          { status: 500 },
        );
      }
    }
  }

  const greet = firstName(storedName);

  // Send the welcome email on a fresh signup only — don't spam duplicates.
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL ?? "Moveasy <onboarding@resend.dev>";
  if (resendKey && !duplicate) {
    try {
      const resend = new Resend(resendKey);
      const result = await resend.emails.send({
        from,
        to: email,
        subject: greet ? `Welcome to Moveasy, ${greet}` : "You're on the Moveasy waitlist",
        html: welcomeEmailHtml(greet),
        text: welcomeEmailText(greet),
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
    firstName: greet,
    count: await currentCount(),
  });
}
