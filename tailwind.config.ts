import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      colors: {
        primary: {
          500: '#88663C', // Copper: icon, line, border
          600: '#50341B', // Primary CTA, titles
          700: '#6D502D', // Hover, header text
        },
        dark: {
          DEFAULT: '#2B1B0E', // Footer, dark areas
        },
        background: {
          DEFAULT: '#F9F6EA', // Warm cream section bg
        },
        card: {
          DEFAULT: '#FFFFFF',
        },
        text: {
          DEFAULT: '#2B1B0E',
          muted: '#6D502D',
        },
        border: {
          DEFAULT: '#E2CFB0', // Thin line (champagne be)
        },
        accent: {
          DEFAULT: '#E2CFB0', // Badge, secondary CTA hover, card tint
        },
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.93)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        'slide-left': {
          from: { opacity: '0', transform: 'translateX(-24px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-up':    'fade-up   0.65s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':    'fade-in   0.6s  ease-out                   both',
        'scale-in':   'scale-in  0.5s  cubic-bezier(0.16,1,0.3,1) both',
        'slide-left': 'slide-left 0.6s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
};
export default config;
