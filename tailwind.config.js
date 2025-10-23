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
        'second-primary': 'var(--second-primary)',
        'second-primary-hover': 'var(--second-primary-hover)',
        'second-primary-disabled': 'var(--second-primary-disabled)',
        'border-color-gray': 'var(--border-color-gray)',
        'text-disabled': 'var(--text-disabled)',
        'button-outline-disabled': 'var(--button-outline-disabled)',
        'error-color': 'var(--error-color)',
        'primary-border': 'var(--primary-border)',
        'second-primary': 'var(--second-primary)',
        'light-primary': 'var(--light-primary)',
        'second-gray': 'var(--second-gray)',
        'second-border-gray': 'var(--second-border-gray)',
        'second-light-primary': 'var(--second-light-primary)',
        'bg-gray': 'var(--bg-gray)',

        'button-primary': 'var(--button-primary)',
        'second-blue': 'var(--second-blue)',
        'second-text-color': 'var(--second-text-color)',
        'border-color': 'var(--border-color)',
        'active-tab-color': 'var(--active-tab-color)',
        'col-bg': 'var(--col-bg)',
        'active-loan-text': 'var(--active-loan-text)',
        'gray-text-second': 'var(--gray-text-second)',
        'danger-color': 'var(--danger-color)',
        'block-color': 'var(--block-color)',
      },
    },
  },
  plugins: [],
};
