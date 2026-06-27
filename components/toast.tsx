"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export type ToastTone = "success" | "duplicate" | "error";

type Variant = {
  badge: React.ReactNode;
  ringClass: string;
  haloClass: string;
  accentClass: string;
  iconBgClass: string;
  iconColorClass: string;
  defaultTitle: string;
  ctaLabel: string;
};

const VARIANTS: Record<ToastTone, Variant> = {
  success: {
    badge: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
    ringClass: "ring-emerald-400/35",
    haloClass: "shadow-[0_30px_80px_-20px_rgba(16,185,129,0.55)]",
    accentClass: "from-emerald-400/15 via-transparent to-transparent",
    iconBgClass: "bg-emerald-500/15",
    iconColorClass: "text-emerald-300",
    defaultTitle: "You're in.",
    ctaLabel: "Sweet",
  },
  duplicate: {
    badge: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
    ),
    ringClass: "ring-accent/40",
    haloClass: "shadow-[0_30px_80px_-20px_rgba(242,169,59,0.55)]",
    accentClass: "from-accent/15 via-transparent to-transparent",
    iconBgClass: "bg-accent/15",
    iconColorClass: "text-accent",
    defaultTitle: "Already with us.",
    ctaLabel: "All good",
  },
  error: {
    badge: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M15 9l-6 6" />
        <path d="M9 9l6 6" />
      </svg>
    ),
    ringClass: "ring-rose-400/35",
    haloClass: "shadow-[0_30px_80px_-20px_rgba(244,63,94,0.55)]",
    accentClass: "from-rose-400/15 via-transparent to-transparent",
    iconBgClass: "bg-rose-500/15",
    iconColorClass: "text-rose-300",
    defaultTitle: "Couldn't sign you up.",
    ctaLabel: "Got it",
  },
};

function titleFor(tone: ToastTone, firstName?: string | null): string {
  if (tone === "success") {
    return firstName ? `You're in, ${firstName}.` : VARIANTS.success.defaultTitle;
  }
  if (tone === "duplicate") {
    return firstName ? `Already with us, ${firstName}.` : VARIANTS.duplicate.defaultTitle;
  }
  return VARIANTS.error.defaultTitle;
}

export function Toast({
  message,
  tone,
  firstName,
  onDismiss,
  duration = 5000,
}: {
  message: string | null;
  tone: ToastTone;
  firstName?: string | null;
  onDismiss: () => void;
  duration?: number;
}) {
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(onDismiss, duration);
    return () => clearTimeout(id);
  }, [message, duration, onDismiss]);

  useEffect(() => {
    if (!message) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [message, onDismiss]);

  const v = VARIANTS[tone];
  const title = titleFor(tone, firstName);
  const isError = tone === "error";

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key="toast-root"
          role={isError ? "alertdialog" : "dialog"}
          aria-live={isError ? "assertive" : "polite"}
          aria-modal="true"
          aria-labelledby="toast-title"
          aria-describedby="toast-body"
          className="fixed inset-0 z-[60] flex items-center justify-center px-5"
        >
          <motion.button
            type="button"
            aria-label="Dismiss"
            onClick={onDismiss}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 cursor-default bg-navy-900/60 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full max-w-sm overflow-hidden rounded-[28px] border border-white/10 bg-navy-900/90 p-8 text-center text-white ring-1 backdrop-blur-2xl ${v.ringClass} ${v.haloClass}`}
          >
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${v.accentClass}`}
            />

            <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-white/5">
              <div
                className={`grid h-12 w-12 place-items-center rounded-full ${v.iconBgClass} ${v.iconColorClass}`}
              >
                {v.badge}
              </div>
            </div>

            <h3
              id="toast-title"
              className="relative mt-5 text-balance text-xl font-semibold tracking-tight"
            >
              {title}
            </h3>
            <p
              id="toast-body"
              className="relative mt-2 text-pretty text-sm leading-relaxed text-white/70"
            >
              {message}
            </p>

            <button
              type="button"
              onClick={onDismiss}
              className="relative mt-6 inline-flex h-10 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-navy transition hover:bg-accent hover:text-ink"
              autoFocus
            >
              {v.ctaLabel}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
