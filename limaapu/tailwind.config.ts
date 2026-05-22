/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          50: '#faf8f5',
          100: '#f3ede5',
          200: '#e6d9c7',
          300: '#d4bfa3',
          400: '#c1a07a',
          500: '#b4885c',
          600: '#a6734e',
          700: '#8b5d42',
          800: '#724d3a',
          900: '#5e4033',
          950: '#332019',
        },
        slate: {
          50: '#f6f7f8',
          100: '#e8eaed',
          200: '#d5d8de',
          300: '#b5bac4',
          400: '#9199a7',
          500: '#757e8e',
          600: '#5f6776',
          700: '#4d5461',
          800: '#424852',
          900: '#3a3f47',
          950: '#1e2127',
        },
        mineral: {
          amber: '#d4a853',
          copper: '#b87333',
          quartz: '#e8e4df',
          obsidian: '#1a1a2e',
          basalt: '#2d2d3f',
          granite: '#8b8680',
          limestone: '#d4c5a9',
          sandstone: '#c4a882',
          shale: '#6b6b7b',
          coal: '#1c1c1c',
        },
        accent: {
          gold: '#c9a84c',
          rust: '#a0522d',
          teal: '#2d6a6a',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 10s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'strata-shift': 'strataShift 20s ease-in-out infinite',
        'crystal-spin': 'crystalSpin 15s linear infinite',
        'particle-float': 'particleFloat 12s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'reveal': 'reveal 1s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.2)' },
        },
        strataShift: {
          '0%, 100%': { transform: 'translateX(0) skewX(0deg)' },
          '25%': { transform: 'translateX(10px) skewX(2deg)' },
          '75%': { transform: 'translateX(-10px) skewX(-2deg)' },
        },
        crystalSpin: {
          '0%': { transform: 'rotateY(0deg) rotateX(15deg)' },
          '100%': { transform: 'rotateY(360deg) rotateX(15deg)' },
        },
        particleFloat: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0.3' },
          '25%': { transform: 'translate(50px, -30px) rotate(90deg)', opacity: '0.8' },
          '50%': { transform: 'translate(-20px, -60px) rotate(180deg)', opacity: '0.5' },
          '75%': { transform: 'translate(-40px, -20px) rotate(270deg)', opacity: '0.7' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        reveal: {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
      },
      backgroundImage: {
        'strata-gradient': 'linear-gradient(180deg, #1a1a2e 0%, #2d2d3f 25%, #3a3f47 50%, #5e4033 75%, #8b5d42 100%)',
        'earth-gradient': 'linear-gradient(135deg, #1a1a2e 0%, #2d2d3f 50%, #5e4033 100%)',
        'mineral-gradient': 'linear-gradient(135deg, #d4a853 0%, #b87333 50%, #a0522d 100%)',
      },
    },
  },
  plugins: [],
}
