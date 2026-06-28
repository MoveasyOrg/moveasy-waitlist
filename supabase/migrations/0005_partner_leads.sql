create table if not exists public.partner_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  role text,
  message text,
  ip_hash text,
  created_at timestamptz not null default now()
);

create index if not exists partner_leads_created_at_idx on public.partner_leads (created_at desc);
alter table public.partner_leads enable row level security;
