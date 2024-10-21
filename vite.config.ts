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
          workbox: {
              cleanupOutdatedCaches: true, // Очистка старых кешей
          },
          // devOptions: {
          //     enabled: true, // Включить в dev-режиме для тестирования
          //     type: 'module'
          // },
          manifest: {
              name: 'React Vite PWA',
              short_name: 'ReactApp',
              start_url: '/',
              display: 'standalone',
              background_color: '#ffffff',
              theme_color: '#317EFB',
              icons: [
                  {
                      src: '/public/free.png',
                      sizes: '512x512',
                      type: 'image/png',
                  },
              ],
          },
      })
  ],
})
