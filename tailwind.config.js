/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'emo-bg': '#f5f5f5',
        'emo-surface': '#ffffff',
        'emo-text': '#1a1a1a',
        'emo-accent': '#6366f1',
        'emo-accent-light': '#818cf8',
      },
      animation: {
        'jitter': 'jitter 0.3s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        jitter: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px) rotate(-1deg)' },
          '75%': { transform: 'translateX(2px) rotate(1deg)' },
        },
      },
    },
  },
  plugins: [],
}

