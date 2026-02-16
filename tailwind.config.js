/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grass: '#90EE90',
        wheat: '#FFD700',
        water: '#4A90E2',
        cherry: '#E63946',
        gate: '#654321',
      },
    },
  },
  plugins: [],
}
