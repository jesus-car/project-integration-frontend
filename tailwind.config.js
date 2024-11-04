/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
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
      }
    },
    animation: {
      'slide-in': 'slide-in 0.3s ease-out'
    }
  },
};
export const plugins = [];