import { Card } from '@/shared/components/Card'
import { ClaimForm } from '../components/ClaimForm'

export function CreateClaimPage() {
  return (
    <section className="mx-auto flex max-w-xl flex-col gap-4">
      <h1 className="text-xl font-semibold">Nuevo reclamo</h1>
      <Card>
        <ClaimForm />
      </Card>
    </section>
  )
}
