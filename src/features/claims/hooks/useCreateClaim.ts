import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useApiMutation } from '@/shared/api/hooks'
import { toast } from '@/shared/hooks/useToast'
import { createClaim } from '../api'
import type { CreateClaimInput } from '../schemas'
import type { Claim } from '../types'
import { claimKeys } from './useMyClaims'

export function useCreateClaim() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useApiMutation<Claim, CreateClaimInput>({
    mutationFn: createClaim,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: claimKeys.all })
      toast.success('Reclamo enviado')
      navigate('/claims')
    },
  })
}
