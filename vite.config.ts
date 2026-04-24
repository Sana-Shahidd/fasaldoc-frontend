import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png'],
      manifest: {
        name: 'FasalDoc — فصل ڈاک',
        short_name: 'FasalDoc',
        description: 'Plant disease detection for Pakistani farmers',
        theme_color: '#1B4332',
        background_color: '#F8F5F0',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fasaldoc-backend\.onrender\.com\/health/,
            handler: 'NetworkFirst',
            options: { cacheName: 'api-health', networkTimeoutSeconds: 5 }
          }
        ]
      }
    })
  ]
})
