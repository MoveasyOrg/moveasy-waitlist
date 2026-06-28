"use client";

import { motion } from "framer-motion";

const items = [
  {
    title: "Drivers",
    desc: "Onboard early. Priority access to rides in your city and launch incentives for the first cohort.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17h14" />
        <path d="M7 17V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v10" />
        <circle cx="8.5" cy="17" r="1.5" />
        <circle cx="15.5" cy="17" r="1.5" />
      </svg>
    ),
  },
  {
    title: "Fleet & car owners",
    desc: "List your vehicles. We match riders and handle the operations while you earn from your cars.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M7 19v2M17 19v2" />
      </svg>
    ),
  },
  {
    title: "Logistics & B2B",
    desc: "Staff shuttles, deliveries, recurring corporate routes. Reliable WhatsApp-first coordination at scale.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7h18M3 12h18M3 17h18" />
      </svg>
    ),
  },
  {
    title: "Partners & investors",
    desc: "Strategic partners and early backers who want to shape movement across African cities.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
];

export function EarlyPartners() {
  return (
    <section className="relative overflow-hidden bg-navy py-16 sm:py-20">
      <div aria-hidden className="absolute inset-0 grid-floor opacity-40" />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">Early access</p>
          <h2 className="mt-2 text-balance text-3xl font-medium leading-tight text-white sm:text-4xl">
            Drivers, fleets &amp; partners
          </h2>
          <p className="mt-3 text-pretty text-white/70">
            We’re onboarding the first wave of drivers, vehicle owners who want to rent out cars, logistics operators, and strategic partners.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="glass rounded-3xl p-6"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-accent">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <a
            href="mailto:moveasyhq@gmail.com?subject=Early%20Partner%20%2F%20Driver%20Interest"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-accent/40 bg-accent/10 px-5 py-3 text-sm font-medium text-white transition hover:border-accent/70 hover:bg-accent/15"
          >
            Join as an early partner or driver
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m13 5 7 7-7 7" />
            </svg>
          </a>
          <span className="text-xs text-white/50">or email moveasyhq@gmail.com</span>
        </div>
      </div>
    </section>
  );
}
