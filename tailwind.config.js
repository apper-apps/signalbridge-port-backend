/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#0052CC',
          600: '#0047b3',
          700: '#003d99',
          800: '#003280',
          900: '#002966',
        },
        secondary: {
          500: '#1E3A5F',
          600: '#1a3452',
          700: '#162e45',
          800: '#122838',
          900: '#0e222b',
        },
        accent: {
          400: '#4dd4c7',
          500: '#00D4AA',
          600: '#00c099',
          700: '#00ab88',
          800: '#009677',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#1A1F2E',
          600: '#171c2a',
          700: '#141926',
          800: '#111622',
          900: '#0e131e',
        },
        background: {
          500: '#0D1117',
          600: '#0b0f15',
          700: '#090d13',
          800: '#070b11',
          900: '#05090f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Monaco', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0052CC 0%, #1E3A5F 100%)',
        'gradient-accent': 'linear-gradient(135deg, #00D4AA 0%, #0052CC 100%)',
        'gradient-surface': 'linear-gradient(135deg, #1A1F2E 0%, #0D1117 100%)',
      },
      boxShadow: {
        'premium': '0 4px 20px rgba(0, 82, 204, 0.15)',
        'card': '0 4px 8px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 20px rgba(0, 212, 170, 0.3)',
      }
    },
  },
  plugins: [],
}