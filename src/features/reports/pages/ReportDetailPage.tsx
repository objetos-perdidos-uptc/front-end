import { ArrowLeft, ArrowRight, FileQuestion, Lock } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Badge, StatusBadge } from '@/shared/components/Badge'
import { buttonClasses } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { EmptyState } from '@/shared/components/EmptyState'
import { ErrorState } from '@/shared/components/ErrorState'
import { Skeleton, SkeletonGroup } from '@/shared/components/Skeleton'
import { CAMPUSES } from '@/shared/constants/campuses'
import { formatDate } from '@/shared/utils/formatters'
import { useReport } from '../hooks/useMyReports'
import type { Report } from '../types'
import { reportDate, reportPlace, TYPE_LABEL } from '../utils'

function campusName(id: number): string {
  return CAMPUSES.find((c) => c.id === id)?.label ?? `Sede ${id}`
}

function details(report: Report): Array<[string, string]> {
  const isLost = report.type === 'LOST'
  const rows: Array<[string, string | null]> = [
    ['Tipo', TYPE_LABEL[report.type]],
    ['Categoría', report.categoryName],
    ['Sede', campusName(report.campusId)],
    ['Color', report.color],
    ['Material', report.material],
    [isLost ? 'Fecha de pérdida' : 'Fecha de hallazgo', formatDate(reportDate(report))],
    [isLost ? 'Lugar de pérdida' : 'Lugar de hallazgo', reportPlace(report)],
    ['En custodia en', report.custodyLocation],
    ['Recompensa', report.reward ? `$${report.reward.toLocaleString('es-CO')}` : null],
    ['Publicado', formatDate(report.creationDate)],
    ['Expira', report.status === 'ACTIVE' ? formatDate(report.expirationDate) : null],
  ]
  return rows.filter((row): row is [string, string] => !!row[1])
}

function DetailSkeleton() {
  return (
    <SkeletonGroup label="Cargando reporte…" className="grid gap-6 lg:grid-cols-5">
      <div className="flex flex-col gap-4 lg:col-span-3">
        <Skeleton width="60%" height={32} />
        <Skeleton width={120} height={14} />
        <Skeleton width="100%" />
        <Skeleton width="95%" />
        <Skeleton width="70%" />
      </div>
      <Card className="flex flex-col gap-4 lg:col-span-2">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <Skeleton width={80} height={12} />
            <Skeleton width="60%" />
          </div>
        ))}
      </Card>
    </SkeletonGroup>
  )
}

export function ReportDetailPage() {
  const { id = '' } = useParams<{ id: string }>()
  const { data: report, isPending, error, refetch, isRefetching } = useReport(id)

  return (
    <section className="flex flex-col gap-6">
      <Link
        to="/reports"
        className="inline-flex w-fit items-center gap-1.5 rounded-sm text-sm font-medium text-ink-secondary transition duration-150 hover:text-primary"
      >
        <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
        Volver a mis reportes
      </Link>

      {isPending && <DetailSkeleton />}

      {error &&
        (error.status === 404 || error.status === 400 ? (
          <EmptyState
            icon={FileQuestion}
            title="Reporte no encontrado"
            description="Puede que el enlace esté mal o que el reporte ya no exista."
            action={
              <Link to="/reports" className={buttonClasses()}>
                Volver a la lista
              </Link>
            }
          />
        ) : (
          <ErrorState message={error.message} onRetry={() => void refetch()} retrying={isRefetching} />
        ))}

      {report && (
        <div className="grid items-start gap-6 lg:grid-cols-5">
          <article className="flex flex-col gap-5 lg:col-span-3">
            <header className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={report.type === 'LOST' ? 'brand' : 'info'}>{TYPE_LABEL[report.type]}</Badge>
                <StatusBadge status={report.status} />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-ink-primary sm:text-3xl">{report.name}</h1>
              <p className="font-mono text-xs text-ink-tertiary">Reporte #{report.reportId}</p>
            </header>

            <p className="whitespace-pre-line text-base text-ink-secondary">
              {report.description || 'Sin descripción.'}
            </p>

            {report.isOwner && report.privateFeature && (
              <div className="flex items-start gap-3 rounded-md border border-border bg-surface-muted p-4">
                <Lock size={20} strokeWidth={1.5} aria-hidden="true" className="mt-0.5 shrink-0 text-ink-secondary" />
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-medium text-ink-primary">Característica privada · solo tú la ves</p>
                  <p className="text-sm text-ink-secondary">{report.privateFeature}</p>
                </div>
              </div>
            )}
          </article>

          <aside className="flex flex-col gap-4 lg:col-span-2 lg:sticky lg:top-24">
            {report.isOwner ? (
              <p className="rounded-md bg-primary-soft px-4 py-3 text-sm text-primary-strong">
                Este reporte es tuyo. Te avisaremos cuando haya coincidencias.
              </p>
            ) : (
              report.status === 'ACTIVE' && (
                <Link
                  to={`/claims/new?reportId=${encodeURIComponent(String(report.reportId))}`}
                  className={buttonClasses({ size: 'lg', fullWidth: true })}
                >
                  Reclamar este objeto
                  <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
                </Link>
              )
            )}
            <Card>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink-tertiary">Detalles</h2>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm lg:grid-cols-1">
                {details(report).map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <dt className="text-xs text-ink-tertiary">{label}</dt>
                    <dd className="font-medium text-ink-primary">{value}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </aside>
        </div>
      )}
    </section>
  )
}
