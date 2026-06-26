import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1B2A8F",
          50: "#EEF0FB",
          100: "#D7DBF3",
          200: "#A5ADDD",
          300: "#737FC7",
          400: "#4351B0",
          500: "#1B2A8F",
          600: "#152273",
          700: "#101A57",
          800: "#0B123B",
          900: "#060920",
        },
        accent: {
          DEFAULT: "#F2A93B",
          soft: "#FFCB6E",
        },
        ink: "#0B123B",
        paper: "#FAFAF7",
        whatsapp: "#25D366",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(67,81,176,0.55) 0%, rgba(27,42,143,0.95) 45%, #0B123B 100%)",
        "glass-pill":
          "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 100%)",
      },
      boxShadow: {
        glass:
          "inset 0 1px 0 0 rgba(255,255,255,0.15), 0 8px 32px 0 rgba(6,9,32,0.35)",
        cta: "0 10px 30px -10px rgba(242,169,59,0.6)",
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
