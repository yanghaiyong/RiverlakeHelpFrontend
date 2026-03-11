import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiTarget = env.VITE_API_TARGET || 'http://localhost:8080'
  console.log('[Vite Config] mode:', mode, 'VITE_API_TARGET:', apiTarget)

  return {
    plugins: [vue()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
          logLevel: 'debug',
          onProxyReq: (proxyReq, req, res) => {
            console.log('[Vite Proxy]', req.method, req.url, '->', apiTarget)
          },
          onProxyRes: (proxyRes, req, res) => {
            console.log('[Vite Proxy Response]', req.url, '->', proxyRes.statusCode)
          },
          onError: (err, req, res) => {
            console.error('[Vite Proxy Error]', err.message)
          }
        }
      }
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true
    }
  }
})
