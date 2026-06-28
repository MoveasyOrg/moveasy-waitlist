"use client";

import { motion } from "framer-motion";
import { SelectionBoxWord } from "./selection-box-word";
import { WaitlistForm } from "./waitlist-form";
import { RoadIllustration } from "./road-illustration";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
});

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-hero-radial">
      <div aria-hidden className="absolute inset-0 grid-floor" />

      {/* Full-bleed road layer that extends edge-to-edge and fades at bottom */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[46vh] min-h-[280px] sm:h-[52vh] sm:min-h-[340px] md:h-[56vh]">
        <RoadIllustration />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-5 pb-0 pt-28 sm:min-h-[100svh] sm:pt-36">
        <motion.h1
          {...fade(0.1)}
          className="text-balance text-center text-[40px] font-medium leading-[1.04] tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          Move anywhere,{" "}
          <br className="hidden sm:block" />
          like it&rsquo;s already{" "}
          <SelectionBoxWord>booked</SelectionBoxWord>.
        </motion.h1>

        <motion.p
          {...fade(0.3)}
          className="mt-5 max-w-xl text-pretty text-center text-base text-white/75 sm:mt-6 sm:text-lg"
        >
          Book rides, plan trips, split fares. All from WhatsApp.
          No app to install, no data plan to burn.
        </motion.p>

        <motion.div {...fade(0.45)} className="relative z-10 mt-8 w-full sm:mt-10" id="waitlist">
          <WaitlistForm />
        </motion.div>

        {/* Spacer so content doesn't collide with the full-bleed road at bottom */}
        <div className="h-[42vh] min-h-[260px] sm:h-[46vh] sm:min-h-[300px] md:h-[50vh]" aria-hidden />
      </div>
    </section>
  );
}
