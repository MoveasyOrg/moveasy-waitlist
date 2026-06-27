/**
 * Welcome email sent via Resend right after a successful waitlist signup.
 * Styled inline so it renders consistently across email clients.
 */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://trymoveasy.vercel.app";

const NAVY = "#0B123B";
const NAVY_DEEP = "#060920";
const ACCENT = "#F2A93B";
const PAPER = "#FAFAF7";

export function welcomeEmailHtml(firstName?: string | null): string {
  const hi = firstName ? `Hi ${escapeHtml(firstName)},` : "Hi,";
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta name="color-scheme" content="dark light" />
    <title>Welcome to Moveasy</title>
  </head>
  <body style="margin:0;padding:0;background:${NAVY_DEEP};font-family:'DM Sans',Inter,system-ui,-apple-system,Segoe UI,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:${NAVY};padding:0;color:#ffffff;">

      <!-- Header band -->
      <div style="background:linear-gradient(135deg,#4351B0 0%,${NAVY} 60%,${NAVY_DEEP} 100%);padding:36px 32px 48px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="display:inline-block;width:32px;height:32px;border-radius:8px;background:${ACCENT};color:${NAVY};text-align:center;font-size:18px;font-weight:700;line-height:32px;">M</span>
          <span style="font-size:18px;font-weight:600;letter-spacing:-0.01em;">Moveasy</span>
        </div>
        <h1 style="margin:28px 0 0;font-size:28px;line-height:1.15;letter-spacing:-0.02em;color:#ffffff;font-weight:600;">
          You're on the list.
        </h1>
        <p style="margin:10px 0 0;font-size:15px;line-height:1.55;color:rgba(255,255,255,0.7);">
          Movement Made Easy. Born in Akwa, built for Africa.
        </p>
      </div>

      <!-- Body -->
      <div style="padding:32px 32px 8px;">
        <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:rgba(255,255,255,0.85);">
          ${hi}
        </p>
        <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:rgba(255,255,255,0.85);">
          Thanks for signing up. You're now in line for the WhatsApp-native way to move around Nigeria.
        </p>
        <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:rgba(255,255,255,0.85);">
          We're starting in <strong style="color:#ffffff;">Awka, Anambra</strong>, then rolling out to Lagos, Abuja, Port Harcourt, and Kano. The day we open up your city, you'll be the first to know.
        </p>
        <p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:rgba(255,255,255,0.85);">
          Until then, no app to install. No data plan to burn.
        </p>

        <!-- CTA -->
        <a href="${SITE_URL}" style="display:inline-block;background:${PAPER};color:${NAVY};padding:12px 20px;border-radius:9999px;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:-0.01em;">
          Visit Moveasy
        </a>
      </div>

      <!-- Footer -->
      <div style="padding:32px;border-top:1px solid rgba(255,255,255,0.08);margin-top:24px;">
        <p style="margin:0 0 8px;font-size:12px;color:rgba(255,255,255,0.55);">
          Questions? Reply to this email or write to
          <a href="mailto:moveasyhq@gmail.com" style="color:${ACCENT};text-decoration:none;">moveasyhq@gmail.com</a>.
        </p>
        <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.4);">
          Moveasy &middot; Awka, Nigeria
        </p>
      </div>

    </div>
  </body>
</html>`;
}

export function welcomeEmailText(firstName?: string | null): string {
  const hi = firstName ? `Hi ${firstName},` : "Hi,";
  return [
    "You're on the list.",
    "",
    hi,
    "",
    "Thanks for signing up to Moveasy. You're in line for the WhatsApp-native way to move around Nigeria.",
    "",
    "We're starting in Awka, Anambra, then rolling out to Lagos, Abuja, Port Harcourt, and Kano. The day we open up your city, you'll be the first to know.",
    "",
    "Until then, no app to install. No data plan to burn.",
    "",
    `Visit ${SITE_URL}`,
    "",
    "Questions? Reply to this email or write to moveasyhq@gmail.com.",
    "",
    "Moveasy — Awka, Nigeria",
  ].join("\n");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
