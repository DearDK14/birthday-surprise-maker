/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // RCB-inspired luxury palette:
        // Flame Red: #C8102E
        // Black: #111111
        // Gold: #D4AF37
        // Light Gold: #F7E7B4
        // White: #FFFFFF
        // Jersey Navy, Red, and Gold palette:
        navy: {
          DEFAULT: '#0A0E2A',
          deep: '#06091D',
          royal: '#121A4A',
          light: '#1B2462',
        },
        flame: {
          DEFAULT: '#C8102E',
          dark: '#A00C24',
          deep: '#7A091B',
          light: '#E02B47',
          soft: '#FDECEF',
        },
        rcb: {
          navy: '#0A0E2A',
          royalBlue: '#121A4A',
          red: '#C8102E',
          black: '#111111',
          gold: '#D4AF37',
          lightGold: '#F7E7B4',
          white: '#FFFFFF',
          darkBg: '#0A0E2A',
          cardBg: '#1A1A1A',
          creamBg: '#FAF6EB',
          champagne: '#F7E7B4',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F7E7B4',
          pale: '#FAF0D4',
          metallic: '#C59E27',
          dark: '#9A7A18',
        },
        luxury: {
          black: '#111111',
          charcoal: '#1A1A1A',
          darkGray: '#262626',
          midGray: '#4A4A4A',
          subText: '#666666',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cursive: ['"Caveat"', '"Great Vibes"', 'cursive'],
      },
      backgroundImage: {
        'jersey-gradient': 'linear-gradient(180deg, #0A0E2A 0%, #121A4A 30%, #3B1638 55%, #8B1229 78%, #C8102E 100%)',
        'jersey-shared': 'linear-gradient(180deg, #0B0F2E 0%, #141B48 28%, #421639 52%, #93122A 76%, #C8102E 100%)',
        'jersey-diagonal': 'linear-gradient(135deg, #0A0E2A 0%, #121A4A 35%, #4C1635 65%, #C8102E 100%)',
        'flame-gradient': 'linear-gradient(135deg, #C8102E 0%, #A00C24 100%)',
        'flame-gold': 'linear-gradient(135deg, #C8102E 0%, #D4AF37 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F7E7B4 100%)',
        'luxury-dark': 'linear-gradient(135deg, #111111 0%, #1A1A1A 50%, #262626 100%)',
        'cream-gold': 'linear-gradient(to bottom, #FFFDF8 0%, #FAF6EB 50%, #F7E7B4 100%)',
      },
      boxShadow: {
        'glow-red': '0 0 20px rgba(200, 16, 46, 0.35)',
        'glow-gold': '0 0 20px rgba(212, 175, 55, 0.4)',
        'glow-luxury': '0 8px 32px rgba(17, 17, 17, 0.15)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'twinkle': 'twinkle 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
      },
    },
  },
  plugins: [],
}
