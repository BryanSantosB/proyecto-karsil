/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-light': 'var(--color-primary-light)',
        'primary-dark': 'var(--color-primary-dark)',
        'primary-primary': 'var(--color-primary)',
        'primary-bg': 'var(--color-primary-bg)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        bg: 'var(--color-bg)',
      },
      boxShadow: {
        'neumorphic': '12px 12px 24px #cccccc, -12px -12px 24px #f4f4f4',
      }
    },
  },
  plugins: [],
};
