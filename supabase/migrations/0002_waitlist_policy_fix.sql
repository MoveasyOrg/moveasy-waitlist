-- The newer sb_publishable_* keys map through the public role.
-- Widen the insert policy so unauthenticated visitors can submit.

drop policy if exists "anon can insert waitlist" on public.waitlist;

create policy "public can insert waitlist"
  on public.waitlist
  for insert
  to public
  with check (true);
