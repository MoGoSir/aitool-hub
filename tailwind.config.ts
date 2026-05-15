import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366F1",
          dark: "#4F46E5",
          light: "#EEF2FF",
        },
        accent: {
          DEFAULT: "#10B981",
          alt: "#F59E0B",
        },
        surface: {
          DEFAULT: "#F8FAFC",
          dark: "#F1F5F9",
        },
      },
      fontFamily: {
        heading: ["Inter", "system-ui", "sans-serif"],
        body: ["Source Sans 3", "sans-serif"],
        sans: ["Inter", "Noto Sans SC", "system-ui", "sans-serif"],
      },
      borderRadius: {
        btn: "8px",
        card: "12px",
        modal: "16px",
        badge: "6px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
