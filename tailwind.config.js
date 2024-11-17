/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    screens: {
      'xs': {'max': '426px'},
    },
    colors: {
      primary: '#91b07c',
      primaryHover: '#48653c',
      secondary: '#E5C6A4',
      secondaryHover: '#9E6552'
    },
    backgroundColor: {
      base: '#F4F0E3'
    },
    keyframes: {
      'slide-in': {
        '0%': { transform: 'translateX(100%)' },
        '100%': { transform: 'translateX(0)' }
      },
      pulse: {
        '0%, 100%': { opacity: 1 },
        '50%': { opacity: .5 },
      },
    },
    animation: {
      'slide-in': 'slide-in 0.3s ease-out',
      pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    }
  },
};
export const plugins = [];