// Contrato de report-service (GET /reports/me, /reports/feed, /reports/:id). Ver su README.

export type ReportType = 'LOST' | 'FOUND'
export type ReportStatus = 'ACTIVE' | 'CLOSED' | 'EXPIRED'

export interface ReportLocation {
  latitude: number | null
  longitude: number | null
  textDirection: string | null
}

export interface Report {
  reportId: number
  type: ReportType
  status: ReportStatus
  name: string
  description: string | null
  color: string | null
  material: string | null
  categoryId: number
  categoryName: string | null
  campusId: number
  location: ReportLocation | null
  /** Rutas de las fotos (/reports/photos/...). */
  photos: string[]
  creationDate: string | null
  /** Solo LOST. */
  dateLost: string | null
  reward: number | null
  /** Solo FOUND. */
  dateOfDiscovery: string | null
  custodyLocation: string | null
  lastActivityDate: string | null
  expirationDate: string | null
  closedAt: string | null
  closeReason: string | null
  /** true si el reporte es del usuario que consulta. */
  isOwner: boolean
  /** Solo llega cuando el reporte es del usuario que consulta. */
  privateFeature?: string | null
}

export interface Category {
  categoryId: number
  name: string
}
