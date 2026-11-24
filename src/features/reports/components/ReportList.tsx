import { PackageSearch, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonClasses } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { EmptyState } from '@/shared/components/EmptyState'
import { Skeleton, SkeletonGroup } from '@/shared/components/Skeleton'
import type { Report } from '../types'
import { ReportCard } from './ReportCard'

export const REPORT_GRID = 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'

export function ReportList({ reports }: { reports: Report[] }) {
  if (reports.length === 0) {
    return (
      <EmptyState
        icon={PackageSearch}
        title="Aún no has reportado nada"
        description="Cuando reportes un objeto perdido o encontrado, aparecerá aquí con su estado."
        action={
          <Link to="/reports/new" className={buttonClasses()}>
            <Plus size={20} strokeWidth={1.5} aria-hidden="true" />
            Crear mi primer reporte
          </Link>
        }
      />
    )
  }

  return (
    <ul className={REPORT_GRID}>
      {reports.map((report) => (
        <li key={report.reportId}>
          <ReportCard report={report} />
        </li>
      ))}
    </ul>
  )
}

/** Misma forma que ReportCard, para que la carga no "salte". */
export function ReportCardSkeleton() {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex justify-between">
        <Skeleton width={84} height={22} className="rounded-full" />
        <Skeleton width={64} height={22} className="rounded-full" />
      </div>
      <Skeleton width="70%" height={18} />
      <Skeleton width="100%" />
      <Skeleton width="85%" />
      <Skeleton width="45%" height={12} className="mt-2" />
    </Card>
  )
}

export function ReportListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <SkeletonGroup label="Cargando reportes…" className={REPORT_GRID}>
      {Array.from({ length: count }, (_, i) => (
        <ReportCardSkeleton key={i} />
      ))}
    </SkeletonGroup>
  )
}
