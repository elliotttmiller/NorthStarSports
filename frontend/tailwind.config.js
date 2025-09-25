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
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        border: "var(--color-neutral-7)",
        input: "var(--color-neutral-7)",
        ring: "var(--color-accent-9)",
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
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-full)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-fluid"),
    require("@tailwindcss/container-queries"),
  ],
};
