import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Палитра Deep Color: «Тёплый минимализм»
        graphite: {
          DEFAULT: '#14171A',
          deep: '#0F1113',
          panel: '#1C2022',
          soft: '#262B2E',
        },
        milk: {
          DEFAULT: '#EDE7DC',
          soft: '#F4F0E8',
        },
        wood: {
          default: '#7C5534',
          walnut: '#52331F',
          teak: '#6E3B2A',
          oak: '#C39B6F',
          muted: '#8A6B4F',
        },
        accent: {
          DEFAULT: '#D09A6B',
          soft: '#C98A5A',
        },
        muted: {
          DEFAULT: '#9B958B',
          soft: '#7A746C',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tightest: '0.22em',
      },
    },
  },
  plugins: [],
};

export default config;
