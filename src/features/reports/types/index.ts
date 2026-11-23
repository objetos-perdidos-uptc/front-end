import type { Id } from '@/shared/types'

export interface Report {
  id: Id
  name: string
  description: string
  categoryId?: Id | null
  campusId?: Id | null
  color?: string | null
  material?: string | null
  date?: string | null
  status?: string | null
  type?: string | null
  createdAt?: string | null
}
