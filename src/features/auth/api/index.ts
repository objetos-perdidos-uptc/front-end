import { apiClient } from '@/shared/api/client'
import type { LoginInput, RegisterInput } from '../schemas'
import type { LoginResponse, RegisterResponse } from '../types'

export async function login(input: LoginInput): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>('/auth/login', input)
  return data
}

export async function register(input: RegisterInput): Promise<RegisterResponse> {
  const { data } = await apiClient.post<RegisterResponse>('/auth/register', input)
  return data
}
