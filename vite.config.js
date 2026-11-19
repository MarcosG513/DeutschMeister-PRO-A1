import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function emitPrecacheManifestPlugin() {
  return {
    name: 'dm-precache-manifest',
    writeBundle(outputOptions, bundle) {
      const outDir = outputOptions.dir || 'dist'
      const assetPaths = Object.keys(bundle)
        .filter((fileName) => /\.(js|css)$/i.test(fileName))
        .map((fileName) => `/${fileName.replace(/^\/+/, '')}`)
        .sort()

      const manifest = {
        version: 'dm-pwa-v3.1',
        generatedAt: new Date().toISOString(),
        urls: Array.from(
          new Set([
            '/',
            '/index.html',
            '/manifest.json',
            '/apple-touch-icon.png',
            '/pwa-192x192.png',
            '/pwa-512x512.png',
            '/pwa-maskable-512x512.png',
            ...assetPaths,
          ])
        ),
      }

      fs.mkdirSync(outDir, { recursive: true })
      fs.writeFileSync(
        path.join(outDir, 'precache-manifest.json'),
        JSON.stringify(manifest, null, 2),
        'utf-8'
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    emitPrecacheManifestPlugin(),
  ],
  build: {
    chunkSizeWarningLimit: 950,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vendor-firebase',
              test: /[\\/]node_modules[\\/](@firebase|firebase|idb)[\\/]/,
              priority: 40,
            },
            {
              name: 'vendor-react',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 35,
            },
            {
              name: 'vendor-markdown',
              test: /[\\/]node_modules[\\/](react-markdown|remark-.*|rehype-.*|unified|micromark.*|mdast-.*|hast-.*)[\\/]/,
              priority: 30,
            },
            {
              name: 'vendor-lucide',
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              priority: 25,
            },
            {
              name: 'vendor-native-storage',
              test: /[\\/]node_modules[\\/](@capacitor.*|localforage)[\\/]/,
              priority: 20,
            },
            {
              name: 'data-driving-curriculum',
              test: /[\\/]src[\\/]data[\\/]drivingAcademyCurriculum/,
              priority: 15,
            },
            {
              name: 'data-redemittel-curriculum',
              test: /[\\/]src[\\/]data[\\/]redemittelBegegnungen/,
              priority: 15,
            },
            {
              name: 'data-stories-curriculum',
              test: /[\\/]src[\\/]data[\\/]immersiveStoriesCatalog/,
              priority: 15,
            },
            {
              name: 'data-chapters-core',
              test: /[\\/]src[\\/]data[\\/]chaptersCore/,
              priority: 12,
            },
            {
              name: 'data-chapters-extended',
              test: /[\\/]src[\\/]data[\\/]chaptersExtended/,
              priority: 12,
            },
            {
              name: 'data-studyplan-curriculum',
              test: /[\\/]src[\\/]data[\\/]studyPlanModules/,
              priority: 12,
            },
            {
              name: 'data-goethe-curriculum',
              test: /[\\/]src[\\/]data[\\/]goetheModules/,
              priority: 12,
            },
            {
              name: 'data-chapters-curriculum',
              test: /[\\/]src[\\/]data[\\/]chapters/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
})
