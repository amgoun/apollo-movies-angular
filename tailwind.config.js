/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '16': '16rem',
      },
    },
 
  },

  plugins: [
    require('@tailwindcss/forms'),
  ],
}
