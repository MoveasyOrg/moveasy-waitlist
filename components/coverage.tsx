"use client";

import { motion } from "framer-motion";

type Pin = {
  city: string;
  state: string;
  phase: "Live" | "Q2" | "Q3" | "Q4" | "2027";
  x: number;
  y: number;
};

const pins: Pin[] = [
  { city: "Awka", state: "Anambra", phase: "Live", x: 55, y: 58 },
  { city: "Lagos", state: "Lagos", phase: "Q2", x: 34, y: 62 },
  { city: "Abuja", state: "FCT", phase: "Q3", x: 58, y: 40 },
  { city: "Port Harcourt", state: "Rivers", phase: "Q4", x: 60, y: 78 },
  { city: "Kano", state: "Kano", phase: "2027", x: 60, y: 18 },
];

const phaseColor: Record<Pin["phase"], string> = {
  Live: "bg-accent text-ink",
  Q2: "bg-white/80 text-navy",
  Q3: "bg-white/60 text-navy",
  Q4: "bg-white/40 text-navy",
  "2027": "bg-white/25 text-white",
};

const stats: { label: string; value: string }[] = [
  { label: "Cities planned", value: "5" },
  { label: "Live in", value: "Awka" },
  { label: "Next up", value: "Lagos · Q2" },
];

export function Coverage() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 sm:py-28">
      <div aria-hidden className="absolute inset-0 grid-floor opacity-50" />
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.24em] text-accent">
            Coverage roadmap
          </p>
          <h2 className="mt-3 text-balance text-3xl font-medium leading-tight text-white sm:text-4xl">
            Anambra first. Then the rest.
          </h2>
          <p className="mt-3 text-pretty text-white/65">
            We&rsquo;re going city by city. Real roads, real driver coverage,
            real support before we plant a flag.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr,1fr] lg:items-stretch">
          {/* Map */}
          <div className="glass-dark relative aspect-[4/5] overflow-hidden rounded-3xl p-4 shadow-glass lg:aspect-auto">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
              <path
                d="M22 35 L36 22 L62 18 L82 28 L86 52 L78 78 L60 88 L34 84 L20 70 Z"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="0.4"
                strokeDasharray="1 1.2"
              />
            </svg>
            {pins.map((p, i) => (
              <motion.div
                key={p.city}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                className="absolute"
                style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%,-100%)" }}
              >
                <div className="flex flex-col items-center">
                  <span
                    className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium ${phaseColor[p.phase]}`}
                  >
                    {p.city} · {p.phase}
                  </span>
                  <span className="relative mt-1 grid h-3 w-3 place-items-center">
                    <span className="absolute inset-0 animate-pulse-soft rounded-full bg-accent/40" />
                    <span className="relative h-2 w-2 rounded-full bg-accent" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right column: list + stats + CTA */}
          <div className="flex flex-col gap-6">
            <ul className="divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/5">
              {pins.map((p) => (
                <li
                  key={p.city}
                  className="flex items-center justify-between gap-4 px-5 py-3.5"
                >
                  <div>
                    <p className="text-base font-medium text-white">{p.city}</p>
                    <p className="text-xs text-white/55">{p.state}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${phaseColor[p.phase]}`}
                  >
                    {p.phase === "Live" ? "Live" : `Rolling ${p.phase}`}
                  </span>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    {s.label}
                  </p>
                  <p className="mt-1.5 text-lg font-semibold text-white">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="#waitlist"
              className="flex items-center justify-between rounded-2xl border border-accent/30 bg-accent/10 px-5 py-4 text-sm font-medium text-white transition hover:border-accent/60 hover:bg-accent/15"
            >
              <span>
                Don&rsquo;t see your city? Join the waitlist anyway.
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
