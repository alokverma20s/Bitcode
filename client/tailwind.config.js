/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary: {
          50: '#f1f6fc',
          100: '#e6edf9',
          200: '#d2dff3',
          300: '#b7c9ea',
          400: '#99ace0',
          500: '#717EDA',
          600: '#6974c6',
          700: '#555dad',
          800: '#474f8c',
          900: '#3f4670',
          950: '#252941',
        },
      },
      fontFamily: {
        'Inter': ['Inter', 'sans-serif'],
        'Rubik': ['Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

