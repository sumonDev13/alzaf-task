import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#171717",
        secondary: "#2E2E2E",
        special: "#F97316",
      },
      backgroundColor: {
        background: "#f0f1f1",
      },
    },
  },
  plugins: [],
};
export default config;
