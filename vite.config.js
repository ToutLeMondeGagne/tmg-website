import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default ({ mode }) => {
  const env = loadEnv(mode || process.env.MODE || 'development', process.cwd())
  console.log('vite.config cwd:', process.cwd())
  // Debug: show loaded env variables at Vite startup
  console.log('Loaded env in vite.config.js:', {
    VITE_EMAILJS_SERVICE_ID: env.VITE_EMAILJS_SERVICE_ID,
  })

  return defineConfig({
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      allowedHosts: [
        '.trycloudflare.com',
      ],
    },
  })
}
