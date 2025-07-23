/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        crypto: {
          primary: '#1a1a2e',
          secondary: '#16213e',
          accent: '#0f3460',
          success: '#22c55e',
          danger: '#ef4444',
          warning: '#f59e0b',
        },
        border: '#374151',
      }
    },
  },
  plugins: [],
}