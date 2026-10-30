/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        monsoon: "#0e3b43",
        "monsoon-dark": "#0b2a30",
        marigold: "#f59e0b",
        paddy: "#006a4e",
        "paddy-light": "#10b981",
        "signal-red": "#f42a41",
        "signal-light": "#ff5252",
        mist: "#94a3b8",
        "indigo-deep": "#0b1420",
      },
    },
  },
  plugins: [],
};
