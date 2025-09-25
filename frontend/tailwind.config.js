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
        border: "var(--color-border)",
        input: "var(--color-border)",
        ring: "var(--color-focus-ring)",
        background: "var(--color-bg)",
        foreground: "var(--color-fg)",
        primary: {
          DEFAULT: "var(--color-accent-9)",
          foreground: "var(--color-accent-contrast)",
        },
        secondary: {
          DEFAULT: "var(--color-neutral-11)",
          foreground: "var(--color-fg-secondary)",
        },
        destructive: {
          DEFAULT: "oklch(0.55 0.15 0)",
          foreground: "var(--color-accent-contrast)",
        },
        muted: {
          DEFAULT: "var(--color-neutral-12)",
          foreground: "var(--color-fg-secondary)",
        },
        accent: {
          DEFAULT: "var(--color-accent-9)",
          foreground: "var(--color-accent-contrast)",
        },
        popover: {
          DEFAULT: "var(--color-bg-inset)",
          foreground: "var(--color-fg)",
        },
        card: {
          DEFAULT: "var(--color-card)",
          foreground: "var(--color-fg)",
        },
        win: "var(--color-accent-secondary-9)",
        lose: "oklch(0.55 0.15 0)",
        info: "var(--color-accent-9)",
        neutral1: "var(--color-neutral-1)",
        neutral10: "var(--color-neutral-10)",
        accent9: "var(--color-accent-9)",
        accentSecondary9: "var(--color-accent-secondary-9)",
      },
      borderRadius: {
        lg: "var(--size-6)",
        xl: "var(--size-8)",
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
