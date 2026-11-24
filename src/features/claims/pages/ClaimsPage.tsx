import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonClasses } from '@/shared/components/Button'
import { ErrorState } from '@/shared/components/ErrorState'
import { PageHeader } from '@/shared/components/PageHeader'
import { ClaimList, ClaimListSkeleton } from '../components/ClaimList'
import { useMyClaims } from '../hooks/useMyClaims'

export function ClaimsPage() {
  const { data, isPending, error, refetch, isRefetching } = useMyClaims()

  return (
    <section className="flex flex-col gap-8">
      <PageHeader
        title="Mis reclamos"
        subtitle="Objetos que dijiste que son tuyos y en qué va cada solicitud."
        actions={
          <Link to="/claims/new" className={buttonClasses()}>
            <Plus size={20} strokeWidth={1.5} aria-hidden="true" />
            Nuevo reclamo
          </Link>
        }
      />
      {isPending && <ClaimListSkeleton />}
      {error && <ErrorState message={error.message} onRetry={() => void refetch()} retrying={isRefetching} />}
      {data && <ClaimList claims={data} />}
    </section>
  )
}
