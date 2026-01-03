import { defineConfig } from 'vite';
import ReactVite from '@vitejs/plugin-react';
import TsConfigPaths from 'vite-tsconfig-paths';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
    port: 8080,
    host: true,
    open: true,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  build: {
    outDir: '../api/dist/public',
    emptyOutDir: true,
  },
  plugins: [
    tanstackRouter({
      autoCodeSplitting: true,
      routeFileIgnorePrefix: '-',
    }),
    ReactVite(),
    TsConfigPaths(),
    VitePWA({
      manifest: {
        name: 'Films Collection',
        short_name: 'Films',
        background_color: '#0088cc',
        theme_color: '#0088cc',
        icons: [
          {
            src: '/icons/icon-512-512.png',
            sizes: '512x512',
          },
          {
            src: '/icons/icon-192-192.png',
            sizes: '192x192',
          },
          {
            src: '/icons/icon-144-144.png',
            sizes: '144x144',
          },
          {
            src: '/icons/icon-96-96.png',
            sizes: '96x96',
          },
          {
            src: '/icons/icon-72-72.png',
            sizes: '72x72',
          },
          {
            src: '/icons/icon-48-48.png',
            sizes: '48x48',
          },
        ],
      },
    }),
  ],
});
