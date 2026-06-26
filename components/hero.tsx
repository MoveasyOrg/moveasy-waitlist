"use client";

import { motion } from "framer-motion";
import { SelectionBoxWord } from "./selection-box-word";
import { WaitlistForm } from "./waitlist-form";
import { Countdown } from "./countdown";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
});

export function Hero({
  initialCount,
  launchAt,
}: {
  initialCount: number;
  launchAt: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-hero-radial">
      <div aria-hidden className="absolute inset-0 grid-floor" />
      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center px-4 pb-0 pt-28 sm:pt-36">
        <motion.p
          {...fade(0.05)}
          className="text-xs uppercase tracking-[0.24em] text-white/70"
        >
          Born in Akwa. Built for Africa.
        </motion.p>

        <motion.h1
          {...fade(0.15)}
          className="mt-6 text-balance text-center text-[44px] font-medium leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          Move anywhere,{" "}
          <br className="hidden sm:block" />
          like it&rsquo;s already{" "}
          <SelectionBoxWord>booked</SelectionBoxWord>.
        </motion.h1>

        <motion.p
          {...fade(0.35)}
          className="mt-6 max-w-xl text-pretty text-center text-base text-white/75 sm:text-lg"
        >
          Book rides, plan trips, split fares. All from WhatsApp.
          No app to install, no data plan to burn.
        </motion.p>

        <motion.div {...fade(0.5)} className="mt-8 w-full">
          <WaitlistForm initialCount={initialCount} />
        </motion.div>

        <div className="pointer-events-none mt-auto w-full pt-12">
          <Countdown targetIso={launchAt} />
        </div>
      </div>
    </section>
  );
}
