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
  communityUrl,
  onDismiss,
  duration = 5000,
}: {
  message: string | null;
  tone: ToastTone;
  firstName?: string | null;
  /** Optional WhatsApp community URL — surfaced on `success` only. */
  communityUrl?: string | null;
  onDismiss: () => void;
  duration?: number;
}) {
  // Extend the auto-dismiss when there's a community CTA to give the user
  // time to read/scan the QR before we close.
  const showCommunity = tone === "success" && !!communityUrl;
  const effectiveDuration = showCommunity ? Math.max(duration, 15000) : duration;

  useEffect(() => {
    if (!message) return;
    const id = setTimeout(onDismiss, effectiveDuration);
    return () => clearTimeout(id);
  }, [message, effectiveDuration, onDismiss]);

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

            {showCommunity && communityUrl ? (
              <div className="relative mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#25D366]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.695.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.017 21.785h-.005a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.884 9.884zM20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.892c0 2.096.549 4.14 1.593 5.945L0 24l6.335-1.652a11.882 11.882 0 0 0 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411z" />
                      </svg>
                    </div>
                    <div className="min-w-0 text-left">
                      <p className="text-sm font-semibold">Join our WhatsApp community</p>
                      <p className="text-xs text-white/60">
                        Early access chats, drop notifications, launch updates.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <a
                      href={communityUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid h-10 flex-1 place-items-center rounded-xl bg-[#25D366] text-sm font-semibold text-white transition hover:bg-[#1ebe57]"
                    >
                      Open in WhatsApp
                    </a>
                    <a
                      href={communityUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open QR code in a new tab"
                      className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/15 bg-white"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                          communityUrl,
                        )}&size=120x120&margin=0&color=14306B&bgcolor=FFFFFF`}
                        alt=""
                        width={40}
                        height={40}
                        loading="lazy"
                      />
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onDismiss}
                  className="inline-flex h-10 items-center justify-center rounded-full bg-white/10 px-5 text-sm font-medium text-white/85 transition hover:bg-white/15"
                >
                  Maybe later
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onDismiss}
                className="relative mt-6 inline-flex h-10 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-navy transition hover:bg-accent hover:text-ink"
                autoFocus
              >
                {v.ctaLabel}
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
