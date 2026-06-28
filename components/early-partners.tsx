"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const items = [
  {
    title: "Drivers",
    desc: "Priority rides and launch incentives for the first cohort.",
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
    desc: "List vehicles — we match riders and run ops, you earn.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M7 19v2M17 19v2" />
      </svg>
    ),
  },
  {
    title: "Logistics & B2B",
    desc: "Staff shuttles, deliveries, recurring corporate routes.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7h18M3 12h18M3 17h18" />
      </svg>
    ),
  },
  {
    title: "Partners & investors",
    desc: "Strategic partners shaping movement across African cities.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
];

export function EarlyPartners() {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!modalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy via-[#152273] to-navy-900 py-16 sm:py-20">
      <div aria-hidden className="absolute inset-0 grid-floor opacity-30" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="lg:grid lg:grid-cols-[1fr,minmax(300px,380px)] lg:items-start lg:gap-10 xl:gap-14">
          {/* Left: copy + card grid */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent">
              Early access
            </p>
            <h2 className="mt-2 text-balance text-3xl font-medium leading-tight text-white sm:text-4xl">
              Drivers, fleets &amp; partners
            </h2>
            <p className="mt-3 max-w-xl text-pretty text-white/70">
              Onboarding drivers, vehicle owners, logistics operators, and strategic partners for launch.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
              {items.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-2xl border border-white/10 bg-paper/[0.06] p-4 sm:rounded-3xl sm:p-5"
                >
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-ink sm:h-10 sm:w-10 sm:rounded-2xl">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-white sm:text-base">{item.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/65 sm:text-sm">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3.5 text-sm font-semibold text-ink transition hover:bg-accent-soft lg:hidden"
            >
              Join as partner or driver
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Right: desktop form */}
          <div className="hidden lg:block lg:sticky lg:top-28">
            <PartnerFormPanel onSuccess={() => {}} />
          </div>
        </div>
      </div>

      <PartnerModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}

const ROLES = ["Driver", "Fleet / car owner", "Logistics or B2B", "Partner or investor", "Other"] as const;

type Role = (typeof ROLES)[number];

function PartnerFormPanel({
  onSuccess,
  idPrefix = "",
}: {
  onSuccess: () => void;
  idPrefix?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("Driver");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading" || !email) return;
    setStatus("loading");
    setFeedback(null);
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, message }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Failed");
      setStatus("success");
      setFeedback("We'll reach out within a day or two.");
      setName("");
      setEmail("");
      setMessage("");
      setRole("Driver");
      onSuccess();
    } catch {
      setStatus("error");
      setFeedback("Something went wrong. Email moveasyhq@gmail.com.");
    }
  }

  const inputClass =
    "h-11 w-full rounded-2xl border border-white/12 bg-navy-900/50 px-4 text-sm text-white placeholder:text-white/45 focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-60";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-white/12 bg-paper/[0.07] p-5 shadow-glass backdrop-blur-sm sm:p-6"
    >
      <p className="text-sm font-medium text-white">Get on the early list</p>
      <p className="mt-1 text-xs text-white/55">We reply within 1–2 business days.</p>

      <div className="mt-4 space-y-3">
        <input
          id={`${idPrefix}partner-name`}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === "loading"}
          className={inputClass}
        />
        <input
          id={`${idPrefix}partner-email`}
          type="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className={inputClass}
        />
        <select
          id={`${idPrefix}partner-role`}
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
          disabled={status === "loading"}
          className={`${inputClass} appearance-none`}
        >
          {ROLES.map((r) => (
            <option key={r} value={r} className="bg-navy-900 text-white">
              {r}
            </option>
          ))}
        </select>
        <textarea
          id={`${idPrefix}partner-message`}
          placeholder="Tell us more (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={status === "loading"}
          rows={3}
          className={`${inputClass} resize-none py-3`}
        />
        <button
          type="submit"
          disabled={status === "loading" || !email}
          className="h-11 w-full rounded-2xl bg-white text-sm font-semibold text-navy transition hover:bg-accent hover:text-ink disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Sending…" : status === "success" ? "Sent ✓" : "Send interest"}
        </button>
      </div>

      {feedback && (
        <p
          className={`mt-3 text-xs ${status === "error" ? "text-rose-300" : "text-emerald-300"}`}
          role="status"
        >
          {feedback}
        </p>
      )}
    </form>
  );
}

function PartnerModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="partner-modal"
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-navy-900/70 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="partner-modal-title"
          >
            <div className="mb-3 flex items-center justify-between px-1 sm:hidden">
              <p id="partner-modal-title" className="text-sm font-medium text-white">
                Early partner signup
              </p>
              <button
                type="button"
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-white/80"
                aria-label="Close form"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <PartnerFormPanel idPrefix="modal-" onSuccess={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
