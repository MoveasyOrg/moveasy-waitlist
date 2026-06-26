"use client";

import { motion } from "framer-motion";

type Bubble = {
  from: "user" | "bot";
  body: React.ReactNode;
  meta?: string;
  time: string;
};

const thread: Bubble[] = [
  {
    from: "user",
    body: (
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-whatsapp/20">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-whatsapp">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <div className="flex-1">
          <div className="flex h-2 items-center gap-0.5">
            {[3, 6, 4, 8, 5, 9, 4, 7, 3, 6, 5, 8, 4, 6].map((h, i) => (
              <span key={i} className="w-0.5 rounded-full bg-whatsapp" style={{ height: `${h * 2}px` }} />
            ))}
          </div>
          <span className="mt-1 block text-[10px] text-ink/50">0:08</span>
        </div>
      </div>
    ),
    meta: "Voice note",
    time: "07:42",
  },
  {
    from: "bot",
    body: (
      <span>
        Got it. Ride to <b>UNIZIK gate</b> from <b>Aroma Junction</b>.
        <br />
        Comfort sedan, ₦1,400, ETA 4 min. Reply <b>1</b> to confirm.
      </span>
    ),
    time: "07:42",
  },
  {
    from: "user",
    body: (
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-navy/10">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-navy">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        </div>
        <span className="text-sm text-ink">Photo of the place I&rsquo;m going</span>
      </div>
    ),
    meta: "Image",
    time: "07:43",
  },
  {
    from: "bot",
    body: (
      <span>
        That&rsquo;s <b>Shoprite Awka</b>. Booking now. Split with{" "}
        <span className="text-whatsapp">+234 803 555 0142</span>?
      </span>
    ),
    time: "07:43",
  },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.05 },
  transition: { delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
});

export function WhatsappDemo() {
  return (
    <section className="relative bg-navy-900 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p {...fade()} className="text-xs uppercase tracking-[0.24em] text-accent">
            A chat, not an app
          </motion.p>
          <motion.h2
            {...fade(0.1)}
            className="mt-3 text-balance text-3xl font-medium leading-tight text-white sm:text-4xl"
          >
            Send a voice note. Get a ride.
          </motion.h2>
          <motion.p {...fade(0.2)} className="mt-3 text-pretty text-white/65">
            Pidgin, English, or a quick photo. The bot understands how Nigerians
            actually ask for things.
          </motion.p>
        </div>

        <motion.div
          {...fade(0.25)}
          className="glass-dark mx-auto mt-12 max-w-md rounded-3xl p-3 shadow-glass sm:p-4"
        >
          <div className="flex items-center gap-3 border-b border-white/5 px-3 pb-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-whatsapp text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12a11.93 11.93 0 0 0 1.69 6.13L0 24l5.99-1.57A12 12 0 0 0 12 24c6.63 0 12-5.37 12-12a11.94 11.94 0 0 0-3.48-8.52ZM12 22a9.95 9.95 0 0 1-5.06-1.39l-.36-.21-3.55.93.95-3.46-.23-.36A9.95 9.95 0 1 1 22 12c0 5.52-4.48 10-10 10Z" />
              </svg>
            </span>
            <div className="flex-1 leading-tight">
              <p className="text-sm font-medium text-white">Moveasy</p>
              <p className="text-xs text-white/55">online</p>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-white/40">WhatsApp</span>
          </div>

          <ul className="space-y-2.5 px-1 pt-4">
            {thread.map((b, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
                className={
                  b.from === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                <div
                  className={
                    "max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm shadow-sm " +
                    (b.from === "user"
                      ? "rounded-tr-md bg-[#DCF8C6] text-ink"
                      : "rounded-tl-md bg-white text-ink")
                  }
                >
                  {b.meta && (
                    <p className="mb-1 text-[10px] uppercase tracking-wider text-ink/50">
                      {b.meta}
                    </p>
                  )}
                  <div className="text-pretty">{b.body}</div>
                  <p className="mt-1 text-right text-[10px] text-ink/45">{b.time}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
