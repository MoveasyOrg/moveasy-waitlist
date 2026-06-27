"use client";

import { FeatureMockup } from "./feature-mockup";

function ChatPlaceholder({
  title,
  bubbles,
}: {
  title: string;
  bubbles: { side: "in" | "out"; text: string; meta?: string }[];
}) {
  return (
    <div className="flex h-full w-full flex-col bg-[#0a1a2e]">
      {/* WhatsApp-style header */}
      <div className="flex items-center gap-3 bg-[#0b2435] px-4 pb-3 pt-12 text-white">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-whatsapp text-[13px] font-bold">
          M
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-[10px] text-white/55">online</p>
        </div>
      </div>
      {/* Bubbles */}
      <ul className="flex-1 space-y-2 overflow-hidden bg-[#0a1a2e] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_60%)] px-3 py-4">
        {bubbles.map((b, i) => (
          <li
            key={i}
            className={b.side === "out" ? "flex justify-end" : "flex justify-start"}
          >
            <div
              className={
                "max-w-[80%] rounded-2xl px-3 py-2 text-[11px] leading-snug shadow-sm " +
                (b.side === "out"
                  ? "rounded-tr-md bg-[#005c4b] text-white"
                  : "rounded-tl-md bg-[#1f2c33] text-white/90")
              }
            >
              {b.meta && (
                <p className="mb-1 text-[9px] uppercase tracking-wider text-white/40">
                  {b.meta}
                </p>
              )}
              <p>{b.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function VoiceBookingFeature() {
  return (
    <FeatureMockup
      eyebrow="Voice booking"
      title={
        <>
          Speak it.<br className="hidden sm:block" /> We&rsquo;ll move you.
        </>
      }
      body="Tap, hold, talk. Pidgin or English. The bot listens, picks up your pickup and drop, sends you a quote, dispatches the closest ride. No buttons, no menus, no app."
      ctaLabel="Join the waitlist"
      ctaHref="#waitlist"
      tone="paper"
      watermark="VOICE"
      mockupAlt="Moveasy voice booking on WhatsApp"
      mockupPlaceholder={
        <ChatPlaceholder
          title="Moveasy"
          bubbles={[
            { side: "out", meta: "Voice note", text: "🎙 0:08" },
            {
              side: "in",
              text: "Got you. Pickup Aroma Junction → drop UNIZIK gate. Comfort sedan, ₦1,400, ETA 4 min. Reply 1 to confirm.",
            },
            { side: "out", text: "1" },
            { side: "in", text: "Confirmed ✅ Emeka in a silver Corolla, plate AKD-237-FG." },
          ]}
        />
      }
      decorations={[
        {
          kind: "icon-card",
          content: "🎙",
          position: { top: "8%", left: "-12%" },
          delay: 0.05,
        },
        {
          kind: "icon-card",
          content: "📍",
          position: { top: "30%", left: "-14%" },
          delay: 0.12,
        },
        {
          kind: "icon-card",
          content: "🚗",
          position: { top: "55%", left: "-10%" },
          delay: 0.2,
        },
        {
          kind: "stat",
          label: "Fare",
          value: "₦1,400",
          position: { top: "12%", right: "-8%" },
          delay: 0.18,
        },
        {
          kind: "notification",
          title: "ETA 4 min",
          body: "Emeka · Silver Corolla",
          position: { bottom: "10%", right: "-12%" },
          delay: 0.28,
        },
      ]}
    />
  );
}

export function PhotoBookingFeature() {
  return (
    <FeatureMockup
      eyebrow="Photo to destination"
      title={
        <>
          Show us.<br className="hidden sm:block" /> We&rsquo;ll get you there.
        </>
      }
      body="Snap the storefront, send the screenshot, share the Instagram pin. We figure out the address so you don't have to type one. Useful for landmarks Nigerians actually use."
      ctaLabel="Join the waitlist"
      ctaHref="#waitlist"
      tone="lavender"
      watermark="PHOTO"
      side="left"
      mockupAlt="Moveasy photo destination on WhatsApp"
      mockupPlaceholder={
        <ChatPlaceholder
          title="Moveasy"
          bubbles={[
            { side: "out", meta: "Photo", text: "📷 storefront.jpg" },
            { side: "in", text: "That's Shoprite Awka on Zik Avenue. Want me to book it?" },
            { side: "out", text: "Yes" },
            { side: "in", text: "Booking now. Comfort sedan, ₦1,650, ETA 6 min." },
          ]}
        />
      }
      decorations={[
        {
          kind: "icon-card",
          content: "📷",
          position: { top: "10%", right: "-10%" },
          delay: 0.05,
        },
        {
          kind: "icon-card",
          content: "🗺",
          position: { top: "35%", right: "-14%" },
          delay: 0.14,
        },
        {
          kind: "icon-card",
          content: "🛍",
          position: { top: "62%", right: "-10%" },
          delay: 0.22,
        },
        {
          kind: "notification",
          title: "Shoprite Awka",
          body: "Recognised in 1.2s",
          position: { top: "8%", left: "-14%" },
          delay: 0.2,
        },
        {
          kind: "stat",
          label: "Trip",
          value: "₦1,650",
          position: { bottom: "14%", left: "-8%" },
          delay: 0.3,
        },
      ]}
    />
  );
}

export function FareSplitFeature() {
  return (
    <FeatureMockup
      eyebrow="Fare split"
      title={
        <>
          Split it.<br className="hidden sm:block" /> Send it.
        </>
      }
      body="Going together? Drop a friend's number in the chat. Moveasy sends them a tap-to-pay link and splits the fare automatically. Works with card, transfer, or USSD."
      ctaLabel="Join the waitlist"
      ctaHref="#waitlist"
      tone="cream"
      watermark="SPLIT"
      mockupAlt="Moveasy fare split on WhatsApp"
      mockupPlaceholder={
        <ChatPlaceholder
          title="Moveasy"
          bubbles={[
            { side: "out", text: "Split this ride with +234 803 555 0142." },
            { side: "in", text: "₦700 each. Sent Tunde a confirm link." },
            { side: "in", text: "Tunde confirmed ✅" },
            { side: "out", text: "Sweet." },
          ]}
        />
      }
      decorations={[
        {
          kind: "icon-card",
          content: "🤝",
          position: { top: "8%", left: "-12%" },
          delay: 0.05,
        },
        {
          kind: "icon-card",
          content: "💳",
          position: { top: "32%", left: "-14%" },
          delay: 0.14,
        },
        {
          kind: "icon-card",
          content: "📱",
          position: { top: "58%", left: "-10%" },
          delay: 0.22,
        },
        {
          kind: "stat",
          label: "Per head",
          value: "₦700",
          position: { top: "10%", right: "-8%" },
          delay: 0.2,
        },
        {
          kind: "notification",
          title: "Tunde paid ₦700",
          body: "Just now · USSD",
          position: { bottom: "10%", right: "-14%" },
          delay: 0.3,
        },
      ]}
    />
  );
}
