/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2fcf7',
          100: '#dcfce7',
          400: '#74dcae',
          500: '#47C68E', // UUPAY 主色
          600: '#16a34a',
          700: '#000',
          900: '#064e3b',
        },
        slate: {
          850: '#1e293b', // 柔和黑
        },
      },
      fontFamily: {
        sans: [
          'SF Pro Display',
          '-apple-system',
          'BlinkMacSystemFont',
          'PingFang SC',
          'Microsoft YaHei',
          'sans-serif'
        ],
      },
      boxShadow: {
        glow: '0 0 20px -5px rgba(71, 198, 142, 0.5)',
        card: '0 10px 40px -10px rgba(0,0,0,0.05)',
        float: '0 20px 50px -12px rgba(0,0,0,0.1)',
      },
      animation: {
        blob: 'blob 7s infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'badge-glow': 'badgeGlow 2s ease-in-out infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        badgeGlow: {
          '0%, 100%': {
            boxShadow: '0 4px 20px rgba(71, 198, 142, 0.6), 0 0 0 0 rgba(71, 198, 142, 0.4)',
            transform: 'scale(1)',
          },
          '50%': {
            boxShadow: '0 4px 30px rgba(71, 198, 142, 0.8), 0 0 0 4px rgba(71, 198, 142, 0.2)',
            transform: 'scale(1.05)',
          },
        },
      },
    },
  },
  plugins: [],
}
