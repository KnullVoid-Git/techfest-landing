import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#08080c",
          elevated: "#0f0f17",
          card: "rgba(255, 255, 255, 0.03)",
        },
        accent: {
          DEFAULT: "#39ff88",
          lime: "#c6ff3d",
          glow: "rgba(57, 255, 136, 0.25)",
          dark: "#1e8a4a",
        },
        ink: {
          DEFAULT: "#f4eeff",
          muted: "#a99cc4",
          dim: "#6b6280",
        },
        cyber: {
          violet: "#9b5cff",
          blue: "#3d7bff",
          pink: "#ff3d81",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          glow: "rgba(57, 255, 136, 0.35)",
        }
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "scanline": "scanline 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
