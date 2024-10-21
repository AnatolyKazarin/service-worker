import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import {viteStaticCopy} from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
      viteStaticCopy({
          targets: [
              {
                  src: 'public',
                  dest: ''
              }
          ]
      }),
      VitePWA(  {
          // srcDir: "src",
          // filename: "service-worker.js",
          // strategies: "injectManifest",
          // injectRegister: false,
          registerType: 'prompt',
          workbox: {
              globPatterns: ['**/*.{js,css,html,ico,png,svg}']
          },
          manifest: {icons: [{
              src: '/public/free.png',
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
