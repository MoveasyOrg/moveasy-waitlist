"use client";

import { motion } from "framer-motion";
import { LogoMark } from "./logo";

function IconBell() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function IconGear() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

export function Nav() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-3 left-0 right-0 z-50 px-4 sm:top-5"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="glass flex items-center gap-1 rounded-full px-1.5 py-1.5 shadow-glass">
          <button
            aria-label="Notifications"
            className="grid h-9 w-9 place-items-center rounded-full text-white/80 hover:bg-white/10 hover:text-white transition"
          >
            <IconGear />
          </button>
          <button
            aria-label="Settings"
            className="grid h-9 w-9 place-items-center rounded-full text-white/80 hover:bg-white/10 hover:text-white transition"
          >
            <IconBell />
          </button>
        </div>

        <a
          href="/"
          className="glass flex items-center gap-2 rounded-full pl-1.5 pr-4 py-1.5 shadow-glass"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-navy">
            <LogoMark className="h-5 w-5" />
          </span>
          <span className="font-display text-lg leading-none text-white">
            Moveasy
          </span>
        </a>
      </nav>
    </motion.header>
  );
}
