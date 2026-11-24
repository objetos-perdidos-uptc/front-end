import { useApiQuery } from '@/shared/api/hooks'
import { getCategories, getFeed, getMyReports, getReport } from '../api'

export const reportKeys = {
  all: ['reports'] as const,
  mine: ['reports', 'me'] as const,
  feed: ['reports', 'feed'] as const,
  categories: ['reports', 'categories'] as const,
  detail: (id: string) => ['reports', 'detail', id] as const,
}

export function useMyReports() {
  return useApiQuery({ queryKey: reportKeys.mine, queryFn: getMyReports })
}

export function useFeed() {
  return useApiQuery({ queryKey: reportKeys.feed, queryFn: getFeed })
}

export function useReport(id: string) {
  return useApiQuery({
    queryKey: reportKeys.detail(id),
    queryFn: () => getReport(id),
    enabled: id.length > 0,
  })
}

/** Las categorías casi no cambian: se guardan en caché por una hora. */
export function useCategories() {
  return useApiQuery({ queryKey: reportKeys.categories, queryFn: getCategories, staleTime: 60 * 60 * 1000 })
}
