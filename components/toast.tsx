"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export type ToastTone = "success" | "error";

const ICONS: Record<ToastTone, React.ReactNode> = {
  success: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  error: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v5" />
      <path d="M12 16h.01" />
    </svg>
  ),
};

const TITLES: Record<ToastTone, string> = {
  success: "You're in.",
  error: "Couldn't sign you up.",
};

export function Toast({
  message,
  tone,
  onDismiss,
  duration = 4500,
}: {
  message: string | null;
  tone: ToastTone;
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

  const ring =
    tone === "success"
      ? "shadow-[0_0_0_1px_rgba(74,222,128,0.35),0_30px_80px_-12px_rgba(20,160,75,0.45)]"
      : "shadow-[0_0_0_1px_rgba(248,113,113,0.35),0_30px_80px_-12px_rgba(178,49,49,0.45)]";

  const accent =
    tone === "success"
      ? "bg-emerald-500/20 text-emerald-200"
      : "bg-rose-500/20 text-rose-200";

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key="toast-root"
          role={tone === "error" ? "alertdialog" : "dialog"}
          aria-live={tone === "error" ? "assertive" : "polite"}
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
            className="absolute inset-0 cursor-default bg-navy-900/55 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={`relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/12 bg-navy-900/85 p-7 text-center text-white backdrop-blur-2xl ${ring}`}
          >
            <div
              className={`mx-auto grid h-14 w-14 place-items-center rounded-full ${accent}`}
            >
              {ICONS[tone]}
            </div>
            <h3 id="toast-title" className="mt-5 text-xl font-semibold tracking-tight">
              {TITLES[tone]}
            </h3>
            <p id="toast-body" className="mt-2 text-pretty text-sm leading-relaxed text-white/70">
              {message}
            </p>
            <button
              type="button"
              onClick={onDismiss}
              className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-navy transition hover:bg-accent hover:text-ink"
            >
              {tone === "success" ? "Sweet" : "Got it"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
