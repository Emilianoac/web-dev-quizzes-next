import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F8FC",
        foreground: "#0D0D0D",
        "blue-gray": "#122139",
        primary: {
          "50": "#fef1f8",
          "100": "#fee5f3",
          "200": "#ffcae9",
          "300": "#ff9fd5",
          "400": "#ff63b8",
          "500": "#ff3c9d",
          "600": "#f01276",
          "700": "#d1055b",
          "800": "#ad074b",
          "900": "#8f0c41",
          "950": "#580022",
        },
        secondary: {
          "50": "#eff1fe",
          "100": "#e1e6fe",
          "200": "#cad1fb",
          "300": "#a9b2f8",
          "400": "#8789f2",
          "500": "#706aea",
          "600": "#6a5ae0",
          "700": "#513fc3",
          "800": "#43359e",
          "900": "#3a327d",
          "950": "#231d49",
        },
      },
    },
  },
  plugins: [],
};
export default config;
