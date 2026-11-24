import { HandHeart, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonClasses } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { EmptyState } from '@/shared/components/EmptyState'
import { Skeleton, SkeletonGroup } from '@/shared/components/Skeleton'
import type { Claim } from '../types'
import { ClaimCard } from './ClaimCard'
import { claimId } from './claimId'

export function ClaimList({ claims }: { claims: Claim[] }) {
  if (claims.length === 0) {
    return (
      <EmptyState
        icon={HandHeart}
        title="Aún no has reclamado nada"
        description="Si viste un objeto tuyo en un reporte, reclámalo y demuestra que es tuyo."
        action={
          <Link to="/claims/new" className={buttonClasses()}>
            <Plus size={20} strokeWidth={1.5} aria-hidden="true" />
            Crear un reclamo
          </Link>
        }
      />
    )
  }

  return (
    <ul className="flex flex-col gap-4">
      {claims.map((claim) => (
        <li key={claimId(claim)}>
          <ClaimCard claim={claim} />
        </li>
      ))}
    </ul>
  )
}

export function ClaimListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <SkeletonGroup label="Cargando reclamos…" className="flex flex-col gap-4">
      {Array.from({ length: count }, (_, i) => (
        <Card key={i} className="flex flex-col gap-3">
          <div className="flex justify-between">
            <Skeleton width="45%" height={18} />
            <Skeleton width={90} height={22} className="rounded-full" />
          </div>
          <Skeleton width="100%" />
          <Skeleton width="75%" />
          <Skeleton width={160} height={12} />
        </Card>
      ))}
    </SkeletonGroup>
  )
}
