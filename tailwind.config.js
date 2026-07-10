/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#FFF8F3',
          100: '#FFF1E8',
          200: '#FFE2D6',
        },
        gumamela: {
          400: '#F0708C',
          500: '#E14D6E',
          600: '#C93A5B',
          700: '#A62B49',
        },
        marigold: {
          300: '#F4C868',
          400: '#EDAD3F',
          500: '#DB9526',
          600: '#B87A1A',
        },
        narra: {
          600: '#5A3B34',
          700: '#432A25',
          800: '#331F1B',
        },
        sampaguita: '#FFFDF9',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
        script: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(225, 77, 110, 0.25)',
        soft: '0 20px 60px -15px rgba(67, 42, 37, 0.35)',
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(circle at 50% 0%, rgba(244, 200, 104, 0.25), transparent 60%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-24px) rotate(2deg)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        flicker: {
          '0%, 100%': { opacity: 1, transform: 'scaleY(1)' },
          '45%': { opacity: 0.7, transform: 'scaleY(0.92)' },
          '55%': { opacity: 0.9, transform: 'scaleY(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        floatSlow: 'floatSlow 5s ease-in-out infinite',
        flicker: 'flicker 1.8s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}
