import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          reactFlow: ['reactflow'],
          translations: ['react-i18next', 'i18next'],
          styling: [
            '@headlessui/react',
            '@heroicons/react',
            '@iconify/react',
            '@tailwindcss/forms',
            '@tailwindcss/aspect-ratio',
            'css-filter-converter',
            'react-tooltip',
            'react-tooltip/dist/react-tooltip.css',
            'reactflow/dist/style.css',
            'react-contexify',
            'react-contexify/ReactContexify.css'
          ]
        }
      }
    }
  },
  define: {
    global: 'window'
  },
  resolve: {
    alias: {
      '@': `${__dirname}/src`
    }
  }
})
