/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / 1)',
          dark: 'rgb(var(--color-primary) / 0.8)',
          light: 'rgb(var(--color-primary) / 0.6)',
          lighter: 'rgb(var(--color-primary) / 0.4)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / 1)',
        },
      },
    },
  },
  plugins: [],
} 