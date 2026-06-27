"use client";

import { FeatureMockup } from "./feature-mockup";

function VoiceChatPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col bg-[#0a1a2e]">
      {/* WhatsApp-style header */}
      <div className="flex items-center gap-3 bg-[#0b2435] px-4 pb-3 pt-10 text-white">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-whatsapp text-[13px] font-bold">
          M
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold">Moveasy</p>
          <p className="text-[10px] text-white/55">online</p>
        </div>
      </div>
      {/* Bubbles */}
      <ul className="flex-1 space-y-2 overflow-hidden bg-[#0a1a2e] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_60%)] px-3 py-4">
        <li className="flex justify-end">
          <div className="rounded-tr-md rounded-2xl bg-[#005c4b] px-3 py-2 text-[11px] text-white shadow-sm">
            <p className="text-[9px] uppercase tracking-wider text-white/45">
              Voice note
            </p>
            <p className="mt-0.5">🎙 0:08</p>
          </div>
        </li>
        <li className="flex justify-start">
          <div className="max-w-[80%] rounded-tl-md rounded-2xl bg-[#1f2c33] px-3 py-2 text-[11px] leading-snug text-white/90 shadow-sm">
            Got you. Pickup Aroma Junction → drop UNIZIK gate. Comfort sedan,
            ₦1,400, ETA 4 min. Reply 1 to confirm.
          </div>
        </li>
        <li className="flex justify-end">
          <div className="rounded-tr-md rounded-2xl bg-[#005c4b] px-3 py-2 text-[11px] text-white shadow-sm">
            1
          </div>
        </li>
        <li className="flex justify-start">
          <div className="max-w-[80%] rounded-tl-md rounded-2xl bg-[#1f2c33] px-3 py-2 text-[11px] leading-snug text-white/90 shadow-sm">
            Confirmed ✅ Emeka in a silver Corolla, plate AKD-237-FG.
          </div>
        </li>
      </ul>
    </div>
  );
}

export function WhatsappDemo() {
  return (
    <FeatureMockup
      eyebrow="A chat, not an app"
      title={
        <>
          Send a voice note.<br className="hidden sm:block" /> Get a ride.
        </>
      }
      body="Pidgin, English, or a quick photo. The bot understands how Nigerians actually ask for things. Tap the mic, talk, hit send."
      tone="navy"
      watermark="VOICE"
      side="right"
      mockupAlt="Moveasy voice booking on WhatsApp"
      mockupPlaceholder={<VoiceChatPlaceholder />}
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
          position: { top: "32%", left: "-14%" },
          delay: 0.12,
        },
        {
          kind: "icon-card",
          content: "🚗",
          position: { top: "60%", left: "-10%" },
          delay: 0.2,
        },
        {
          kind: "stat",
          label: "Fare",
          value: "₦1,400",
          position: { top: "10%", right: "-8%" },
          delay: 0.18,
        },
        {
          kind: "notification",
          title: "ETA 4 min",
          body: "Emeka · Silver Corolla",
          position: { bottom: "8%", right: "-12%" },
          delay: 0.28,
        },
      ]}
    />
  );
}
