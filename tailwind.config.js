/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0B0F19',
          900: '#111827',
          800: '#1A2234',
        },
        slate: {
          850: '#1E293B',
          800: '#233045',
        },
        violet: {
          500: '#7657F6',
          600: '#6442E8',
          700: '#522ED9',
          100: '#F0ECFE',
          50: '#F7F5FE',
        },
        purple: {
          soft: '#A99BFF',
          muted: '#8F7EFF',
        },
        cyan: {
          accent: '#42C5D8',
          glow: '#2BB9CE',
          light: '#E6F9FC',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F8FAFC',
          subtle: '#F1F5F9',
        },
        canvas: '#F7F8FC',
        txt: {
          primary: '#20243A',
          secondary: '#777E91',
          muted: '#9CA3AF',
        },
        status: {
          success: '#16A36A',
          warning: '#E9A23B',
          error: '#DC5454',
          info: '#2563EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(17, 24, 39, 0.05), 0 1px 4px -1px rgba(17, 24, 39, 0.03)',
        'soft-md': '0 8px 24px -4px rgba(17, 24, 39, 0.08), 0 4px 12px -2px rgba(17, 24, 39, 0.04)',
        'soft-lg': '0 16px 36px -6px rgba(17, 24, 39, 0.1), 0 6px 16px -2px rgba(17, 24, 39, 0.05)',
        'glow-violet': '0 0 25px -4px rgba(118, 87, 246, 0.35)',
        'glow-cyan': '0 0 25px -4px rgba(66, 197, 216, 0.35)',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        }
      },
      animation: {
        scan: 'scan 2.5s ease-in-out infinite',
        shimmer: 'shimmer 2.5s infinite linear',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
