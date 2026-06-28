"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { LogoMark } from "./logo";

const links: { label: string; href: string }[] = [
  { label: "About", href: "/about" },
  { label: "Partners", href: "/#partners" },
  { label: "FAQs", href: "/faqs" },
];

function Burger({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="relative block h-4 w-5">
      <motion.span
        animate={{ y: open ? 7 : 0, rotate: open ? 45 : 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 top-0 h-[2px] w-5 rounded-full bg-current"
      />
      <motion.span
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        className="absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-current"
      />
      <motion.span
        animate={{ y: open ? -7 : 0, rotate: open ? -45 : 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-0 top-[14px] h-[2px] w-5 rounded-full bg-current"
      />
    </span>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position to fade in the glass background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll when the sheet is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,padding] duration-300 ${
          scrolled
            ? "bg-navy-900/70 backdrop-blur-xl py-3"
            : "py-5 sm:py-7"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            aria-label="Moveasy home"
            className="flex items-center gap-2 text-white transition hover:opacity-80"
          >
            <LogoMark className="h-7 w-7 sm:h-8 sm:w-8" />
            <span className="text-lg font-semibold tracking-tight sm:text-xl">
              Moveasy
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 sm:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-base font-medium text-white/85 transition hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="glass grid h-10 w-10 place-items-center rounded-full text-white sm:hidden"
          >
            <Burger open={open} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 sm:hidden"
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-navy-900/60 backdrop-blur-xl"
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="glass-sheet absolute left-4 right-4 top-20 rounded-3xl p-2 shadow-[0_24px_80px_-12px_rgba(6,9,32,0.6)]"
            >
              <ul className="flex flex-col">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-5 py-4 text-lg font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
                    >
                      {l.label}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14" />
                        <path d="m13 5 7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
