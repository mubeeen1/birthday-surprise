/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cursive: ['"Great Vibes"', 'cursive'],
        heading: ['"Playfair Display"', 'serif'],
        body: ['"Lato"', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      colors: {
        // User's exact romantic floral bouquet palette
        blush: '#F0C4CB',
        antiqueRose: '#C87D87',
        champagne: '#FBEAD6',
        driedThyme: '#6B7556',
        bisque: '#E5BCA9',
        
        // Derived organic dark background tones for depth and contrast
        velvet: '#242A1D',     // Thyme-Dark (deep moss-green velvet)
        shadow: '#141710',     // Thyme-Shadow (deep forest thyme-black)
        thymeDeep: '#1A1F14',  // Thyme-Deep
        
        // Backward-compatible mappings for instant app-wide integration
        cream: '#FBEAD6',      // Champagne
        ivory: '#FBEAD6',      // Champagne
        pearl: '#FBEAD6',      // Champagne
        rose: '#F0C4CB',       // Blush
        mauve: '#C87D87',      // Antique Rose
        burgundy: '#242A1D',   // Thyme-Dark
        deeprose: '#C87D87',   // Antique Rose
        gold: '#C87D87',       // Antique Rose (romantic luxury accent)
        dusty: '#C87D87',      // Antique Rose
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'shimmer': 'shimmer 4s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'drift': 'drift 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)', opacity: '0.6' },
          '50%': { transform: 'translateY(-30px)', opacity: '0.3' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.8' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(184, 149, 106, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(184, 149, 106, 0.6)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateX(0px) translateY(0px)' },
          '33%': { transform: 'translateX(30px) translateY(-20px)' },
          '66%': { transform: 'translateX(-20px) translateY(20px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'luxe': '0 20px 60px rgba(21, 2, 7, 0.5)',
        'gold-glow': '0 0 40px rgba(212, 175, 55, 0.35)',
        'cinematic': '0 50px 100px rgba(0, 0, 0, 0.45)',
      },
    },
  },
  plugins: [],
};