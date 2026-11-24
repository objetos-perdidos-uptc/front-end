import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from './cn'
import { Spinner } from './Spinner'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'link'
export type ButtonSize = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-medium transition duration-150 ease-out ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ' +
  'disabled:cursor-not-allowed disabled:opacity-60 enabled:active:scale-[0.98]'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-ink-inverse shadow-sm enabled:hover:bg-primary-hover',
  secondary: 'border border-border-strong bg-surface text-ink-primary shadow-sm enabled:hover:bg-surface-muted',
  ghost: 'text-ink-secondary enabled:hover:bg-surface-muted enabled:hover:text-ink-primary',
  destructive: 'bg-destructive text-ink-inverse shadow-sm enabled:hover:bg-destructive-hover',
  link: 'text-primary underline-offset-4 enabled:hover:underline',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
}

/** Clases de botón para usarlas también en <Link> (navegación con aspecto de botón). */
export function buttonClasses({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; fullWidth?: boolean; className?: string | undefined } = {}) {
  return cn(base, variants[variant], variant === 'link' ? 'h-auto px-0' : sizes[size], fullWidth && 'w-full', className)
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClasses({ variant, size, fullWidth, className })}
      {...rest}
    >
      {loading ? (
        <>
          <Spinner size="sm" label="Cargando" />
          <span>Cargando…</span>
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  )
}
