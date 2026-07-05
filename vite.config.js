import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import purgeCss from 'vite-plugin-purgecss'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    mode === 'development' && vueDevTools(),
    purgeCss({
      content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
      safelist: [
        /^router-link/,
        /^skills-wrapper/,
        /^skill-pill/,
        /^sr-only/,
        /^contact_link/,
        /^backwards/,
        // Theme switcher: [data-theme='dark'] is toggled at runtime.
        /data-theme/,
      ],
    }),
  ].filter(Boolean),
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
