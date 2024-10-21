import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
      VitePWA(  {
          // srcDir: "src",
          // filename: "service-worker.js",
          // strategies: "injectManifest",
          // injectRegister: false,
          manifest: {icons: [{
              src: './src/assets/free.png',
                  sizes: '512x512',
                  type: 'image/png',
                  purpose: 'any maskable'
              }]},
          // devOptions: {
          //     enabled: true
          // }
          // injectManifest: {
          //     injectionPoint: undefined,
          // }
      })
  ],
})
