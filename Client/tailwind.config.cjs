/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/*.{ts,tsx,html}',
    './src/**/*.{ts,tsx,html}',
    './src/**/**/*.{ts,tsx,html}'
  ],
  theme: {
    extend: {}
  },
  plugins: [  require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ]
}
