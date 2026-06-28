-- Allow public partner-interest submissions (same pattern as waitlist).

drop policy if exists "public can insert partner_leads" on public.partner_leads;

create policy "public can insert partner_leads"
  on public.partner_leads
  for insert
  to public
  with check (true);
