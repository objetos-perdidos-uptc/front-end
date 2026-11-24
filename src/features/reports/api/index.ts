import { apiClient } from '@/shared/api/client'
import type { Id } from '@/shared/types'
import { omitEmpty, toList } from '@/shared/utils/formatters'
import type { CreateReportInput } from '../schemas'
import type { Category, Report } from '../types'

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

export async function getCategories(): Promise<Category[]> {
  const { data } = await apiClient.get<unknown>('/reports/categories')
  return toList<Category>(data)
}

/** "YYYY-MM-DD" a mediodía local en ISO, para que la zona horaria no cambie el día. */
function toIsoDate(day: string): string {
  return new Date(`${day}T12:00:00`).toISOString()
}

/** Traduce el formulario al cuerpo que espera POST /reports en report-service. */
export async function createReport(input: CreateReportInput): Promise<Report> {
  const isLost = input.type === 'LOST'
  const body = omitEmpty({
    type: input.type,
    name: input.name,
    description: input.description,
    categoryId: Number(input.categoryId),
    color: input.color,
    material: input.material,
    privateFeature: input.privateFeature,
    location: input.place ? { textDirection: input.place } : undefined,
    dateLost: isLost ? toIsoDate(input.date) : undefined,
    reward: isLost && input.reward ? Number(input.reward) : undefined,
    dateOfDiscovery: isLost ? undefined : toIsoDate(input.date),
    custodyLocation: isLost ? undefined : input.custodyLocation,
  })
  const { data } = await apiClient.post<Report>('/reports', body)
  return data
}
