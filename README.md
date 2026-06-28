# Moveasy Waitlist

WhatsApp-native ride-hailing for Nigeria. Born in Akwa. Built for Africa.

This is the public waitlist landing for [moveasy.africa](https://moveasy.africa).

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + custom navy/accent token system
- Framer Motion for selection-box reveal, counter, and viewport entries
- Supabase (server-side) for the waitlist table
- Resend for confirmation email
- Vercel hosting + edge OG image

## Local setup

```bash
pnpm install   # or npm / yarn / bun
cp .env.example .env.local
pnpm dev
```

Open http://localhost:3000.

## Env vars

| Key | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical URL for metadata, sitemap, robots |
| `NEXT_PUBLIC_WAITLIST_BASELINE` | no | Floor for the social-proof counter |
| `NEXT_PUBLIC_LAUNCH_AT` | yes | ISO timestamp the countdown reads from |
| `SUPABASE_URL` | yes (prod) | Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | yes (prod) | Server-only key for inserts |
| `RESEND_API_KEY` | optional | Resend API key (`re_...`). Skip and signups still work, they just don't get a welcome email |
| `RESEND_FROM_EMAIL` | optional | Verified sender, e.g. `Moveasy <hello@moveasy.africa>` |

### Resend setup

The welcome email is sent via [Resend](https://resend.com) when a signup lands. To enable it:

1. Create an account at [resend.com](https://resend.com) and grab an API key from [resend.com/api-keys](https://resend.com/api-keys) — the format is `re_...`.
2. Add and verify your sending domain at [resend.com/domains](https://resend.com/domains). DNS records (SPF, DKIM) need to be set on `moveasy.africa`. Until the domain is verified, Resend can only deliver to the address you signed up with — useful for testing.
3. Set `RESEND_FROM_EMAIL` to a sender on the verified domain, e.g. `Moveasy <hello@moveasy.africa>`.
4. Set `RESEND_API_KEY` to the key from step 1.

The email template lives at [`lib/emails.ts`](lib/emails.ts) and is on-brand DM Sans + navy/accent. If Resend rejects the send (unverified domain, rate limit, bad key) the API logs the error to the server console and the signup still succeeds.

If Supabase is not configured, the API still validates and accepts signups but does not persist them. Useful for local dev.

## Supabase table

```sql
create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  ip_hash text,
  user_agent text,
  referer text,
  created_at timestamptz not null default now()
);

create index on public.waitlist (created_at desc);
alter table public.waitlist enable row level security;
-- Inserts happen via service role from the API route.
```

## Routes

- `/` Landing page
- `/about`, `/faqs`, `/privacy`, `/terms` Info pages
- `/admin` Waitlist dashboard (password gated)
- `/admin/login` Admin sign-in
- `POST /api/waitlist` Email signup, rate limited per IP
- `GET /api/waitlist` Live count
- `POST /api/admin/login` / `POST /api/admin/logout` / `GET /api/admin/signups`
- `/sitemap.xml`, `/robots.txt`
- `/opengraph-image` (auto-generated)

## Admin dashboard

Visit `/admin`. The route is gated by `middleware.ts` — without a valid session cookie you're redirected to `/admin/login`.

To enable it, set two env vars on Vercel and locally:

```bash
ADMIN_PASSWORD="something-long-and-random"
ADMIN_SESSION_SECRET="$(node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))")"
```

The dashboard shows:
- Total / today / last 7 days / last 30 days signup counts
- 7-day growth vs the previous 7-day window
- A 14-day daily signups sparkline
- Top 10 cities
- A searchable, exportable table of every signup (name, city, email, joined)

CSV export is one click. The route uses `SUPABASE_DB_URL` (the pooler URL) to read directly from Postgres, so it works even without the service role key.

## Deploy

```bash
vercel link
vercel env add NEXT_PUBLIC_SITE_URL
vercel env add SUPABASE_URL
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add RESEND_API_KEY
vercel env add RESEND_FROM_EMAIL
vercel env add NEXT_PUBLIC_LAUNCH_AT
vercel --prod
```

## Brand

- Navy `#1B2A8F`, deep navy `#0B123B`
- Accent warm orange `#F2A93B` (CTA hover, pin live state, eyebrow text)
- Paper `#FAFAF7` (light sections)
- WhatsApp green `#25D366` (demo strip only)
- Display: Instrument Serif (italic), Body: Inter

Tagline: **Movement Made Easy**.

## Performance budget

- First load JS under 250 kB excluding fonts
- Lighthouse mobile target 95+
- Renders correctly at 360 px width (target Android Chrome)
