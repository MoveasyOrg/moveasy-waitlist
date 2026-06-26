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
| `RESEND_API_KEY` | optional | Skip if you want signups without confirmation email |
| `RESEND_FROM_EMAIL` | optional | Verified sender, e.g. `Moveasy <hello@moveasy.africa>` |

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
- `POST /api/waitlist` Email signup, rate limited per IP
- `GET /api/waitlist` Live count
- `/sitemap.xml`, `/robots.txt`
- `/opengraph-image` (auto-generated)

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
