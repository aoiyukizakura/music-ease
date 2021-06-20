module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js', './src/**/*.vue', './src/**/*.css'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
};
