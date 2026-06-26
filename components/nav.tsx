"use client";

import { motion } from "framer-motion";
import LiquidGlass from "@nkzw/liquid-glass";
import { LogoMark } from "./logo";

const links: { label: string; href: string }[] = [
  { label: "About", href: "#about" },
  { label: "FAQs", href: "#faqs" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-3 left-0 right-0 z-50 px-4 sm:top-5"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between">
        <LiquidGlass
          borderRadius={100}
          padding="4px 14px 4px 4px"
          blurAmount={0.1}
          displacementScale={24}
          elasticity={0.18}
          saturation={130}
        >
          <a
            href="/"
            aria-label="Moveasy home"
            className="flex items-center gap-2"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-navy">
              <LogoMark className="h-4 w-4" />
            </span>
            <span className="text-sm font-semibold tracking-tight text-white sm:text-base">
              Moveasy
            </span>
          </a>
        </LiquidGlass>

        <LiquidGlass
          borderRadius={100}
          padding="4px"
          blurAmount={0.1}
          displacementScale={24}
          elasticity={0.18}
          saturation={130}
        >
          <div className="flex items-center gap-0.5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3 h-8 text-xs font-medium text-white/85 grid place-items-center hover:bg-white/10 hover:text-white transition sm:px-4 sm:h-9 sm:text-sm"
              >
                {l.label}
              </a>
            ))}
          </div>
        </LiquidGlass>
      </nav>
    </motion.header>
  );
}
