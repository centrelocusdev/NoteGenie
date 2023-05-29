/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

export default {
  content: ["./src/**/*.{jsx,js}"],
  variants: {
    textColor: ({ after }) => after(['invalid']),
  },
  plugins: [
    plugin(function ({ addVariant, e }) {
      addVariant('invalid', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`invalid${separator}${className}`)}:invalid`;
        });
      });
    }),
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#02BAFB',
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
}

