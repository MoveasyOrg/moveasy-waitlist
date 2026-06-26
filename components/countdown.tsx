"use client";

import { useEffect, useState } from "react";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  const mins = Math.floor((ms % 3_600_000) / 60_000);
  return { days, hours, mins };
}

const pad = (n: number) => n.toString().padStart(2, "0");

export function Countdown({ targetIso }: { targetIso: string }) {
  const target = new Date(targetIso).getTime();
  const [t, setT] = useState(() => diff(target));

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 30_000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div
      aria-label="Time until launch"
      className="pointer-events-none select-none"
    >
      <div className="flex items-end justify-between gap-4 px-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
        <span className="flex-1 text-left">days</span>
        <span className="flex-1 text-center">hours</span>
        <span className="flex-1 text-right">min</span>
      </div>
      <div
        className="font-display text-[18vw] leading-[0.9] text-white/15 blur-[2px] sm:text-[14rem]"
        aria-hidden
      >
        {pad(t.days)}:{pad(t.hours)}:{pad(t.mins)}
      </div>
    </div>
  );
}
