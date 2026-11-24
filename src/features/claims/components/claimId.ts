import type { Claim } from '../types'

/**
 * claim-service serializa el id como un value object: { "value": "..." }.
 * Se lee de forma tolerante para que funcione con ambos formatos.
 */
export function claimId(claim: Claim): string {
  const raw = claim.id as unknown
  if (raw && typeof raw === 'object' && 'value' in raw) return String((raw as { value: unknown }).value)
  return String(raw)
}
