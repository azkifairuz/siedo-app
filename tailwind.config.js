/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          blue: "#112A46",
          yellow: "#FFC700",
          red:'#FB3838'
        },
        secondary: "#B9D3F0",
        surface: "#FFFFFF",
      },
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
      },
    },
  },
  plugins: [],
};
