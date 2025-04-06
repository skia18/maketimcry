/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        //primary bgcolors
        primary: '#0f0f0f',
        secondary: '#232d3f',
        tertiary: '#005b41',
        quartery: '#008170',
        // Text colors
        'txt-main': '#f1f5f9', // Light text on dark background
        'txt-subtle': '#cbd5e1', // Subheading, secondary info
        'txt-muted': '#94a3b8' // Placeholder, less emphasis
      }
    }
  },
  plugins: []
}
