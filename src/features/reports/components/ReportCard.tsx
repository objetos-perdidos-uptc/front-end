import { Link } from 'react-router-dom'
import { Card } from '@/shared/components/Card'
import { formatDate, truncate } from '@/shared/utils/formatters'
import type { Report } from '../types'

export function ReportCard({ report }: { report: Report }) {
  return (
    <Link to={`/reports/${report.id}`} className="block">
      <Card className="hover:border-brand-500">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-medium">{report.name}</h3>
          {report.status && (
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">{report.status}</span>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-600">{truncate(report.description)}</p>
        <p className="mt-2 text-xs text-gray-500">{formatDate(report.date)}</p>
      </Card>
    </Link>
  )
}
