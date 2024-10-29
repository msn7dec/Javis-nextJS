/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'jarvis-blue': {
          100: '#E6F3FF',
          200: '#B3D9FF',
          300: '#80BFFF',
          400: '#4DA6FF',
          500: '#1A8CFF',
          600: '#0066CC',
          700: '#004C99',
          800: '#003366',
          900: '#001933',
        },
        'jarvis-dark': {
          100: '#D1D2D4',
          200: '#A3A5A9',
          300: '#76787E',
          400: '#484B53',
          500: '#1A1E28',
          600: '#151820',
          700: '#101218',
          800: '#0A0C10',
          900: '#050608',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
