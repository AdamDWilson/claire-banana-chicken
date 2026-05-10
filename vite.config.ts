import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/claire-banana-chicken/',
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: true,
  },
});
