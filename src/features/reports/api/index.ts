import { apiClient } from '@/shared/api/client'
import type { Id } from '@/shared/types'
import { omitEmpty, toList } from '@/shared/utils/formatters'
import type { CreateReportInput } from '../schemas'
import type { Report } from '../types'

export async function getMyReports(): Promise<Report[]> {
  const { data } = await apiClient.get<unknown>('/reports/me')
  return toList<Report>(data)
}

export async function getFeed(): Promise<Report[]> {
  const { data } = await apiClient.get<unknown>('/reports/feed')
  return toList<Report>(data)
}

export async function getReport(id: Id): Promise<Report> {
  const { data } = await apiClient.get<Report>(`/reports/${id}`)
  return data
}

export async function createReport(input: CreateReportInput): Promise<Report> {
  const { data } = await apiClient.post<Report>('/reports', omitEmpty(input))
  return data
}
