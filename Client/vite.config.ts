import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages'
import dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    Pages({
      dirs: 'src/pages'
    })],
  define: {
    'process.env': process.env
  }
})
