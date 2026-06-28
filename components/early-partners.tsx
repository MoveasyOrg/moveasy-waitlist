"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Toast, type ToastTone } from "./toast";

const items = [
  {
    title: "Drivers",
    desc: "Onboard early. Priority rides + launch incentives.",
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
    desc: "List vehicles. We handle matching and ops, you earn.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M7 19v2M17 19v2" />
      </svg>
    ),
  },
  {
    title: "Logistics & B2B",
    desc: "Staff routes, deliveries, recurring trips at scale.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7h18M3 12h18M3 17h18" />
      </svg>
    ),
  },
  {
    title: "Partners & investors",
    desc: "Shape the network across African cities.",
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
              className="glass rounded-3xl border-t-2 border-accent/70 p-6"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-[#0B123B]">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-9">
          <p className="mb-3 text-sm text-white/70">Tell us how you want to work with Moveasy.</p>
          <PartnerForm />
        </div>
      </div>
    </section>
  );
}

const ROLES = ["Driver", "Fleet / car owner", "Logistics or B2B", "Partner or investor", "Other"] as const;

function PartnerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<(typeof ROLES)[number]>("Driver");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [toast, setToast] = useState<{ message: string; tone: ToastTone } | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, message }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed");
      setStatus("success");
      setToast({ message: "We'll reach out within a day or two.", tone: "success" });
      setName("");
      setEmail("");
      setMessage("");
      setRole("Driver");
    } catch {
      setStatus("error");
      setToast({ message: "Something went wrong. Email us at moveasyhq@gmail.com.", tone: "error" });
    }
  }

  const inputClass =
    "h-11 w-full rounded-2xl bg-white/5 px-4 text-sm text-white placeholder:text-white/50 border border-white/10 focus:border-white/30 focus:bg-white/8 focus:outline-none focus:ring-2 focus:ring-white/15 transition disabled:opacity-60";

  return (
    <>
      <form onSubmit={onSubmit} className="glass rounded-3xl p-5 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "loading"}
            className={inputClass}
          />
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            className={inputClass}
          />
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as (typeof ROLES)[number])}
            disabled={status === "loading"}
            className={inputClass}
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={status === "loading" || !email}
            className="h-11 rounded-2xl bg-white px-6 text-sm font-medium text-navy transition hover:bg-accent hover:text-ink disabled:cursor-not-allowed disabled:bg-white/85"
          >
            {status === "loading" ? "Sending..." : status === "success" ? "Sent" : "Send interest"}
          </button>
        </div>
        <textarea
          placeholder="Tell us more (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={status === "loading"}
          rows={2}
          className={`${inputClass} mt-3 resize-y`}
        />
      </form>
      <Toast message={toast?.message ?? null} tone={toast?.tone ?? "success"} onDismiss={() => setToast(null)} />
    </>
  );
}
