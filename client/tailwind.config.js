/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0F1419',
        'bg-secondary': '#1A1F26',
        'bg-tertiary': '#252B33',
        'accent-mint': '#A8E6CF',
        'accent-teal': '#4ECDC4',
        'accent-blue': '#3B82F6',
        'accent-yellow': '#FFE66D',
        'accent-red': '#FF6B6B',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A0AEC0',
        'text-muted': '#718096',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
}