/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        brand: {
          "light-gray": "#D8D8D8",
          gray: "#838383",
          "mid-gray": "#6A6A6D",
          "dark-gray": "#222222",
          brown: "#E3B065",
          "dark-brown": "#B48237",
          sky: "#3C8DEB",
          sea: "#2A5081",
          "success-green":"#057A55",
          "deny-red":"#E02424"


        },
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
