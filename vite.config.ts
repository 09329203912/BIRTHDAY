import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.webp', '**/*.mp4', '**/*.mp3'],
  build: {
    chunkSizeWarningLimit: 2000
  }
})
