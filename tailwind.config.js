const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js', './src/**/*.vue', './src/**/*.css'],
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
      scale: ['focus'],
      translate: ['focus']
    },
  },
  corePlugins: {
    boxShadow: true
  },
  plugins: [],
};
