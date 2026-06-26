"use client";

import { motion } from "framer-motion";
import { LogoMark } from "./logo";

const links: { label: string; href: string }[] = [
  { label: "About", href: "#about" },
  { label: "FAQs", href: "#faqs" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-0 left-0 right-0 z-50 px-5 pt-5 sm:px-8 sm:pt-7"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <a
          href="/"
          aria-label="Moveasy home"
          className="flex items-center gap-2 text-white transition hover:opacity-80"
        >
          <LogoMark className="h-7 w-7 sm:h-8 sm:w-8" />
          <span className="text-lg font-semibold tracking-tight sm:text-xl">
            Moveasy
          </span>
        </a>

        <div className="flex items-center gap-6 sm:gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/85 transition hover:text-white sm:text-base"
            >
              {l.label}
            </a>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
