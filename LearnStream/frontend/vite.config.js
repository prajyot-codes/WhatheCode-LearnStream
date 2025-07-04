import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: ['learnstream.onrender.com']
  },
  server:{
    port:2000
  }
})
