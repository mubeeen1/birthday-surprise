import path from "path"
import process from "process"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
    },
  },
  server: {
    // Allow ngrok hostnames used during testing
    allowedHosts: [
      "letterless-unvicarious-rosaline.ngrok-free.dev",
      // also allow other ngrok-free.dev subdomains
      "*.ngrok-free.dev",
    ],
  },
})



