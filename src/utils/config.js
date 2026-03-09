export function getApiBaseUrl() {
  return window.__APP_CONFIG__?.API_BASE_URL || '/api'
}

export function getAppTitle() {
  return window.__APP_CONFIG__?.APP_TITLE || 'RiverLake Help'
}

export function getAppVersion() {
  return window.__APP_CONFIG__?.APP_VERSION || '1.0.0'
}

export function getConfig() {
  return window.__APP_CONFIG__ || {
    API_BASE_URL: '/api',
    APP_TITLE: 'RiverLake Help',
    APP_VERSION: '1.0.0'
  }
}
