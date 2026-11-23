import { Link } from 'react-router-dom'
import { ErrorMessage } from '@/shared/components/ErrorMessage'
import { Spinner } from '@/shared/components/Spinner'
import { ClaimList } from '../components/ClaimList'
import { useMyClaims } from '../hooks/useMyClaims'

export function ClaimsPage() {
  const { data, isPending, error } = useMyClaims()

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Mis reclamos</h1>
        <Link
          to="/claims/new"
          className="rounded bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Nuevo reclamo
        </Link>
      </div>
      {isPending && <Spinner />}
      {error && <ErrorMessage message={error.message} />}
      {data && <ClaimList claims={data} />}
    </section>
  )
}
