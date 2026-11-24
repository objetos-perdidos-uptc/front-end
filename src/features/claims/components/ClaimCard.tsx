import { CalendarDays, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useReport } from '@/features/reports/hooks/useMyReports'
import { StatusBadge } from '@/shared/components/Badge'
import { Card } from '@/shared/components/Card'
import { Skeleton } from '@/shared/components/Skeleton'
import { formatDate } from '@/shared/utils/formatters'
import type { Claim } from '../types'

export function ClaimCard({ claim }: { claim: Claim }) {
  const reportId = String(claim.reportId)
  const report = useReport(reportId)

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold text-ink-primary">
          {report.isPending ? (
            <Skeleton width={180} height={18} />
          ) : (
            <>
              Reclamo sobre{' '}
              <Link to={`/reports/${encodeURIComponent(reportId)}`} className="rounded-sm text-primary hover:underline">
                {report.data?.name ?? `el reporte #${reportId}`}
              </Link>
            </>
          )}
        </h3>
        <StatusBadge status={claim.status} />
      </div>
      <p className="line-clamp-3 text-sm text-ink-secondary">{claim.description}</p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-tertiary">
        {claim.contactPhone && (
          <span className="inline-flex items-center gap-1">
            <Phone size={14} strokeWidth={1.5} aria-hidden="true" />
            {claim.contactPhone}
          </span>
        )}
        {claim.createdAt && (
          <span className="inline-flex items-center gap-1">
            <CalendarDays size={14} strokeWidth={1.5} aria-hidden="true" />
            {formatDate(claim.createdAt)}
          </span>
        )}
      </div>
    </Card>
  )
}
