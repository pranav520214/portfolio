import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Editorial Warm Paper System
        paper: {
          DEFAULT: "#F5F4EF",
          elevated: "#FFFFFF",
          muted: "#EDECE5",
          faint: "#E5E3D8",
        },
        ink: {
          DEFAULT: "#111111",
          secondary: "#444444",
          muted: "#666666",
          faint: "#999999",
          border: "#D8D6CD",
        },
        engine: {
          red: "#D94431",
          orange: "#E05338",
          amber: "#D97706",
          blue: "#2563EB",
          green: "#16A34A",
        },
        // Dark Lab Instrumentation Panels
        lab: {
          black: "#0A0A0A",
          panel: "#121212",
          card: "#181818",
          border: "rgba(255, 255, 255, 0.12)",
          faint: "rgba(255, 255, 255, 0.05)",
        },
        blueprint: {
          950: "#080302",
          900: "#120605",
          850: "#1a0806",
          800: "#2a0d09",
          700: "#481610",
          600: "#7c2217",
          500: "#b83222",
          red: "#d94431",
          bright: "#ff4d36",
          orange: "#ea580c",
        },
        comic: {
          yellow: "#ffe600",
          bright: "#fff033",
          gold: "#facc15",
          amber: "#f59e0b",
        },
        technical: {
          white: "#fff8f0",
          cream: "#f5ece2",
          muted: "#8c7a72",
          line: "rgba(255, 230, 0, 0.2)",
          grid: "rgba(255, 255, 255, 0.07)",
          cyan: "#38bdf8",
          green: "#4ade80",
        },
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        display: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        comic: "4px 4px 0px #000000",
        "comic-lg": "8px 8px 0px #000000",
        "comic-yellow": "4px 4px 0px #ffe600",
        "blueprint-glow": "0 0 25px rgba(217, 68, 49, 0.4)",
        "yellow-glow": "0 0 20px rgba(255, 230, 0, 0.35)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 25s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
