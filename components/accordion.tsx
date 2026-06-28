"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type AccordionItem = { q: string; a: React.ReactNode };

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.map((it, idx) => ({ it, idx }));
    return items
      .map((it, idx) => ({ it, idx }))
      .filter(({ it }) => it.q.toLowerCase().includes(q) || String(it.a).toLowerCase().includes(q));
  }, [items, query]);

  return (
    <div>
      {/* Live search for interactivity */}
      <div className="mb-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/50">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            // keep first result open when filtering
            if (e.target.value) {
              const first = items.findIndex((it) =>
                it.q.toLowerCase().includes(e.target.value.toLowerCase()) ||
                String(it.a).toLowerCase().includes(e.target.value.toLowerCase())
              );
              if (first !== -1) setOpen(first);
            }
          }}
          placeholder="Search questions..."
          className="flex-1 bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
          aria-label="Search FAQs"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setOpen(0);
            }}
            className="text-xs text-white/60 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      <ul className="divide-y divide-white/10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025]">
        {filtered.length === 0 && (
          <li className="px-6 py-8 text-center text-sm text-white/60">
            No matches. Try a different word or clear the search.
          </li>
        )}

        {filtered.map(({ it, idx: originalIndex }, displayIndex) => {
          const isOpen = open === originalIndex;
          return (
            <li key={originalIndex} className="group">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : originalIndex)}
                aria-expanded={isOpen}
                className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left transition hover:bg-white/[0.035] sm:px-6"
              >
                <div className="flex items-start gap-4">
                  {/* Subtle index / icon */}
                  <span
                    className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[10px] font-mono tracking-[0.5px] transition ${
                      isOpen
                        ? "border-accent/40 bg-accent/10 text-accent"
                        : "border-white/15 bg-white/5 text-white/50 group-hover:text-white/70"
                    }`}
                    aria-hidden
                  >
                    {String(originalIndex + 1).padStart(2, "0")}
                  </span>
                  <span className={`text-[15px] font-medium leading-tight sm:text-[17px] ${isOpen ? "text-white" : "text-white/90"}`}>
                    {it.q}
                  </span>
                </div>

                <span
                  className={`mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border text-white/70 transition-all ${
                    isOpen
                      ? "rotate-45 border-accent/40 bg-accent/10 text-accent"
                      : "border-white/15 bg-white/5 group-hover:border-white/25 group-hover:bg-white/[0.06]"
                  }`}
                  aria-hidden
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
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
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    {/* Left accent bar + answer */}
                    <div className="relative pl-5 pr-5 pb-6 sm:pl-6 sm:pr-6">
                      <div className="absolute left-[23px] top-0 h-full w-[2px] bg-gradient-to-b from-accent/60 via-accent/30 to-transparent" />
                      <div className="pl-8 text-[14.5px] leading-relaxed text-white/75 sm:pl-9 sm:text-[15.5px]">
                        {it.a}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <p className="mt-5 text-center text-xs text-white/50">
        Still stuck? Email us at <a href="mailto:moveasyhq@gmail.com" className="text-accent/90 hover:text-accent hover:underline">moveasyhq@gmail.com</a>
      </p>
    </div>
  );
}
