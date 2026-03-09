import axios from 'axios'

export function registerPlugins(app) {
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  api.interceptors.request.use(
    config => {
      console.log('[API Request]', config.method?.toUpperCase(), config.url)
      return config
    },
    error => {
      console.error('[API Request Error]', error)
      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    response => {
      console.log('[API Response]', response.config.url, response.status)
      return response
    },
    error => {
      console.error('[API Response Error]', error)
      return Promise.reject(error)
    }
  )

  app.config.globalProperties.$http = api
  app.provide('http', api)
}
