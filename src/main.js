import { createApp } from 'vue'
import App from './App.vue'
import { registerPlugins } from './plugins'

import { Capacitor } from '@capacitor/core'

const app = createApp(App)

registerPlugins(app)

async function initApp() {
  try {
    const response = await fetch('/api/tenant-config')
    
    if (response.ok) {
      const config = await response.json()
      window.__APP_CONFIG__ = config
    } else {
      console.warn('Failed to fetch tenant config, using defaults')
      window.__APP_CONFIG__ = {
        API_BASE_URL: '/api',
        APP_TITLE: 'RiverLake Help',
        APP_VERSION: '1.0.0'
      }
    }
  } catch (error) {
    console.warn('Failed to load config, using defaults:', error)
    window.__APP_CONFIG__ = {
      API_BASE_URL: '/api',
      APP_TITLE: 'RiverLake Help',
      APP_VERSION: '1.0.0'
    }
  }

  if (import.meta.env.DEV) {
    console.log('App Config:', window.__APP_CONFIG__)
    console.log('Running in development mode')
    console.log('Capacitor platform:', Capacitor.getPlatform())
  }

  app.mount('#app')
}

initApp()
