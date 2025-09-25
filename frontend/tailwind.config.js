/** @type {import('tailwindcss').Config} */
/**
 * Tailwind CSS Design Tokens for NorthStar Sports
 * - All custom colors, border radius, and spacing tokens are centralized here
 * - Remove unused tokens for maintainability
 * - Reference CSS variables for dynamic theming
 */
module.exports = {
  content: [
    "./index.html",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx}",
    "./src/context/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        accent: '#3b82f6',
        destructive: '#ef4444',
        muted: '#f3f4f6',
        foreground: '#111827',
        win: "var(--color-win)",
        loss: "var(--color-loss)",
        info: "var(--color-info)",
        neutral1: "var(--color-neutral-1)",
        neutral10: "var(--color-neutral-10)",
        accent9: "var(--color-accent-9)",
        accentSecondary9: "var(--color-accent-secondary-9)",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
      spacing: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
        40: "10rem",
        48: "12rem",
        56: "14rem",
        64: "16rem",
      },
      screens: {
        coarse: { raw: "(pointer: coarse)" },
        fine: { raw: "(pointer: fine)" },
        pwa: { raw: "(display-mode: standalone)" },
      },
    },
  },
  plugins: [
    require("tailwindcss-fluid"),
    require("@tailwindcss/container-queries"),
  ],
};
