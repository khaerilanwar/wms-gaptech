/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-primary": "#164863",
        "blue-secondary": "#427D9D",
        "blue-light": "#DDF2FD",
      },
    },
    fontFamily: {
      Montserrat: ["Montserrat, sans-serif"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
    // screens: {
    // 	sm: '640px',
    // 	md: '768px',
    // },
  },
  plugins: [],
};
