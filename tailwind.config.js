/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        garamond :"Cormorant Garamond",
        safiro: "Safiro"
      },
      colors: {
        'white': '#f1edeb',
        'black': '#212121'
      }
    },
  },
  plugins: [],
}