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
        primary: {
          50: "#e8f4fd",
          100: "#d1e9fb",
          200: "#a3d3f7",
          300: "#75bcf3",
          400: "#47a6ef",
          500: "#1990eb",
          600: "#1473bc",
          700: "#0f568d",
          800: "#0a3a5e",
          900: "#051d2f",
        },
        gold: {
          400: "#f0c040",
          500: "#c9a84c",
          600: "#a0822a",
        },
      },
      fontFamily: {
        persian: ["Vazirmatn", "Tahoma", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
