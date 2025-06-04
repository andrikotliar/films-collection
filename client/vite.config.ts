import { defineConfig } from 'vite';
import ReactVite from '@vitejs/plugin-react';
import TsConfigPaths from 'vite-tsconfig-paths';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

export default defineConfig({
  server: {
    port: 8080,
    host: true,
    open: true,
  },
  plugins: [
    TanStackRouterVite({
      autoCodeSplitting: true,
      routeFileIgnorePrefix: '-',
    }),
    ReactVite(),
    TsConfigPaths(),
  ],
});
