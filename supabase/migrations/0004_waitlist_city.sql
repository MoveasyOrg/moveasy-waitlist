-- Capture city/state on the waitlist so we can prioritise rollout by demand.

alter table public.waitlist
  add column if not exists city text;
