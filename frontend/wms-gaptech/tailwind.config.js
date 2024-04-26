/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/plugin.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "blue-primary": "#164863",
        "blue-secondary": "#427D9D",
        "blue-light": "#DDF2FD",
        "blue-bg": "#F5F7FA",
        "red-primary": "#FF5A4F",
        "red-secondary": "#E02B1D",
        "yellow-primary": "#FFB240",
        "yellow-secondary": "#FFA826",
        "grey-primary": "#89939E",
        "grey-secondary": "#717171",
        "green-primary": "#90D26D",
        "green-secondary": "#2C7865",
      },
    },
    fontFamily: {
      Montserrat: ["Montserrat, sans-serif"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
  },
  plugins: [],
};
