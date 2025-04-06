/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0f0f0f',
        secondary: '#232d3f',
        tertiary: '#005b41',
        quartery: '#008170'
      }
    }
  },
  plugins: []
}
