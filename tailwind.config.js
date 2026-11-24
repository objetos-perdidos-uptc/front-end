/** @type {import('tailwindcss').Config} */
// Tokens documentados en DESIGN.md (paleta, contraste, radios, sombras y motion).
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F766E',
          hover: '#115E59',
          strong: '#115E59',
          soft: '#E7F3F0',
          panel: '#134E4A',
        },
        accent: {
          DEFAULT: '#E8875A',
          soft: '#FDEFE6',
          text: '#9A4416',
        },
        destructive: {
          DEFAULT: '#B42318',
          hover: '#912018',
        },
        bg: '#F8F7F4',
        surface: {
          DEFAULT: '#FFFFFF',
          elevated: '#FFFFFF',
          muted: '#F0EEE9',
        },
        border: {
          DEFAULT: '#E6E2DA',
          strong: '#CFC9BE',
        },
        ink: {
          primary: '#1C1917',
          secondary: '#57534E',
          tertiary: '#6F6862',
          inverse: '#FFFFFF',
        },
        success: { bg: '#E6F4EA', text: '#1D6B3A' },
        warning: { bg: '#FDF2D9', text: '#8A5300' },
        error: { bg: '#FCEAE7', text: '#A3261A' },
        info: { bg: '#E7EFFA', text: '#1E4E8C' },
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '14px',
        xl: '20px',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        md: '0 4px 12px rgba(0,0,0,0.08)',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0, 0, 0.2, 1)',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'dropdown-in': {
          from: { opacity: '0', transform: 'translateY(-4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'drawer-in': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'toast-in-right': {
          from: { opacity: '0', transform: 'translateX(16px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'toast-in-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s linear infinite',
        'spin-slow': 'spin 800ms linear infinite',
        'fade-in': 'fade-in 200ms ease-out',
        'dropdown-in': 'dropdown-in 150ms ease-out',
        'drawer-in': 'drawer-in 250ms ease-out',
        'toast-in-right': 'toast-in-right 250ms ease-out',
        'toast-in-up': 'toast-in-up 250ms ease-out',
      },
    },
  },
  plugins: [],
}
