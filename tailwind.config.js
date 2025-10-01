/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'button-primary': 'var(--button-primary)',
        'first-gradient': 'var(--first-gradient)',
        'second-gradient': 'var(--second-gradient)',
        'second-blue': 'var(--second-blue)',
      },
    },
  },
  plugins: [],
};
