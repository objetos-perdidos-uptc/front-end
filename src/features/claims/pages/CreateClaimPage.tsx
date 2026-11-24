import { CalendarDays, MapPin } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { useReport } from '@/features/reports/hooks/useMyReports'
import { StatusBadge } from '@/shared/components/Badge'
import { Card } from '@/shared/components/Card'
import { PageHeader } from '@/shared/components/PageHeader'
import { Skeleton, SkeletonGroup } from '@/shared/components/Skeleton'
import { formatDate } from '@/shared/utils/formatters'
import { ClaimForm } from '../components/ClaimForm'

/** Vista previa del reporte reclamado (cuando se llega desde "Reclamar este objeto"). */
function ReportPreview({ reportId }: { reportId: string }) {
  const { data: report, isPending, error } = useReport(reportId)

  if (isPending) {
    return (
      <SkeletonGroup label="Cargando reporte…">
        <Card className="flex flex-col gap-2">
          <Skeleton width={120} height={12} />
          <Skeleton width="55%" height={20} />
          <Skeleton width="80%" />
        </Card>
      </SkeletonGroup>
    )
  }
  if (error || !report) return null

  const date = report.type === 'LOST' ? report.dateLost : report.dateOfDiscovery
  return (
    <Card className="flex flex-col gap-2 border-primary/30 bg-primary-soft/40">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-ink-tertiary">Estás reclamando</p>
        <StatusBadge status={report.status} />
      </div>
      <p className="text-lg font-semibold text-ink-primary">{report.name}</p>
      {report.description && <p className="line-clamp-2 text-sm text-ink-secondary">{report.description}</p>}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-tertiary">
        <span className="inline-flex items-center gap-1">
          <CalendarDays size={14} strokeWidth={1.5} aria-hidden="true" />
          {formatDate(date)}
        </span>
        {report.location?.textDirection && (
          <span className="inline-flex items-center gap-1">
            <MapPin size={14} strokeWidth={1.5} aria-hidden="true" />
            {report.location.textDirection}
          </span>
        )}
      </div>
    </Card>
  )
}

export function CreateClaimPage() {
  const [searchParams] = useSearchParams()
  const reportId = searchParams.get('reportId') ?? ''

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <PageHeader
        title="Nuevo reclamo"
        subtitle="Demuestra que el objeto es tuyo. Te enviaremos un código para verificar el reclamo."
        back={{ to: '/claims', label: 'Volver' }}
      />
      {reportId && <ReportPreview reportId={reportId} />}
      <Card>
        <ClaimForm initialReportId={reportId} />
      </Card>
    </section>
  )
}
