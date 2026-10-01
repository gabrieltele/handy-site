/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050507',
          900: '#0a0a0d',
          800: '#111116',
          700: '#1a1a21',
        },
        handy: {
          DEFAULT: '#1e2a6b',
          50: '#eef1ff',
          200: '#b9c3ff',
          300: '#8d9cf5',
          400: '#6474e0',
          500: '#3f4fc2',
          600: '#2c3a99',
          700: '#1e2a6b',
          800: '#16204f',
          900: '#0e1535',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      maxWidth: {
        site: '1240px',
      },
    },
  },
  plugins: [],
};
