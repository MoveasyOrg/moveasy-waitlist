import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Moveasy | Movement Made Easy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "white",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #4351B0 0%, #1B2A8F 45%, #0B123B 100%)",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1B2A8F",
              fontWeight: 700,
              fontSize: 32,
            }}
          >
            M
          </div>
          <div
            style={{
              fontSize: 28,
              fontStyle: "italic",
              letterSpacing: -0.5,
            }}
          >
            Moveasy
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              fontWeight: 500,
              letterSpacing: -2,
            }}
          >
            Move anywhere, like it&rsquo;s already booked.
          </div>
          <div style={{ fontSize: 26, color: "rgba(255,255,255,0.7)" }}>
            WhatsApp-native ride-hailing for Nigeria.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "rgba(255,255,255,0.6)",
            fontSize: 20,
          }}
        >
          <span>Born in Akwa. Built for Africa.</span>
          <span>moveasy.africa</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
