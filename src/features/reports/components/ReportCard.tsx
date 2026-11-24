import { CalendarDays, MapPin, PackageSearch, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge, StatusBadge } from '@/shared/components/Badge'
import { Card } from '@/shared/components/Card'
import { formatDate } from '@/shared/utils/formatters'
import type { Report } from '../types'
import { reportDate, reportPlace, TYPE_LABEL } from '../utils'

export function ReportCard({ report }: { report: Report }) {
  const TypeIcon = report.type === 'LOST' ? PackageSearch : Sparkles
  const place = reportPlace(report)

  return (
    <Link
      to={`/reports/${report.reportId}`}
      className="group block h-full rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <Card variant="interactive" className="flex h-full flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <Badge tone={report.type === 'LOST' ? 'brand' : 'info'}>
            <TypeIcon size={12} strokeWidth={1.5} aria-hidden="true" />
            {TYPE_LABEL[report.type]}
          </Badge>
          <StatusBadge status={report.status} />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-ink-primary transition duration-150 group-hover:text-primary">
            {report.name}
          </h3>
          {report.description && <p className="line-clamp-2 text-sm text-ink-secondary">{report.description}</p>}
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-ink-tertiary">
          <span className="inline-flex items-center gap-1">
            <CalendarDays size={14} strokeWidth={1.5} aria-hidden="true" />
            {formatDate(reportDate(report))}
          </span>
          {place && (
            <span className="inline-flex min-w-0 items-center gap-1">
              <MapPin size={14} strokeWidth={1.5} aria-hidden="true" />
              <span className="truncate">{place}</span>
            </span>
          )}
          {report.categoryName && <span>{report.categoryName}</span>}
        </div>
      </Card>
    </Link>
  )
}
