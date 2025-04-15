/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#064c39',
      },
      fontFamily: {
        title: ['Schibsted Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
