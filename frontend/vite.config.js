import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
// this is the configuration file for the vite server
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
})
