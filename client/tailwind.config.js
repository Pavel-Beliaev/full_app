  /** @type {import('tailwindcss').Config} */
  import { nextui } from '@nextui-org/react';


  module.exports = {
  content: [
    './src/**/*.{ts,tsx,html}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui()],
};
