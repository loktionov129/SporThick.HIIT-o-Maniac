/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-card)',
        },
        content: {
          main: 'var(--text-main)',
          muted: 'var(--text-muted)',
        }
      }
    },
  },
};
