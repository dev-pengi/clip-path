/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        city: "url('/public/city.png')",
      },
      boxShadow: {
        light: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        strong:
          "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
      },
      screens: {
        vsm: "370px",
        xmd: "950px",
        xlg: "1300px",
      },
      colors: {
        primary: "#1FFBE8",
        secondary: "#34FF80",
        dark: "#1a1a1a",
      },
    },
  },
  plugins: [],
};
