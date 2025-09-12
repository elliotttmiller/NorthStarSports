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
        // Primary Colors
        primary: {
          DEFAULT: '#0066cc',
          light: '#3385d6',
          dark: '#004499',
        },
        // Secondary Colors
        secondary: {
          DEFAULT: '#ff6b35',
          light: '#ff8c5e',
          dark: '#cc4f1c',
        },
        // Neutral Colors
        neutral: {
          50: '#f8f9fa',
          100: '#f1f3f4',
          200: '#e0e0e0',
          400: '#9aa0a6',
          600: '#666666',
          800: '#3c4043',
          900: '#1a1a1a',
        },
        // Status Colors
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif'
        ],
      },
      boxShadow: {
        'btn-primary': '0 2px 4px rgba(0, 102, 204, 0.2)',
        'btn-primary-hover': '0 4px 8px rgba(0, 102, 204, 0.3)',
        'btn-secondary': '0 2px 4px rgba(0, 102, 204, 0.1)',
        'btn-secondary-hover': '0 4px 8px rgba(0, 102, 204, 0.2)',
        'card': '0 2px 8px rgba(0,0,0,0.1)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.1)',
      },
      borderRadius: {
        'btn': '8px',
        'card': '12px',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;