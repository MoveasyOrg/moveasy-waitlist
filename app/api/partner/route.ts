import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";
import { rateLimit } from "@/lib/rate-limit";
import { isValidEmail, normalizeEmail, normalizeName } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clientKey(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd ? fwd.split(",")[0].trim() : "anonymous";
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

  let body: { name?: unknown; email?: unknown; role?: unknown; message?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (typeof body.email !== "string" || !isValidEmail(body.email)) {
    return NextResponse.json({ ok: false, error: "Valid email required." }, { status: 400 });
  }

  const email = normalizeEmail(body.email);
  const name = normalizeName(typeof body.name === "string" ? body.name : "") || null;
  const role = typeof body.role === "string" ? body.role : "Other";
  const message = typeof body.message === "string" ? body.message.slice(0, 2000) : null;

  const sb = getSupabase();
  if (sb) {
    const { error } = await sb.from("partner_leads").insert({
      email,
      name,
      role,
      message,
      ip_hash: key,
    });
    if (error) {
      console.error("[partner] supabase insert error", error);
      return NextResponse.json(
        { ok: false, error: "Could not save your interest. Try again." },
        { status: 500 },
      );
    }
  }

  // Email the team
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "Moveasy <onboarding@resend.dev>",
        to: "moveasyhq@gmail.com",
        subject: `New early partner interest: ${role}`,
        text: [
          "New early access lead",
          "",
          `Name: ${name || "(not provided)"}`,
          `Email: ${email}`,
          `Role: ${role}`,
          message ? `Message: ${message}` : "",
          "",
          `Source: ${req.headers.get("referer") || "direct"}`,
        ].join("\n"),
      });
    } catch (e) {
      console.error("[partner] resend failed", e);
    }
  }

  return NextResponse.json({ ok: true });
}
