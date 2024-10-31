/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#8B4513",
          "primary-content": "#FFFFFF",
          "secondary": "#654321",
          "secondary-content": "#FFFFFF",
          "accent": "#D2B48C",
          "accent-content": "#000000",
          "neutral": "#2B1D1D",
          "base-100": "#F5DEB3",
        },
        dark: {
          "primary": "#1A0F0A",
          "primary-content": "#FFFFFF",
          "secondary": "#2B1D1D",
          "secondary-content": "#FFFFFF",
          "accent": "#3B2F2F",
          "accent-content": "#FFFFFF",
          "neutral": "#0A0505",
          "base-100": "#2B1D1D",
        },
      },
    ],
  },
};
