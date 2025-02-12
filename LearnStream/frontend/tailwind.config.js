const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    fontFamily: {
      league: ['League Spartan', 'sans-serif'], // Add your custom font here
    },
    extend: { width: {
      '50vh': '50vh', // Adds a custom width value
    },},
  },
  plugins: [ flowbite.plugin(),]
};
