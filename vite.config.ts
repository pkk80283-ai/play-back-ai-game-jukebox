import { cloudflare } from '@cloudflare/vite-plugin'
import { sites } from '@openai/sites-vite-plugin'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sites(),
    cloudflare({
      viteEnvironment: { name: 'server' },
      config: {
        main: './worker/index.ts',
        compatibility_date: '2026-08-16',
        compatibility_flags: ['nodejs_compat'],
        assets: {
          not_found_handling: 'single-page-application',
        },
      },
    }),
  ],
})
