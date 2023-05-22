/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      colors: {
        'blue': '#02BAFB',
        'gray': '#9daaafff',
        'grad-dark': '#00BFFF0D',
        'grad-primary': '#2E3E990D',
        'card-gray': '#2B597336',
        'chat-gray': '#3A405B47',
        'theme-primary': '#FCD47C',
        'primary-dark': '#1A191E',
        'secondary-dark': '#000000',
        'primary-light': '#F9F9E1',
      }
    },
  },
  plugins: [],
}

