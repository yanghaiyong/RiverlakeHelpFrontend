import { createApp } from 'vue'
import App from './App.vue'
import { registerPlugins } from './plugins'

import { Capacitor } from '@capacitor/core'

const app = createApp(App)

registerPlugins(app)

function applyTheme(config) {
  if (config.themeColor) {
    document.documentElement.style.setProperty('--primary-color', config.themeColor)
    
    const style = document.createElement('style')
    style.textContent = `
      :root {
        --primary-color: ${config.themeColor};
      }
      .app-title {
        color: ${config.themeColor};
      }
    `
    document.head.appendChild(style)
  }
  
  if (config.logo) {
    const logoImg = document.querySelector('.app-logo')
    if (logoImg) {
      logoImg.src = config.logo
    }
  }
  
  if (config.appTitle) {
    document.title = config.appTitle
    const titleEl = document.querySelector('.app-title')
    if (titleEl) {
      titleEl.textContent = config.appTitle
    }
  }
}

async function initApp() {
  try {
    const response = await fetch('/api/tenant-config')
    
    if (response.ok) {
      const config = await response.json()
      window.__APP_CONFIG__ = config
      
      applyTheme(config)
    } else {
      console.warn('Failed to fetch tenant config, using defaults')
      window.__APP_CONFIG__ = {
        API_BASE_URL: '/api',
        APP_TITLE: 'RiverLake Help',
        APP_VERSION: '1.0.0',
        THEME_COLOR: '#1890ff'
      }
    }
  } catch (error) {
    console.warn('Failed to load config, using defaults:', error)
    window.__APP_CONFIG__ = {
      API_BASE_URL: '/api',
      APP_TITLE: 'RiverLake Help',
      APP_VERSION: '1.0.0',
      THEME_COLOR: '#1890ff'
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
