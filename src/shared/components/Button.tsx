import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  loading?: boolean
}

const variants: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 border-transparent',
  secondary: 'bg-white text-gray-800 hover:bg-gray-100 border-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700 border-transparent',
}

export function Button({
  variant = 'primary',
  loading = false,
  disabled,
  className = '',
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded border px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...rest}
    >
      {loading ? 'Cargando…' : children}
    </button>
  )
}
