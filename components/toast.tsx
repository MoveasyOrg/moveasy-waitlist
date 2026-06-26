"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export type ToastTone = "success" | "error";

export function Toast({
  message,
  tone,
  onDismiss,
  duration = 5000,
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

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key={message + tone}
          initial={{ opacity: 0, y: -16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          role={tone === "error" ? "alert" : "status"}
          className="fixed top-5 left-1/2 z-[60] -translate-x-1/2 px-4 sm:top-6"
        >
          <div
            className="flex items-center gap-3 rounded-full px-5 py-3 text-sm font-medium text-white shadow-[0_18px_50px_-12px_rgba(6,9,32,0.7)] backdrop-blur-xl backdrop-saturate-150"
            style={{
              background:
                tone === "success"
                  ? "linear-gradient(135deg, rgba(37,211,102,0.92), rgba(20,160,75,0.92))"
                  : "linear-gradient(135deg, rgba(217,79,79,0.92), rgba(178,49,49,0.92))",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            <span aria-hidden className="grid h-5 w-5 place-items-center">
              {tone === "success" ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 9v4" />
                  <path d="M12 17h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              )}
            </span>
            <span>{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
