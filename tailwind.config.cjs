/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'tiki-title': ['Fredoka One', 'Righteous', 'cursive'],
        'tiki-header': ['Bebas Neue', 'Righteous', 'sans-serif'],
        'tiki-body': ['Righteous', 'sans-serif'],
        'tiki-accent': ['Creepster', 'cursive'],
        'mono': ['Courier New', 'monospace']
      }
    },
  },
  plugins: [],
};
