/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'w1220': '1220px',
      },
      colors: {
        text: {
          base: 'rgba(0, 0, 0, 0.87)',
          blue: {
            DEFAULT: 'rgba(52, 153, 253, 1)',
            dark: 'rgba(0, 159, 227, 1)'
          },
          grey: {
            DEFAULT: 'rgba(0, 0, 0, 0.54)' 
          },
          white: {
            DEFAULT: 'rgba(255, 255, 255, 1)'
          }
        },
        background: {
          blue: {
            DEFAULT: 'rgba(52, 153, 253, 1)',
            dark: 'rgba(0, 159, 227, 1)'
          },
          green: {
            DEFAULT: 'rgba(0, 188, 212, 1)'
          },
          yellow: {
            DEFAULT: 'rgba(255, 165, 17, 1)'
          }
        }
      }
    },
  },
  plugins: [],
}