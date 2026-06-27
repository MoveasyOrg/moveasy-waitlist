-- Capture first name on the waitlist so welcome emails can be personalised.

alter table public.waitlist
  add column if not exists name text;
