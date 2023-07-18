/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#B51200",
        secondary: "#F4A900",
        back: {
          default: "#f3f3f3",
          defaultDark: "#39393a",
          paper: "#FFFFFF",
          paperDark: "#161618",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
