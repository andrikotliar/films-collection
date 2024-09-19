import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  server: {
    port: 3030,
    host: true,
    open: true,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  plugins: [react(), tsconfigPaths(), svgr()],
});
