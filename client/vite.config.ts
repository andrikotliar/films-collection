import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

export default defineConfig({
  server: {
    port: 8080,
    host: true,
  },
  plugins: [
    TanStackRouterVite({
      routeFileIgnorePrefix: '-',
    }),
    react(),
    tsconfigPaths(),
  ],
});
