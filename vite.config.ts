import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Using relative base './' ensures the app works seamlessly on:
// - GitHub Project Pages (https://<user>.github.io/climares-hub/)
// - GitHub Org Pages (https://climares-hub.github.io/)
// - Cloudflare Pages / Vercel / custom USP subdomain (hub.climares.usp.br)
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
