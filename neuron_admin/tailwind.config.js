/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "rgb(var(--accent-rgb) / <alpha-value>)",
          deep: "rgb(var(--accent-deep-rgb) / <alpha-value>)",
        },
        surface: "var(--surface)",
        card: "var(--surface)",
        subtle: "var(--surface-2)",
        line: "var(--line)",
        ink: "var(--text)",
        soft: "var(--muted)",
        brand: {
          blue: "#21649A",
          green: "#54B848",
          navy: "#102A40",
          deep: "#071321",
          night: "#0B1E30",
          ivory: "#F7F8F5",
          light: "#EAF1F7",
          ink: "#18324A",
          body: "#5E6D7B",
          line: "#DCE4E8",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16, 42, 64, 0.04), 0 12px 32px -24px rgba(16, 42, 64, 0.35)",
        lift: "0 24px 48px -28px rgba(7, 19, 33, 0.55)",
      },
    },
  },
  plugins: [],
};
