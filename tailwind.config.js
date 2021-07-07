const colors = require('tailwindcss/colors');

module.exports = {
  // mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      gray: colors.trueGray,
      red: colors.red,
      blue: colors.indigo,
      yellow: colors.amber,
    },
    extend: {
      colors: {
        white: '#fff',
        black: '#000'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      scale: ['focus','active'],
      translate: ['focus']
    },
  },
  corePlugins: {
    boxShadow: true
  },
  plugins: [],
};
