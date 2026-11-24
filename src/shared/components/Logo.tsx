import { Search } from 'lucide-react'
import { cn } from './cn'

type LogoSize = 'sm' | 'md' | 'lg'

const sizes: Record<LogoSize, { text: string; icon: number; dot: string }> = {
  sm: { text: 'text-xl', icon: 15, dot: 'h-1.5 w-1.5' },
  md: { text: 'text-2xl', icon: 18, dot: 'h-2 w-2' },
  lg: { text: 'text-5xl', icon: 36, dot: 'h-3 w-3' },
}

interface LogoProps {
  size?: LogoSize
  /** Punto albaricoque después de la última letra (toque de marca). */
  showDot?: boolean
  /** `inverse` para fondos oscuros (panel de marca). */
  tone?: 'primary' | 'inverse'
  className?: string
}

/**
 * Wordmark provisional "seeekr": la segunda "e" es una lupa (buscar es la acción central).
 * Cuando exista un logo real, se reemplaza solo este componente.
 */
export function Logo({ size = 'md', showDot = true, tone = 'primary', className }: LogoProps) {
  const s = sizes[size]
  return (
    <span
      role="img"
      aria-label="seeekr"
      className={cn(
        'inline-flex select-none items-baseline leading-none tracking-tight',
        tone === 'primary' ? 'text-primary' : 'text-ink-inverse',
        s.text,
        className,
      )}
    >
      <span aria-hidden="true" className="font-bold">s</span>
      <span aria-hidden="true" className="font-medium">e</span>
      <Search
        aria-hidden="true"
        size={s.icon}
        strokeWidth={2.75}
        className="mx-[0.04em] self-center"
        style={{ transform: 'translateY(0.06em)' }}
      />
      <span aria-hidden="true" className="font-medium">e</span>
      <span aria-hidden="true" className="font-bold">kr</span>
      {showDot && <span aria-hidden="true" className={cn('ml-[0.08em] inline-block rounded-full bg-accent', s.dot)} />}
    </span>
  )
}
