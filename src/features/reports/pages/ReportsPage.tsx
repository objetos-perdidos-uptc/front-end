import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonClasses } from '@/shared/components/Button'
import { ErrorState } from '@/shared/components/ErrorState'
import { PageHeader } from '@/shared/components/PageHeader'
import { ReportList, ReportListSkeleton } from '../components/ReportList'
import { useMyReports } from '../hooks/useMyReports'

export function ReportsPage() {
  const { data, isPending, error, refetch, isRefetching } = useMyReports()

  return (
    <section className="flex flex-col gap-8">
      <PageHeader
        title="Mis reportes"
        subtitle="Objetos que perdiste o encontraste, con su estado actual."
        actions={
          <Link to="/reports/new" className={buttonClasses()}>
            <Plus size={20} strokeWidth={1.5} aria-hidden="true" />
            Nuevo reporte
          </Link>
        }
      />
      {isPending && <ReportListSkeleton />}
      {error && <ErrorState message={error.message} onRetry={() => void refetch()} retrying={isRefetching} />}
      {data && <ReportList reports={data} />}
    </section>
  )
}
