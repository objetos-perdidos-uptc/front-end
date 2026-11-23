import type { Id, Role } from '@/shared/types'

export interface LoginResponse {
  token: string
  tokenType: string
  userId: Id
  email: string
  role: Role
}

export interface RegisterResponse {
  message: string
}
