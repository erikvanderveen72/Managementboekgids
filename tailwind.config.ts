import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Source Serif 4", "Source Serif Pro", "Georgia", "serif"],
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      colors: {
        ink: {
          DEFAULT: "#1a1a1a",
          soft: "#3a3a3a",
          muted: "#6b6b6b",
        },
        paper: {
          DEFAULT: "#fafaf7",
          warm: "#f4f1ea",
        },
        accent: {
          DEFAULT: "#8a5a2b",
          soft: "#b88a5c",
        },
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
