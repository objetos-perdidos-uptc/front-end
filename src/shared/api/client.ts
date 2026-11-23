import axios, { type AxiosError } from 'axios'
import type { ApiErrorBody, AppError } from '@/shared/types'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

/**
 * El cliente no conoce el authStore (las features no pueden importarse desde shared).
 * En su lugar, app/ lo configura al arrancar con estas dos funciones.
 */
interface ApiClientConfig {
  getToken: () => string | null
  onUnauthorized: () => void
}

let config: ApiClientConfig = {
  getToken: () => null,
  onUnauthorized: () => undefined,
}

export function configureApiClient(next: ApiClientConfig): void {
  config = next
}

export const apiClient = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use((request) => {
  const token = config.getToken()
  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`)
  }
  return request
})

function isAuthRequest(url: string | undefined): boolean {
  return !!url && url.startsWith('/auth/')
}

export function normalizeError(error: unknown): AppError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorBody>
    if (!axiosError.response) {
      return {
        message: 'No se pudo conectar con el servidor. Verifica que el backend esté activo.',
        code: 'NETWORK_ERROR',
        status: 0,
      }
    }
    const { status, data } = axiosError.response
    return {
      message: data?.message ?? `Error inesperado (${status})`,
      code: data?.code ?? 'UNKNOWN_ERROR',
      status,
    }
  }
  if (error instanceof Error) {
    return { message: error.message, code: 'CLIENT_ERROR', status: 0 }
  }
  return { message: 'Error desconocido', code: 'UNKNOWN_ERROR', status: 0 }
}

apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const appError = normalizeError(error)
    // Un 401 en /auth/* es "credenciales inválidas", no una sesión expirada.
    if (
      appError.status === 401 &&
      axios.isAxiosError(error) &&
      !isAuthRequest(error.config?.url)
    ) {
      config.onUnauthorized()
    }
    return Promise.reject(appError)
  },
)
