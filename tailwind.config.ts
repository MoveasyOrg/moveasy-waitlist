import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Delivered brand palette (see /bramd-assets-moveasy/Color/Frame 24.png)
        navy: {
          DEFAULT: "#14306B",
          50: "#EEF1F8",
          100: "#D7DEEE",
          200: "#A2B0D2",
          300: "#7286B4",
          400: "#506694",
          500: "#2C4882",
          600: "#14306B",
          700: "#0F2454",
          800: "#0A1839",
          900: "#060B22",
        },
        accent: {
          // Primary vivid orange from the brand pack
          DEFAULT: "#EC7501",
          soft: "#F2A93B",
          light: "#FCCD87",
        },
        ink: "#0A1839",
        paper: "#FAFAF7",
        whatsapp: "#25D366",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(80,102,148,0.55) 0%, rgba(20,48,107,0.95) 45%, #0A1839 100%)",
        "glass-pill":
          "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 100%)",
      },
      boxShadow: {
        glass:
          "inset 0 1px 0 0 rgba(255,255,255,0.15), 0 8px 32px 0 rgba(6,11,34,0.35)",
        cta: "0 10px 30px -10px rgba(236,117,1,0.55)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out both",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
