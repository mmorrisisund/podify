const colors = require('tailwindcss/colors')
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      cursor: {
        'col-resize': 'col-resize'
      },
      colors: {
        'true-gray': colors.trueGray
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
