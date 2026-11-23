import { useApiQuery } from '@/shared/api/hooks'
import { getClaim, getMyClaims } from '../api'

export const claimKeys = {
  all: ['claims'] as const,
  mine: ['claims', 'me'] as const,
  detail: (id: string) => ['claims', 'detail', id] as const,
}

export function useMyClaims() {
  return useApiQuery({ queryKey: claimKeys.mine, queryFn: getMyClaims })
}

export function useClaim(id: string) {
  return useApiQuery({
    queryKey: claimKeys.detail(id),
    queryFn: () => getClaim(id),
    enabled: id.length > 0,
  })
}
