"use client";

import { motion } from "framer-motion";

const cards = [
  {
    title: "No app required",
    body: "Open WhatsApp, message Moveasy, get a ride. Install nothing. Update nothing. Works on the phone in your hand right now.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="6" y="2" width="12" height="20" rx="2.5" />
        <path d="M12 18h.01" />
        <path d="M9 6h6" />
      </svg>
    ),
  },
  {
    title: "Works on weak networks",
    body: "Designed for 2G evenings and roaming SIMs. If a text message can land, a ride can land too. Bolt and Uber stall here. We don't.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M2 9a16 16 0 0 1 20 0" />
        <path d="M5 13a11 11 0 0 1 14 0" />
        <path d="M8.5 16.5a6 6 0 0 1 7 0" />
        <circle cx="12" cy="20" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Built around how Africa moves",
    body: "Split fares with a friend, coordinate staff school runs, hop on a keke if a sedan can't reach. Mobility the way your day actually unfolds.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 17h13l2-5 3 1v4h-2" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
        <path d="M3 11h10" />
      </svg>
    ),
  },
];

export function WhyMoveasy() {
  return (
    <section className="bg-paper py-20 text-ink sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.24em] text-navy/70">
            Why Moveasy
          </p>
          <h2 className="mt-3 text-balance text-3xl font-medium leading-tight sm:text-4xl">
            Three things the apps still get wrong.
          </h2>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-3">
          {cards.map((c, i) => (
            <motion.li
              key={c.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: 0.08 * i, duration: 0.5 }}
              className="group rounded-3xl border border-navy/10 bg-white p-6 transition hover:border-navy/30"
            >
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-navy text-white transition group-hover:bg-accent group-hover:text-ink">
                {c.icon}
              </div>
              <h3 className="mt-5 text-lg font-medium tracking-tight">
                {c.title}
              </h3>
              <p className="mt-2 text-pretty text-sm text-ink/70">{c.body}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
