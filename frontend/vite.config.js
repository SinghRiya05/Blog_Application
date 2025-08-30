import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/blog': {
        target: 'https://blog-application-94u9.onrender.com', // ← Backend server ka address
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
