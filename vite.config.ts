import { defineConfig } from 'vite'
import devServer from '@hono/vite-dev-server'
import pages from '@hono/vite-cloudflare-pages'

export default defineConfig({
  plugins: [
    pages({
      entry: './_worker.ts',
      outputDir: './dist'
    }),
    devServer({
      entry: 'app/server.ts'
    })
  ]
})
