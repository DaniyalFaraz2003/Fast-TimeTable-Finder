/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        'dark-violet':'#030637',
        'dark-purple':'#3C0753',
        'light-blue': '#92C7CF',
        'light-cyan': '#AAD7D9',
        'dark-body': '#0A0A0A'
      }
    },
    variants: {
      extend: {
        scrollbar: ['rounded', 'dark'], // Add the variants you need
      },
    }
  },  
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

