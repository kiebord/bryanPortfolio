import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#06070b",
        panel: "#0e111b",
        line: "#262b3c",
        muted: "#9ca6bd",
        accent: {
          DEFAULT: "#6268ff",
          soft: "#c8ff1a",
          deep: "#4b51e8",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(98, 104, 255, 0.42)",
        card: "0 20px 50px -20px rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [],
};

export default config;
