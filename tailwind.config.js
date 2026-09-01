/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nordic: {
          bg: '#FAF9F6',          // Warm chalk paper
          surface: '#FFFFFF',     // Crisp white surface
          stone: '#F4F2EC',       // Subtle stone container
          hover: '#EFECE3',       // Slightly darker stone
          border: '#E3DFD5',      // Soft border line
          darkBorder: '#CAC4B5',
          text: '#1C1B18',        // Charcoal ink
          muted: '#6E6B65',       // Secondary warm grey
          lightMuted: '#9B9890',  // Tertiary grey
          pine: '#264E36',        // Nordic evergreen
          spruce: '#3B6E4C',
          fjord: '#22577A',       // Nordic deep water
          arctic: '#38A3A5',      // Ice blue/cyan
          sand: '#DDA15E',        // Warm wood/amber
          terracotta: '#BC6C25',  // Warm clay
          lingonberry: '#B93E3E', // Nordic red
          lavender: '#6B5B95',    // Muted purple
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        hand: ['"Caveat"', '"Indie Flower"', 'cursive'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      boxShadow: {
        'nordic-sm': '0 1px 2px rgba(28, 27, 24, 0.04), 0 1px 1px rgba(28, 27, 24, 0.02)',
        'nordic': '0 4px 12px rgba(28, 27, 24, 0.05), 0 1px 3px rgba(28, 27, 24, 0.03)',
        'nordic-lg': '0 12px 32px rgba(28, 27, 24, 0.08), 0 2px 6px rgba(28, 27, 24, 0.04)',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}
