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
        'button-default': 'var(--button-default)',
        'button-default-hover': 'var(--button-default-hover)',
        'button-default-disabled': 'var(--button-default-disabled)',
        'border-color-gray': 'var(--border-color-gray)',
        'text-disabled': 'var(--text-disabled)',
        'button-outline-border': 'var(--button-outline-border)',
        'button-outline-disabled': 'var(--button-outline-disabled)',
        'error-color': 'var(--error-color)',

        'button-primary': 'var(--button-primary)',
        'first-gradient': 'var(--first-gradient)',
        'second-gradient': 'var(--second-gradient)',
        'second-blue': 'var(--second-blue)',
        'second-text-color': 'var(--second-text-color)',
        'border-color': 'var(--border-color)',
        'active-tab-color': 'var(--active-tab-color)',
        'col-bg': 'var(--col-bg)',
        'active-loan-text': 'var(--active-loan-text)',
        'active-loan-text-bg': 'var(--active-loan-text-bg)',
        'gray-text-second': 'var(--gray-text-second)',
        'danger-color': 'var(--danger-color)',
        'block-color': 'var(--block-color)',
        'notice-title': 'var(--notice-title)',
        'notice-text': 'var(--notice-text)',
        'notice-bg': 'var(--notice-bg)',
        'gray-bg': 'var(--gray-bg)',
      },
    },
  },
  plugins: [],
};
