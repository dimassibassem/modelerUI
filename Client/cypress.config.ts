import { defineConfig } from 'cypress'

export default defineConfig({
  experimentalSourceRewriting: false,
  e2e: {
    baseUrl: 'http://localhost:5173',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: false,
    retries: 0,
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite'
    },
    screenshotOnRunFailure: false,
    video: false
  }
})
