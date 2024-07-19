/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'custom-bottom': '0px -88px 25px 0px rgba(196, 196, 196, 0.00), 0px -56px 23px 0px rgba(196, 196, 196, 0.01), 0px -32px 19px 0px rgba(196, 196, 196, 0.05), 0px -14px 14px 0px rgba(196, 196, 196, 0.09), 0px -4px 8px 0px rgba(196, 196, 196, 0.10)',
        'custom-card': '1px 1px 2px 0px rgba(0, 0, 0, 0.20)',
      },
      colors: {
        main: {
          blue: "#112A46",
          yellow: "#FFC700",
          red:'#FB3838',
          safe:'#3894FB',
          success:'#059212',
          neutral:'#37474F'
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
