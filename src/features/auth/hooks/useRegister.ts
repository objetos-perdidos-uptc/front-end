import { useNavigate } from 'react-router-dom'
import { useApiMutation } from '@/shared/api/hooks'
import { toast } from '@/shared/hooks/useToast'
import { register } from '../api'
import type { RegisterInput } from '../schemas'
import type { RegisterResponse } from '../types'

export function useRegister() {
  const navigate = useNavigate()

  return useApiMutation<RegisterResponse, RegisterInput>({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success(data.message || 'Cuenta creada. Ya puedes iniciar sesión.')
      navigate('/login', { replace: true })
    },
  })
}
