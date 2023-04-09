/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/*.{ts,tsx,html}',
    './src/**/*.{ts,tsx,html}',
    './src/**/**/*.{ts,tsx,html}'
  ],
  theme: {
    extend: {
      animation: {
        'custom-spin': 'spin 2s ease-in-out infinite'
      }
    }
  },
  plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms')]
}
