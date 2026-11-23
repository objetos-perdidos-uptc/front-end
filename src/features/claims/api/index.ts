import { apiClient } from '@/shared/api/client'
import type { Id } from '@/shared/types'
import { toList } from '@/shared/utils/formatters'
import type { CreateClaimInput } from '../schemas'
import type { Claim } from '../types'

export async function getMyClaims(): Promise<Claim[]> {
  const { data } = await apiClient.get<unknown>('/claims/me')
  return toList<Claim>(data)
}

export async function getClaim(id: Id): Promise<Claim> {
  const { data } = await apiClient.get<Claim>(`/claims/${id}`)
  return data
}

export async function createClaim(input: CreateClaimInput): Promise<Claim> {
  const { data } = await apiClient.post<Claim>('/claims', input)
  return data
}
