import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/blog': {
        target: 'http://localhost:8080', // ← Backend server ka address
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
