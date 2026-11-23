import { useNavigate } from 'react-router-dom'
import { useApiMutation } from '@/shared/api/hooks'
import { login } from '../api'
import type { LoginInput } from '../schemas'
import { useAuthStore } from '../store/authStore'
import type { LoginResponse } from '../types'

export function useLogin() {
  const navigate = useNavigate()
  const setSession = useAuthStore((state) => state.setSession)

  return useApiMutation<LoginResponse, LoginInput>({
    mutationFn: login,
    onSuccess: (data) => {
      setSession(data.token, { userId: data.userId, email: data.email, role: data.role })
      navigate('/', { replace: true })
    },
  })
}
