"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Decoration =
  | {
      kind: "icon-card";
      content: React.ReactNode;
      position: { top?: string; bottom?: string; left?: string; right?: string };
      delay?: number;
    }
  | {
      kind: "notification";
      title: string;
      body?: string;
      avatar?: React.ReactNode;
      position: { top?: string; bottom?: string; left?: string; right?: string };
      delay?: number;
    }
  | {
      kind: "stat";
      label: string;
      value: string;
      position: { top?: string; bottom?: string; left?: string; right?: string };
      delay?: number;
    };

export type FeatureMockupProps = {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
  mockupSrc?: string;
  mockupAlt: string;
  /**
   * Placeholder JSX shown inside the phone bezel when no mockupSrc is
   * provided yet (handy while waiting on the chat export).
   */
  mockupPlaceholder?: React.ReactNode;
  decorations?: Decoration[];
  /** Side the mockup lives on (desktop only) */
  side?: "left" | "right";
  /** Background watermark text shown behind the section */
  watermark?: string;
  /** Section background tone */
  tone?: "paper" | "navy" | "lavender" | "cream";
  /** Eyebrow text color */
  eyebrowClass?: string;
  /** Body text color override */
  bodyClass?: string;
  /** Title color override */
  titleClass?: string;
};

const TONES = {
  paper: "bg-paper text-ink",
  navy: "bg-navy-900 text-white",
  lavender: "bg-[#EFEAFB] text-[#2A1F4D]",
  cream: "bg-[#FCF5E2] text-[#3B2A12]",
} as const;

function CardWrap({
  children,
  position,
  delay = 0,
}: {
  children: React.ReactNode;
  position: Decoration["position"];
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="absolute"
      style={position}
    >
      {children}
    </motion.div>
  );
}

export function FeatureMockup({
  eyebrow,
  title,
  body,
  ctaLabel,
  ctaHref,
  mockupSrc,
  mockupAlt,
  mockupPlaceholder,
  decorations = [],
  side = "right",
  watermark,
  tone = "paper",
  eyebrowClass,
  bodyClass,
  titleClass,
}: FeatureMockupProps) {
  const isLight = tone !== "navy";
  const titleColor = titleClass ?? (isLight ? "text-ink" : "text-white");
  const bodyColor = bodyClass ?? (isLight ? "text-ink/70" : "text-white/70");
  const eyebrowColor =
    eyebrowClass ?? (isLight ? "text-accent" : "text-accent");

  return (
    <section
      className={`relative overflow-hidden py-14 sm:py-20 ${TONES[tone]}`}
    >
      {watermark && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 select-none whitespace-nowrap text-center text-[22vw] font-semibold leading-none tracking-tight opacity-[0.06] sm:text-[14vw]"
        >
          {watermark}
          <span className="mx-4 opacity-60">·</span>
          {watermark}
          <span className="mx-4 opacity-60">·</span>
          {watermark}
        </span>
      )}

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        {/* Copy */}
        <div className={side === "right" ? "lg:order-1" : "lg:order-2"}>
          <p
            className={`text-xs font-semibold uppercase tracking-[0.22em] ${eyebrowColor}`}
          >
            {eyebrow}
          </p>
          <h2
            className={`mt-4 text-balance text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl ${titleColor}`}
          >
            {title}
          </h2>
          <p
            className={`mt-4 max-w-md text-pretty text-base leading-relaxed ${bodyColor}`}
          >
            {body}
          </p>
          {ctaLabel && (
            <a
              href={ctaHref ?? "#waitlist"}
              className={`mt-6 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-medium transition ${
                isLight
                  ? "bg-ink text-white hover:bg-navy"
                  : "bg-white text-navy hover:bg-accent hover:text-ink"
              }`}
            >
              {ctaLabel}
            </a>
          )}
        </div>

        {/* Mockup + decorations */}
        <div className={side === "right" ? "lg:order-2" : "lg:order-1"}>
          <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[320px]">
            {/* Phone frame */}
            <div className="relative aspect-[9/19.5] rounded-[36px] border border-white/10 bg-navy-900 p-1.5 shadow-[0_24px_60px_-20px_rgba(6,9,32,0.55)]">
              <div className="relative h-full w-full overflow-hidden rounded-[30px] bg-navy">
                {mockupSrc ? (
                  <Image
                    src={mockupSrc}
                    alt={mockupAlt}
                    fill
                    sizes="(min-width: 1024px) 320px, 80vw"
                    className="object-cover"
                  />
                ) : (
                  mockupPlaceholder
                )}
              </div>
              {/* Dynamic Island — sits inside the screen safe-area, above the status bar */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-[6px] z-20 h-[22px] w-[88px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
              />
            </div>

            {/* Floating decorations */}
            {decorations.map((d, i) => (
              <CardWrap key={i} position={d.position} delay={d.delay}>
                {d.kind === "icon-card" && (
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-[0_18px_40px_-18px_rgba(6,9,32,0.4)]">
                    {d.content}
                  </div>
                )}
                {d.kind === "notification" && (
                  <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_18px_40px_-18px_rgba(6,9,32,0.4)]">
                    {d.avatar && (
                      <div className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-navy/10 text-navy">
                        {d.avatar}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink">{d.title}</p>
                      {d.body && (
                        <p className="text-xs text-ink/60">{d.body}</p>
                      )}
                    </div>
                  </div>
                )}
                {d.kind === "stat" && (
                  <div className="rounded-2xl bg-white px-4 py-3 text-left shadow-[0_18px_40px_-18px_rgba(6,9,32,0.4)]">
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink/55">
                      {d.label}
                    </p>
                    <p className="mt-0.5 text-lg font-semibold text-ink">
                      {d.value}
                    </p>
                  </div>
                )}
              </CardWrap>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
