import { defineConfig } from 'vite';
import ReactVite from '@vitejs/plugin-react';
import TsConfigPaths from 'vite-tsconfig-paths';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import TailwindCss from '@tailwindcss/vite';

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
    TailwindCss(),
  ],
});
