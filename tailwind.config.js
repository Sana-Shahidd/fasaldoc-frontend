/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  '#f0f7f4',
          100: '#dceee6',
          200: '#bbddd0',
          300: '#8ec4b0',
          400: '#5da48c',
          500: '#3d8870',
          600: '#2d6a57',
          700: '#255546',
          800: '#1b4332',
          900: '#173828',
        },
        wheat: {
          100: '#fdf5eb',
          200: '#f9e4c8',
          300: '#f3cfa0',
          400: '#ebb577',
          500: '#d4a574',
          600: '#c4895a',
        },
        earth: {
          50:  '#f8f5f0',
          100: '#f0ebe2',
          200: '#e0d5c5',
          300: '#c8b8a2',
        },
        severity: {
          high:     '#c0392b',
          moderate: '#e67e22',
          low:      '#52796f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        urdu: ['Noto Nastaliq Urdu', 'serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft':  '0 2px 16px rgba(27,67,50,0.08)',
        'card':  '0 4px 24px rgba(27,67,50,0.12)',
        'float': '0 8px 32px rgba(27,67,50,0.16)',
      },
      animation: {
        'fade-up':    'fadeUp 0.4s ease-out',
        'fade-in':    'fadeIn 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'shimmer':    'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
