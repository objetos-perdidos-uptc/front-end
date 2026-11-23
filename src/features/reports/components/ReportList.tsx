import { Link } from 'react-router-dom'
import { EmptyState } from '@/shared/components/EmptyState'
import type { Report } from '../types'
import { ReportCard } from './ReportCard'

export function ReportList({ reports }: { reports: Report[] }) {
  if (reports.length === 0) {
    return (
      <EmptyState
        title="Aún no tienes reportes"
        description="Cuando reportes un objeto perdido o encontrado aparecerá aquí."
        action={
          <Link to="/reports/new" className="text-sm text-brand-600 hover:underline">
            Crear mi primer reporte
          </Link>
        }
      />
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {reports.map((report) => (
        <li key={report.id}>
          <ReportCard report={report} />
        </li>
      ))}
    </ul>
  )
}
