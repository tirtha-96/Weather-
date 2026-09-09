import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        monsoon: {
          DEFAULT: "#0E3B43",
          light: "#1B5963",
          dark: "#08252B",
        },
        marigold: {
          DEFAULT: "#F2A93B",
          dark: "#C78423",
          light: "#F7C26F",
        },
        paddy: {
          DEFAULT: "#2F6E52",
          light: "#459472",
          dark: "#1D4A36",
        },
        mist: {
          DEFAULT: "#EEF4F2",
          surface: "#F6FAF8",
        },
        indigo: {
          deep: "#0B1420",
          card: "#112033",
        },
        signal: {
          red: "#D64545",
          light: "#FADBD8",
        },
      },
    },
  },
  plugins: [],
};
export default config;
