"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogoMark } from "@/components/logo";
import type { AdminSnapshot } from "@/lib/admin-db";

function fmtNumber(n: number) {
  return n.toLocaleString("en-NG");
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("en-NG", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Sparkline({ data }: { data: { day: string; count: number }[] }) {
  if (!data.length) return null;
  const W = 600;
  const H = 140;
  const padX = 8;
  const padY = 16;
  const max = Math.max(1, ...data.map((d) => d.count));
  const step = (W - padX * 2) / Math.max(1, data.length - 1);
  const points = data.map((d, i) => {
    const x = padX + i * step;
    const y = padY + (H - padY * 2) * (1 - d.count / max);
    return { x, y, d };
  });
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const areaPath = `${path} L ${points[points.length - 1].x} ${H - padY} L ${points[0].x} ${H - padY} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-36 w-full">
      <defs>
        <linearGradient id="sparkArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F2A93B" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#F2A93B" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#sparkArea)" />
      <path d={path} fill="none" stroke="#F2A93B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i === points.length - 1 ? 3.5 : 2.4} fill="#F2A93B" />
      ))}
      {/* baseline */}
      <line x1={padX} y1={H - padY} x2={W - padX} y2={H - padY} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    </svg>
  );
}

function Stat({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend?: { value: number; direction: "up" | "down" | "flat" };
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-white">{value}</p>
      {trend && (
        <p
          className={`mt-1 text-xs font-medium ${
            trend.direction === "up"
              ? "text-emerald-300"
              : trend.direction === "down"
                ? "text-rose-300"
                : "text-white/55"
          }`}
        >
          {trend.direction === "up" ? "↑" : trend.direction === "down" ? "↓" : "—"}{" "}
          {trend.value > 0 ? "+" : ""}
          {trend.value}% vs last 7d
        </p>
      )}
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [snap, setSnap] = useState<AdminSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [signingOut, setSigningOut] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/signups", { cache: "no-store" });
      const data = (await res.json()) as { ok: boolean; snapshot?: AdminSnapshot; error?: string };
      if (!res.ok || !data.ok || !data.snapshot) {
        if (res.status === 401) {
          router.replace("/admin/login");
          return;
        }
        setError(data.error ?? "Failed to load.");
      } else {
        setSnap(data.snapshot);
      }
    } catch {
      setError("Network failed.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function signOut() {
    if (signingOut) return;
    setSigningOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  function exportCsv() {
    if (!snap) return;
    const header = ["id", "name", "city", "email", "created_at"];
    const rows = snap.rows.map((r) =>
      [r.id, r.name ?? "", r.city ?? "", r.email, r.created_at]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    );
    const blob = new Blob([header.join(",") + "\n" + rows.join("\n")], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `moveasy-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = snap?.rows.filter((r) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      r.email.toLowerCase().includes(q) ||
      (r.name ?? "").toLowerCase().includes(q) ||
      (r.city ?? "").toLowerCase().includes(q)
    );
  }) ?? [];

  return (
    <main className="min-h-screen bg-navy-900 text-white">
      <header className="border-b border-white/8 bg-navy-900/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-2">
            <LogoMark className="h-7 w-7" />
            <div className="leading-tight">
              <p className="text-sm font-semibold">Moveasy admin</p>
              <p className="text-[11px] text-white/55">Waitlist overview</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={load}
              className="rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              Refresh
            </button>
            <button
              onClick={exportCsv}
              disabled={!snap}
              className="rounded-full bg-accent px-3.5 py-1.5 text-xs font-medium text-ink transition hover:bg-accent/85 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Export CSV
            </button>
            <button
              onClick={signOut}
              className="rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              {signingOut ? "Signing out…" : "Sign out"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        {error && (
          <div className="mb-6 rounded-2xl border border-rose-400/30 bg-rose-500/10 p-5 text-sm text-rose-100">
            {error}
          </div>
        )}

        {loading && !snap && (
          <p className="text-white/65">Loading…</p>
        )}

        {snap && (
          <>
            {/* KPIs */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Stat
                label="Total signups"
                value={fmtNumber(snap.total)}
                trend={{
                  value: snap.growthPct,
                  direction:
                    snap.growthPct > 0.5 ? "up" : snap.growthPct < -0.5 ? "down" : "flat",
                }}
              />
              <Stat label="Today" value={fmtNumber(snap.today)} />
              <Stat label="Last 7 days" value={fmtNumber(snap.last7Days)} />
              <Stat label="Last 30 days" value={fmtNumber(snap.last30Days)} />
            </div>

            {/* Chart + cities */}
            <div className="mt-6 grid gap-4 lg:grid-cols-[1.6fr,1fr]">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                      Signups per day
                    </p>
                    <p className="mt-1 text-sm text-white/70">Last 14 days</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold">
                      {fmtNumber(snap.growth.reduce((a, b) => a + b.count, 0))}
                    </p>
                    <p className="text-xs text-white/55">total in window</p>
                  </div>
                </div>
                <div className="mt-3">
                  <Sparkline data={snap.growth} />
                </div>
                <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-white/45">
                  <span>{snap.growth[0]?.day.slice(5)}</span>
                  <span>{snap.growth[snap.growth.length - 1]?.day.slice(5)}</span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                  Top cities
                </p>
                <ul className="mt-4 space-y-2.5">
                  {snap.byCity.length === 0 && (
                    <li className="text-sm text-white/55">No data yet.</li>
                  )}
                  {snap.byCity.map((c) => {
                    const max = Math.max(1, snap.byCity[0].count);
                    const pct = (c.count / max) * 100;
                    return (
                      <li key={`${c.city ?? "none"}`}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-white">
                            {c.city ?? <span className="text-white/55">Unspecified</span>}
                          </span>
                          <span className="text-white/55">{c.count}</span>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/8">
                          <div
                            className="h-full rounded-full bg-accent"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Table */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div className="flex flex-col gap-3 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                    Recent signups
                  </p>
                  <p className="mt-1 text-sm text-white/70">
                    {fmtNumber(filtered.length)} of {fmtNumber(snap.rows.length)} shown
                  </p>
                </div>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Filter by name, city, or email"
                  className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/45 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/15 sm:w-72"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/8 text-left text-[10px] uppercase tracking-[0.18em] text-white/45">
                      <th className="px-4 py-3 font-semibold">Name</th>
                      <th className="px-4 py-3 font-semibold">City</th>
                      <th className="px-4 py-3 font-semibold">Email</th>
                      <th className="px-4 py-3 font-semibold text-right">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r) => (
                      <tr
                        key={r.id}
                        className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.03]"
                      >
                        <td className="px-4 py-3 text-white">
                          {r.name ?? <span className="text-white/45">—</span>}
                        </td>
                        <td className="px-4 py-3 text-white/80">
                          {r.city ?? <span className="text-white/45">—</span>}
                        </td>
                        <td className="px-4 py-3 text-white/80">{r.email}</td>
                        <td className="px-4 py-3 text-right text-white/65">
                          {fmtDate(r.created_at)}
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-4 py-10 text-center text-white/55">
                          No signups match that filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
