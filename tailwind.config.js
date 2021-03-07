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
        'true-gray': colors.trueGray,
        lime: colors.lime,
        'soft-black': '#070707',
        'semi-transparent': 'rgba(0,0,0,0.5)',
        'spotify-green': '#1db954'
      }
    }
  },
  variants: {
    extend: {
      translate: ['group-hover'],
      scale: ['active']
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')]
}
