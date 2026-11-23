import type { Id } from '@/shared/types'

export interface Claim {
  id: Id
  reportId: Id
  description: string
  contactPhone?: string | null
  status?: string | null
  createdAt?: string | null
}
