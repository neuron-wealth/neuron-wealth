/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1B6198",
          green: "#5ABA47",
          dark: "#254178",
          bright: "#00AC4E",
          light: "#F4F9FC",
          mist: "#F3FAF1",
          ink: "#142B3D",
          body: "#4B6172",
          line: "#D9E5EC",
          foam: "#E4EEF6",
        },
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        serif: ['"DM Serif Display"', "Georgia", "serif"],
        display: ['"Source Serif 4"', "Georgia", "serif"],
        manrope: ["Inter", '"Plus Jakarta Sans"', "sans-serif"],
      },
      maxWidth: {
        site: "82rem",
      },
      boxShadow: {
        header: "0 8px 24px -20px rgba(20, 43, 61, 0.55)",
        card: "0 18px 40px -28px rgba(20, 43, 61, 0.45)",
      },
    },
  },
  plugins: [],
};
