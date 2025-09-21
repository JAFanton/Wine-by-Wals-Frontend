/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          100: "#f4e4e7",
          800: "#5a1a1d",
          900: "#421014",
        },
        gold: {
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
        },
      },
    },
  },
  plugins: [],
};
