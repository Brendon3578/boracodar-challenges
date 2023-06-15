/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Inter", "ui-sans-serif", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
