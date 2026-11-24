import type { ReactNode } from 'react'
import { cn } from './cn'

export type BadgeTone = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'brand'

const tones: Record<BadgeTone, string> = {
  success: 'bg-success-bg text-success-text',
  warning: 'bg-warning-bg text-warning-text',
  error: 'bg-error-bg text-error-text',
  info: 'bg-info-bg text-info-text',
  neutral: 'bg-surface-muted text-ink-secondary',
  brand: 'bg-primary-soft text-primary-strong',
}

interface BadgeProps {
  tone?: BadgeTone
  children: ReactNode
  className?: string
}

export function Badge({ tone = 'neutral', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Estados del dominio (reportes y reclamos) → color y texto en español. */
const STATUS: Record<string, { tone: BadgeTone; label: string }> = {
  ACTIVE: { tone: 'success', label: 'Activo' },
  RESOLVED: { tone: 'success', label: 'Resuelto' },
  DELIVERED: { tone: 'success', label: 'Entregado' },
  APPROVED: { tone: 'success', label: 'Aprobado' },
  CLOSED: { tone: 'info', label: 'Cerrado' },
  PENDING_OTP: { tone: 'warning', label: 'Falta verificar' },
  PENDING: { tone: 'warning', label: 'En revisión' },
  FLAGGED: { tone: 'warning', label: 'En verificación' },
  EXPIRED: { tone: 'neutral', label: 'Expirado' },
  REJECTED: { tone: 'error', label: 'Rechazado' },
  CANCELLED: { tone: 'error', label: 'Cancelado' },
  BLOCKED: { tone: 'error', label: 'Bloqueado' },
}

export function StatusBadge({ status, className }: { status: string | null | undefined; className?: string }) {
  if (!status) return null
  const known = STATUS[status]
  return (
    <Badge tone={known?.tone ?? 'neutral'} className={className}>
      {known?.label ?? status}
    </Badge>
  )
}
