import { Link } from 'react-router-dom'
import { EmptyState } from '@/shared/components/EmptyState'
import type { Claim } from '../types'
import { ClaimCard } from './ClaimCard'

export function ClaimList({ claims }: { claims: Claim[] }) {
  if (claims.length === 0) {
    return (
      <EmptyState
        title="Aún no tienes reclamos"
        description="Si encuentras un objeto tuyo en un reporte, puedes reclamarlo."
        action={
          <Link to="/claims/new" className="text-sm text-brand-600 hover:underline">
            Crear un reclamo
          </Link>
        }
      />
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {claims.map((claim) => (
        <li key={claim.id}>
          <ClaimCard claim={claim} />
        </li>
      ))}
    </ul>
  )
}
