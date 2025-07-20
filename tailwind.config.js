/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        primary: '#00d9ff',
        secondary: '#8b5cf6',
        accent: '#ec4899',
        card: '#1f2937',
        border: '#374151',
        text: '#e5e7eb',
      },
    },
  },
  plugins: [],
}
