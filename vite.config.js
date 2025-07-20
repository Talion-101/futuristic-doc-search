import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/futuristic-doc-search/', // ← Match your repo name exactly
});
