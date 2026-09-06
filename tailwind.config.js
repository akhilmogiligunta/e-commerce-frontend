/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 23, 42, 0.10)",
        glow: "0 18px 55px rgba(14, 165, 233, 0.25)",
      },
      colors: {
        brand: {
          50: "#effaf7",
          100: "#d9f3eb",
          200: "#b8e8dc",
          300: "#83d8c6",
          400: "#45c0a8",
          500: "#13a889",
          600: "#0d8f77",
          700: "#08715f",
        },
        accent: {
          500: "#ff6b35",
          600: "#e95d2a",
        },
      },
    },
  },
  plugins: [],
};
