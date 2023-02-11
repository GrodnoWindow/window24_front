/** @type {import('tailwindcss').Config} */
module.exports = {
  dark: 'class',
  content: ["src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      textColor: {
        primary: "#3D3D3D",
      },
      colors: {
        accent: "#5391dc",
      },
    },
  },
  plugins: [[require("prettier-plugin-tailwindcss")]],
};
