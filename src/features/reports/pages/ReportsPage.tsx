import { Link } from 'react-router-dom'
import { ErrorMessage } from '@/shared/components/ErrorMessage'
import { Spinner } from '@/shared/components/Spinner'
import { ReportList } from '../components/ReportList'
import { useMyReports } from '../hooks/useMyReports'

export function ReportsPage() {
  const { data, isPending, error } = useMyReports()

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Mis reportes</h1>
        <Link
          to="/reports/new"
          className="rounded bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Nuevo reporte
        </Link>
      </div>
      {isPending && <Spinner />}
      {error && <ErrorMessage message={error.message} />}
      {data && <ReportList reports={data} />}
    </section>
  )
}
