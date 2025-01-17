/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-dark': {
          DEFAULT: 'rgba(17, 24, 39, 0.95)',
          lighter: 'rgba(17, 24, 39, 0.98)'
        },
        'accent': {
          primary: 'var(--accent-primary)',
          secondary: 'var(--accent-secondary)'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class'
    })
  ]
}