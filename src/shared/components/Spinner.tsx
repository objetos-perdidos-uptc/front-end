import { cn } from './cn'

type SpinnerSize = 'sm' | 'md' | 'lg'

const sizes: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-8 w-8',
}

interface SpinnerProps {
  size?: SpinnerSize
  /** Texto para lectores de pantalla. */
  label?: string
  className?: string
}

/** Indicador circular. Hereda el color del texto (currentColor). */
export function Spinner({ size = 'md', label = 'Cargando…', className }: SpinnerProps) {
  return (
    <span role="status" className={cn('inline-flex', className)}>
      <svg className={cn('animate-spin-slow', sizes[size])} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2.5" />
        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  )
}
