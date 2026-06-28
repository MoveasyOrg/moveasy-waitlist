"use client";

import { FeatureMockup } from "./feature-mockup";
import { WhatsappChat } from "./whatsapp-chat";

function VoiceChatPlaceholder() {
  return (
    <WhatsappChat
      bubbles={[
        { kind: "voice", side: "out", length: "0:08", time: "07:42" },
        {
          kind: "text",
          side: "in",
          text: (
            <>
              Got you. Pickup <b>Aroma Junction</b> → drop <b>UNIZIK gate</b>.
              Comfort sedan, ₦1,400, ETA 4 min. Reply 1 to confirm.
            </>
          ),
          time: "07:42",
        },
        { kind: "text", side: "out", text: "1", time: "07:43" },
        {
          kind: "text",
          side: "in",
          text: (
            <>
              Confirmed ✅ Emeka in a silver Corolla, plate{" "}
              <b>AKD-237-FG</b>. Live track: m.ee/t/9k2
            </>
          ),
          time: "07:43",
        },
        {
          kind: "text",
          side: "in",
          text: "Emeka is 2 min away. He's almost at the gate.",
          time: "07:45",
        },
        { kind: "text", side: "out", text: "Thanks 🙏", time: "07:45" },
        {
          kind: "text",
          side: "in",
          text: "Trip started. Safe ride 👋",
          time: "07:47",
        },
      ]}
    />
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
          kind: "stat",
          label: "Fare",
          value: "₦1,400",
          position: { top: "16%", right: "-8%" },
          delay: 0.18,
        },
        {
          kind: "notification",
          title: "Ride confirmed",
          body: "Emeka · Silver Corolla",
          position: { top: "44%", left: "-10%" },
          delay: 0.24,
        },
        {
          kind: "notification",
          title: "ETA 4 min",
          body: "On the way to pickup",
          position: { bottom: "12%", right: "-10%" },
          delay: 0.32,
        },
      ]}
    />
  );
}
