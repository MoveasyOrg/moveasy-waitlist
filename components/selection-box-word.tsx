"use client";

import { motion } from "framer-motion";

export function SelectionBoxWord({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative inline-block italic font-display"
    >
      <span className="relative z-10 px-1.5 text-white">{children}</span>
      <span aria-hidden className="pointer-events-none absolute -inset-1.5 rounded-[6px] border border-white/80" />
      <span aria-hidden className="handle handle-tl" />
      <span aria-hidden className="handle handle-tr" />
      <span aria-hidden className="handle handle-bl" />
      <span aria-hidden className="handle handle-br" />
      <span aria-hidden className="handle-rotate" />
    </motion.span>
  );
}
