import { createApp } from 'vue'
import App from './App.vue'
import { registerPlugins } from './plugins'

import { Capacitor } from '@capacitor/core'

const app = createApp(App)

registerPlugins(app)

if (import.meta.env.DEV) {
  console.log('Running in development mode')
  console.log('Capacitor platform:', Capacitor.getPlatform())
}

app.mount('#app')
