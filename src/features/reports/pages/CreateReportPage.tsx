import { Card } from '@/shared/components/Card'
import { ReportForm } from '../components/ReportForm'

export function CreateReportPage() {
  return (
    <section className="mx-auto flex max-w-xl flex-col gap-4">
      <h1 className="text-xl font-semibold">Nuevo reporte</h1>
      <Card>
        <ReportForm />
      </Card>
    </section>
  )
}
