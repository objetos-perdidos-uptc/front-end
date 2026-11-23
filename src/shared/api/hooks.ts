import {
  useMutation,
  useQuery,
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query'
import type { AppError } from '@/shared/types'

/** No reintentar errores del cliente (4xx): no se van a arreglar solos. */
function shouldRetry(failureCount: number, error: AppError): boolean {
  if (error.status >= 400 && error.status < 500) return false
  return failureCount < 2
}

export function useApiQuery<TData>(
  options: Omit<UseQueryOptions<TData, AppError>, 'retry'>,
): UseQueryResult<TData, AppError> {
  return useQuery<TData, AppError>({ ...options, retry: shouldRetry })
}

export function useApiMutation<TData, TVariables = void>(
  options: UseMutationOptions<TData, AppError, TVariables>,
): UseMutationResult<TData, AppError, TVariables> {
  return useMutation<TData, AppError, TVariables>(options)
}
