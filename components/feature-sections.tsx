"use client";

import { FeatureMockup } from "./feature-mockup";
import { WhatsappChat } from "./whatsapp-chat";

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
        <WhatsappChat
          bubbles={[
            {
              kind: "image",
              side: "out",
              src: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=480&q=70&auto=format&fit=crop",
              caption: "Heading here 👇",
              time: "14:02",
            },
            {
              kind: "text",
              side: "in",
              text: (
                <>
                  That&rsquo;s <b>Shoprite Awka</b> on Zik Avenue. Want me to
                  book it?
                </>
              ),
              time: "14:02",
            },
            {
              kind: "location",
              side: "in",
              place: "Shoprite Awka",
              sub: "Zik Avenue, Awka",
              time: "14:02",
            },
            { kind: "text", side: "out", text: "Yes, book it", time: "14:03" },
            {
              kind: "text",
              side: "in",
              text: "Booking now. Comfort sedan, ₦1,650, ETA 6 min.",
              time: "14:03",
            },
            {
              kind: "text",
              side: "in",
              text: (
                <>
                  Confirmed ✅ <b>Chinedu</b> in a grey Camry, plate{" "}
                  <b>AKD-441-CN</b>.
                </>
              ),
              time: "14:04",
            },
          ]}
        />
      }
      decorations={[
        {
          kind: "notification",
          title: "Shoprite Awka",
          body: "Recognised in 1.2s",
          position: { top: "18%", left: "-10%" },
          delay: 0.2,
        },
        {
          kind: "stat",
          label: "Trip",
          value: "₦1,650",
          position: { top: "20%", right: "-8%" },
          delay: 0.28,
        },
        {
          kind: "notification",
          title: "Driver assigned",
          body: "Chinedu · Grey Camry",
          position: { bottom: "14%", right: "-10%" },
          delay: 0.36,
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
        <WhatsappChat
          bubbles={[
            {
              kind: "text",
              side: "out",
              text: "Split this ride with +234 803 555 0142.",
              time: "16:18",
            },
            {
              kind: "text",
              side: "in",
              text: (
                <>
                  ₦700 each. Sent <b>Tunde</b> a confirm link.
                </>
              ),
              time: "16:18",
            },
            {
              kind: "text",
              side: "in",
              text: "Tunde confirmed ✅",
              time: "16:19",
            },
            { kind: "text", side: "out", text: "Sweet 💸", time: "16:19" },
            {
              kind: "text",
              side: "in",
              text: "Both rides paid. Trip starting in 1 min.",
              time: "16:20",
            },
            {
              kind: "text",
              side: "in",
              text: "Receipt: m.ee/r/4qp",
              time: "16:20",
            },
          ]}
        />
      }
      decorations={[
        {
          kind: "stat",
          label: "Per head",
          value: "₦700",
          position: { top: "16%", left: "-8%" },
          delay: 0.2,
        },
        {
          kind: "notification",
          title: "Tunde paid ₦700",
          body: "Just now · USSD",
          position: { top: "46%", right: "-10%" },
          delay: 0.28,
        },
        {
          kind: "notification",
          title: "Both rides paid",
          body: "Trip starting in 1 min",
          position: { bottom: "14%", left: "-10%" },
          delay: 0.36,
        },
      ]}
    />
  );
}
