/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0f1115",
        surface: "#161a20",
        surfaceSoft: "#1c2128",
        gold: "#d6b36a",
        goldSoft: "#c6a45c",
        textPrimary: "#e7dcc7",
        textSecondary: "#a8a18f",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};