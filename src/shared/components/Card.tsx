import type { HTMLAttributes } from 'react'
import { cn } from './cn'

type CardVariant = 'default' | 'interactive'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  /** Quita el padding interno (para contenidos que manejan el suyo). */
  flush?: boolean
}

export function Card({ variant = 'default', flush = false, className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-md border border-border bg-surface shadow-sm',
        !flush && 'p-4 sm:p-6',
        variant === 'interactive' &&
          'transition duration-150 ease-out hover:border-primary hover:shadow-md',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
