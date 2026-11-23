import { useAuthStore } from '@/features/auth/store/authStore'
import { configureApiClient } from '@/shared/api/client'
import { toast } from '@/shared/hooks/useToast'
import { router } from './router'

/**
 * Conecta el cliente axios (que vive en shared/ y no conoce las features)
 * con el authStore y el router. Se ejecuta una vez al arrancar.
 */
export function setupApiClient(): void {
  configureApiClient({
    getToken: () => useAuthStore.getState().token,
    onUnauthorized: () => {
      // Varias peticiones pueden fallar con 401 a la vez: actuamos solo la primera vez.
      if (!useAuthStore.getState().token) return
      useAuthStore.getState().clearSession()
      toast.error('Sesión expirada. Inicia sesión de nuevo.')
      void router.navigate('/login', { replace: true })
    },
  })
}
