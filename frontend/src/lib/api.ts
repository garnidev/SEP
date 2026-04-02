import axios from 'axios'

/**
 * Cliente Axios base para la API de SEP.
 * En producción, las peticiones a /api/* las redirige Nginx hacia el backend NestJS.
 * En desarrollo local (pnpm dev), apunta directamente al backend en el puerto 4000.
 */
const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ??
    (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:4000'),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
})

// ── Interceptor de request: adjuntar JWT si existe ──
api.interceptors.request.use((config) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('sep_token') : null
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ── Interceptor de response: manejo centralizado de errores ──
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('sep_token')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api
