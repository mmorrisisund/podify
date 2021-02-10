module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateAreas: {
        layout: ['nav header', 'nav main', 'footer footer']
      },
      gridTemplateColumns: {
        layout: '200px 1fr'
      },
      gridTemplateRows: {
        layout: '100px 1fr 100px'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@savvywombat/tailwindcss-grid-areas')]
}
