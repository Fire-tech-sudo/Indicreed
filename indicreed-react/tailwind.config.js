/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        cinzel: ["Cinzel", "serif"],
      },
      colors: {
        accent: "#3b82f6",
      },
    },
  },
  plugins: [],
};
