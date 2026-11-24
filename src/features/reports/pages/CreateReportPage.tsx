import { Card } from '@/shared/components/Card'
import { PageHeader } from '@/shared/components/PageHeader'
import { ReportForm } from '../components/ReportForm'

export function CreateReportPage() {
  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col gap-8">
      <PageHeader
        title="Nuevo reporte"
        subtitle="Cuéntanos qué pasó. Entre más detalles, más fácil es encontrar coincidencias."
        back={{ to: '/reports', label: 'Volver' }}
      />
      <Card>
        <ReportForm />
      </Card>
    </section>
  )
}
