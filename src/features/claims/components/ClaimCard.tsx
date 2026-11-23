import { Card } from '@/shared/components/Card'
import { formatDate, truncate } from '@/shared/utils/formatters'
import type { Claim } from '../types'

export function ClaimCard({ claim }: { claim: Claim }) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium">Reclamo sobre el reporte {String(claim.reportId)}</h3>
        {claim.status && (
          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{claim.status}</span>
        )}
      </div>
      <p className="mt-1 text-sm text-gray-600">{truncate(claim.description)}</p>
      <p className="mt-2 text-xs text-gray-500">
        {claim.contactPhone ? `Contacto: ${claim.contactPhone}` : ''}
        {claim.createdAt ? ` · ${formatDate(claim.createdAt)}` : ''}
      </p>
    </Card>
  )
}
