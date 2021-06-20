module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('tailwindcss/nesting'),
  ]
};
