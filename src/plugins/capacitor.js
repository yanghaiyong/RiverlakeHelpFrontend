import { App } from '@capacitor/app'
import { Haptics } from '@capacitor/haptics'
import { Keyboard } from '@capacitor/keyboard'
import { StatusBar } from '@capacitor/status-bar'

export function initCapacitorPlugins() {
  App.addListener('appStateChange', ({ isActive }) => {
    console.log('App state changed. Is active:', isActive)
  })

  App.addListener('backButton', ({ canGoBack }) => {
    if (!canGoBack) {
      App.exitApp()
    } else {
      window.history.back()
    }
  })

  if (StatusBar.setStyle) {
    StatusBar.setStyle({ style: 'DARK' })
  }

  console.log('Capacitor plugins initialized')
}

export async function triggerHapticFeedback() {
  if (Haptics && Haptics.impact) {
    await Haptics.impact({ style: 'medium' })
  }
}

export { App, Haptics, Keyboard, StatusBar }
