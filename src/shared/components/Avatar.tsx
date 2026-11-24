import { cn } from './cn'

type AvatarSize = 'sm' | 'md' | 'lg'

const sizes: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
}

/** Seis tonos derivados del primary; todos con contraste ≥ 5:1 contra texto blanco. */
const PALETTE = ['#0F766E', '#115E59', '#134E4A', '#0E7490', '#047857', '#155E75'] as const

function hash(text: string): number {
  let h = 0
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) | 0
  return Math.abs(h)
}

export function initials(nameOrEmail: string): string {
  const base = nameOrEmail.split('@')[0] ?? nameOrEmail
  const parts = base.split(/[\s._-]+/).filter(Boolean)
  const letters = parts.length >= 2 ? `${parts[0]?.[0] ?? ''}${parts[1]?.[0] ?? ''}` : base.slice(0, 2)
  return letters.toUpperCase() || '?'
}

interface AvatarProps {
  /** Email o nombre: define las iniciales y el color. */
  name: string
  size?: AvatarSize
  className?: string
}

export function Avatar({ name, size = 'md', className }: AvatarProps) {
  const color = PALETTE[hash(name) % PALETTE.length]
  return (
    <span
      aria-hidden="true"
      style={{ backgroundColor: color }}
      className={cn(
        'inline-flex shrink-0 select-none items-center justify-center rounded-full font-semibold text-ink-inverse',
        sizes[size],
        className,
      )}
    >
      {initials(name)}
    </span>
  )
}
