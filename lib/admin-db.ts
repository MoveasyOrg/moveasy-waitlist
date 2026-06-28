import { Pool } from "pg";

let pool: Pool | null = null;

function getPool(): Pool | null {
  if (pool) return pool;
  const url = process.env.SUPABASE_DB_URL;
  if (!url) return null;
  pool = new Pool({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
    max: 2,
    idleTimeoutMillis: 30_000,
  });
  return pool;
}

export type Signup = {
  id: string;
  email: string;
  name: string | null;
  city: string | null;
  created_at: string;
};

export type PartnerLead = {
  id: string;
  email: string;
  name: string | null;
  role: string | null;
  message: string | null;
  created_at: string;
};

export type DailyPoint = { day: string; count: number };
export type CityPoint = { city: string | null; count: number };

export type AdminSnapshot = {
  total: number;
  today: number;
  last7Days: number;
  last30Days: number;
  growth: DailyPoint[];
  byCity: CityPoint[];
  rows: Signup[];
  growthPct: number;
  partnerTotal: number;
  partners: PartnerLead[];
};

export async function loadAdminSnapshot(): Promise<AdminSnapshot | null> {
  const p = getPool();
  if (!p) return null;

  const [totalRes, todayRes, week1Res, week2Res, month1Res, growthRes, byCityRes, rowsRes] =
    await Promise.all([
      p.query<{ count: string }>("select count(*)::text as count from public.waitlist"),
      p.query<{ count: string }>(
        "select count(*)::text as count from public.waitlist where created_at >= date_trunc('day', now())",
      ),
      p.query<{ count: string }>(
        "select count(*)::text as count from public.waitlist where created_at >= now() - interval '7 days'",
      ),
      p.query<{ count: string }>(
        "select count(*)::text as count from public.waitlist where created_at >= now() - interval '14 days' and created_at < now() - interval '7 days'",
      ),
      p.query<{ count: string }>(
        "select count(*)::text as count from public.waitlist where created_at >= now() - interval '30 days'",
      ),
      p.query<{ day: string; count: string }>(
        `with days as (
           select generate_series(date_trunc('day', now() - interval '13 days'), date_trunc('day', now()), interval '1 day') as day
         )
         select to_char(d.day, 'YYYY-MM-DD') as day, coalesce(count(w.id), 0)::text as count
         from days d
         left join public.waitlist w
           on date_trunc('day', w.created_at) = d.day
         group by d.day
         order by d.day asc`,
      ),
      p.query<{ city: string | null; count: string }>(
        `select city, count(*)::text as count
         from public.waitlist
         group by city
         order by count(*) desc nulls last
         limit 10`,
      ),
      p.query<Signup>(
        `select id::text as id, email, name, city, created_at
         from public.waitlist
         order by created_at desc
         limit 500`,
      ),
    ]);

  let partnerTotal = 0;
  let partners: PartnerLead[] = [];
  try {
    const [partnerTotalRes, partnersRes] = await Promise.all([
      p.query<{ count: string }>("select count(*)::text as count from public.partner_leads"),
      p.query<PartnerLead>(
        `select id::text as id, email, name, role, message, created_at
         from public.partner_leads
         order by created_at desc
         limit 500`,
      ),
    ]);
    partnerTotal = Number(partnerTotalRes.rows[0]?.count ?? "0");
    partners = partnersRes.rows;
  } catch (err) {
    console.error("[admin] partner_leads query failed", err);
  }

  const total = Number(totalRes.rows[0]?.count ?? "0");
  const today = Number(todayRes.rows[0]?.count ?? "0");
  const week1 = Number(week1Res.rows[0]?.count ?? "0");
  const week2 = Number(week2Res.rows[0]?.count ?? "0");
  const month1 = Number(month1Res.rows[0]?.count ?? "0");
  const growthPct = week2 === 0 ? (week1 > 0 ? 100 : 0) : ((week1 - week2) / week2) * 100;

  return {
    total,
    today,
    last7Days: week1,
    last30Days: month1,
    growth: growthRes.rows.map((r) => ({ day: r.day, count: Number(r.count) })),
    byCity: byCityRes.rows.map((r) => ({ city: r.city, count: Number(r.count) })),
    rows: rowsRes.rows,
    growthPct: Math.round(growthPct * 10) / 10,
    partnerTotal,
    partners,
  };
}
