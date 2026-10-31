import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './constants/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './views/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // Custom keyframe animations used in globals.css
      // These allow Tailwind's JIT to purge them correctly
      animation: {
        'subtle-zoom': 'subtle-zoom 20s ease-in-out infinite alternate',
        'slide-up-fade': 'slide-up-fade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        'progress': 'progress 6s linear',
      },
      keyframes: {
        'subtle-zoom': {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.08) translate(-0.5%, -0.5%)' },
        },
        'slide-up-fade': {
          '0%': { opacity: '0', transform: 'translateY(24px) scale(0.99)', filter: 'blur(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)', filter: 'blur(0)' },
        },
        'progress': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
