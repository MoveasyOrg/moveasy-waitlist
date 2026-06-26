-- Moveasy waitlist table.
-- Inserts are public (anon key allowed); reads require service role.

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  ip_hash text,
  user_agent text,
  referer text,
  created_at timestamptz not null default now()
);

create index if not exists waitlist_created_at_idx
  on public.waitlist (created_at desc);

alter table public.waitlist enable row level security;

drop policy if exists "anon can insert waitlist" on public.waitlist;
create policy "anon can insert waitlist"
  on public.waitlist
  for insert
  to anon, authenticated
  with check (true);

-- No select policy is created on purpose. Reads happen via service role
-- in the server route, so the list is never client-readable.
