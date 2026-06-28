"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type AccordionItem = { q: string; a: React.ReactNode };

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <ul className="divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.03]">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-white/[0.04] sm:px-6"
            >
              <span className="text-base font-medium text-white sm:text-lg">
                {item.q}
              </span>
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-white/75 transition ${isOpen ? "rotate-45 border-accent/40 bg-accent/10 text-accent" : ""}`}
                aria-hidden
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14" />
                  <path d="M5 12h14" />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pr-12 text-sm leading-relaxed text-white/75 sm:px-6 sm:text-base">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
