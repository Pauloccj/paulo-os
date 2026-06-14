import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// `base` relativo facilita publicar em GitHub Pages (subdiretório) ou qualquer host estático.
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png'],
      manifest: {
        name: 'Análise do Comportamento',
        short_name: 'Comportamento',
        description: 'Aprenda conceitos básicos de Análise do Comportamento no estilo Duolingo',
        start_url: './',
        display: 'standalone',
        background_color: '#0f1722',
        theme_color: '#58cc02',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
});
