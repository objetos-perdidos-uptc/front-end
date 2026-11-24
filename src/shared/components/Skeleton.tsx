import type { CSSProperties, ReactNode } from 'react'
import { cn } from './cn'

type SkeletonVariant = 'text' | 'card' | 'avatar' | 'block'

const variants: Record<SkeletonVariant, string> = {
  text: 'h-4 rounded-sm',
  card: 'h-40 rounded-md',
  avatar: 'h-10 w-10 rounded-full',
  block: 'rounded-md',
}

interface SkeletonProps {
  variant?: SkeletonVariant
  width?: CSSProperties['width']
  height?: CSSProperties['height']
  className?: string
}

/** Bloque gris con brillo animado que imita la forma del contenido mientras carga. */
export function Skeleton({ variant = 'text', width, height, className }: SkeletonProps) {
  return (
    <span
      aria-hidden="true"
      style={{ width, height }}
      className={cn('skeleton-shimmer block', variants[variant], className)}
    />
  )
}

/** Envoltorio accesible: anuncia "Cargando" una sola vez para todos los skeletons dentro. */
export function SkeletonGroup({ label = 'Cargando…', className, children }: { label?: string; className?: string; children: ReactNode }) {
  return (
    <div role="status" aria-busy="true" className={className}>
      <span className="sr-only">{label}</span>
      {children}
    </div>
  )
}
