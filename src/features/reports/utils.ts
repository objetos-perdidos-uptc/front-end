import type { Report, ReportType } from './types'

export const TYPE_LABEL: Record<ReportType, string> = {
  LOST: 'Perdido',
  FOUND: 'Encontrado',
}

/** Fecha principal del reporte: cuándo se perdió o cuándo se encontró. */
export function reportDate(report: Report): string | null {
  return report.type === 'LOST' ? report.dateLost : report.dateOfDiscovery
}

export function reportPlace(report: Report): string | null {
  return report.location?.textDirection ?? null
}
