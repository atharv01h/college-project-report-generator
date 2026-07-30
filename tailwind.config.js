/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        ui: ['Inter', 'sans-serif'],
        report: ['Merriweather', 'serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#6478ff',
          light: '#7c8fff',
          dark: '#4a5ce8',
        },
        accent: {
          DEFAULT: '#a78bfa',
          light: '#c4b5fd',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease both',
        'spin-slow': 'spin 2s linear infinite',
        'pulse-ring': 'pulseRing 1.5s infinite',
      },
    },
  },
  plugins: [],
};
