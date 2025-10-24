// @ts-check
import cloudflare from '@astrojs/cloudflare'
import react from '@astrojs/react'
import yaml from '@rollup/plugin-yaml'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },

    imageService: 'cloudflare',
  }),

  vite: {
    plugins: [tailwindcss(), yaml()],
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD ? [{ find: 'react-dom/server', replacement: 'react-dom/server.edge' }] : [],
    },
    server: {
      https: {
        key: './localhost-key.pem',
        cert: './localhost.pem',
      },
    },
  },

  integrations: [react()]
})
