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
        primary: {
          600: '#0EA5E9', // Primary CTA
          700: '#0284C7', // Primary Hover
        },
        dark: {
          DEFAULT: '#0F172A', // Dark Accent (header/footer)
        },
        background: {
          DEFAULT: '#F9FAFB',
        },
        card: {
          DEFAULT: '#FFFFFF',
        },
        text: {
          DEFAULT: '#111827',
          muted: '#6B7280',
        },
        border: {
          DEFAULT: '#E5E7EB',
        },
      },
    },
  },
  plugins: [],
};
export default config;
