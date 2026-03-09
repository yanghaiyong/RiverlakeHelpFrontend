import { createApp } from 'vue'
import App from './App.vue'
import { registerPlugins } from './plugins'

import { Capacitor } from '@capacitor/core'

const app = createApp(App)

registerPlugins(app)

async function initApp() {
  try {
    const response = await fetch('/config.js')
    const configText = await response.text()
    
    const config = eval(configText)
    
    window.__APP_CONFIG__ = config
    
    if (import.meta.env.DEV) {
      console.log('App Config:', window.__APP_CONFIG__)
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
    console.log('Running in development mode')
    console.log('Capacitor platform:', Capacitor.getPlatform())
  }

  app.mount('#app')
}

initApp()
