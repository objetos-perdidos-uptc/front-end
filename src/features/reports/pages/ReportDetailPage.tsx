import { Link, useParams } from 'react-router-dom'
import { Card } from '@/shared/components/Card'
import { ErrorMessage } from '@/shared/components/ErrorMessage'
import { Spinner } from '@/shared/components/Spinner'
import { formatDate } from '@/shared/utils/formatters'
import { useReport } from '../hooks/useMyReports'

export function ReportDetailPage() {
  const { id = '' } = useParams<{ id: string }>()
  const { data: report, isPending, error } = useReport(id)

  const fields: Array<[string, string]> = report
    ? [
        ['Estado', report.status ?? '—'],
        ['Tipo', report.type ?? '—'],
        ['Categoría', report.categoryId != null ? String(report.categoryId) : '—'],
        ['Campus', report.campusId != null ? String(report.campusId) : '—'],
        ['Color', report.color ?? '—'],
        ['Material', report.material ?? '—'],
        ['Fecha', formatDate(report.date)],
      ]
    : []

  return (
    <section className="mx-auto flex max-w-xl flex-col gap-4">
      <Link to="/reports" className="text-sm text-brand-600 hover:underline">
        ← Volver a mis reportes
      </Link>
      {isPending && <Spinner />}
      {error && <ErrorMessage message={error.message} />}
      {report && (
        <Card className="flex flex-col gap-4">
          <div>
            <h1 className="text-xl font-semibold">{report.name}</h1>
            <p className="mt-1 text-xs text-gray-500">ID: {String(report.id)}</p>
          </div>
          <p className="text-sm text-gray-700">{report.description}</p>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {fields.map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-gray-500">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div>
            <Link
              to={`/claims/new?reportId=${encodeURIComponent(String(report.id))}`}
              className="inline-block rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100"
            >
              Reclamar este objeto
            </Link>
          </div>
        </Card>
      )}
    </section>
  )
}
