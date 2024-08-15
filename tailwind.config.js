/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        glow: 'glow 2s infinite'
      }, 
      keyframes: {
        glow:{
          '0%': { boxShadow: '0 0 0px rgba(0, 0, 0, 0)' },
          '50%': { boxShadow: '0 0 15px rgba(0, 153, 255, 0.6)' },
          '100%': { boxShadow: '0 0 0px rgba(0, 0, 0, 0)' }
        }
      },
      zIndex: {
        '10' : '10',
      },
      spaceing: {
        '10' : '2.5rem'
      }
    },
  },
  plugins: [],
}

