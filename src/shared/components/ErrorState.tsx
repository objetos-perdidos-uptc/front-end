import { AlertCircle, RotateCw } from 'lucide-react'
import { Button } from './Button'
import { cn } from './cn'

interface ErrorStateProps {
  title?: string
  /** Mensaje técnico (se muestra en un detalle colapsable). */
  message?: string | undefined
  onRetry?: () => void
  retrying?: boolean
  className?: string
}

/** Error inline con reintento. No es un toast: se queda hasta que se resuelve. */
export function ErrorState({ title = 'Algo salió mal', message, onRetry, retrying = false, className }: ErrorStateProps) {
  return (
    <div role="alert" className={cn('rounded-md border border-error-bg bg-surface px-6 py-10 text-center shadow-sm', className)}>
      <div className="mx-auto flex max-w-md flex-col items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-error-bg text-error-text">
          <AlertCircle size={24} strokeWidth={1.5} aria-hidden="true" />
        </span>
        <h2 className="text-lg font-semibold text-ink-primary">{title}</h2>
        <p className="text-sm text-ink-secondary">No pudimos cargar esta información. Revisa tu conexión e inténtalo de nuevo.</p>
        {message && (
          <details className="w-full text-left text-sm">
            <summary className="cursor-pointer rounded-sm text-center text-ink-tertiary hover:text-ink-secondary">
              Ver detalle técnico
            </summary>
            <p className="mt-2 break-words rounded-sm bg-surface-muted px-3 py-2 font-mono text-xs text-ink-secondary">
              {message}
            </p>
          </details>
        )}
        {onRetry && (
          <Button
            variant="secondary"
            onClick={onRetry}
            loading={retrying}
            leftIcon={<RotateCw size={16} strokeWidth={1.5} aria-hidden="true" />}
          >
            Reintentar
          </Button>
        )}
      </div>
    </div>
  )
}
