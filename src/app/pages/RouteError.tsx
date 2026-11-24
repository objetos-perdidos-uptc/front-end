import { Home, RotateCw } from 'lucide-react'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'
import { Button, buttonClasses } from '@/shared/components/Button'
import { Logo } from '@/shared/components/Logo'

function describe(error: unknown): string {
  if (isRouteErrorResponse(error)) return `${error.status} ${error.statusText}`
  if (error instanceof Error) return `${error.name}: ${error.message}`
  return 'Error inesperado'
}

export function RouteError() {
  const error = useRouteError()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-4 text-center">
      <Logo size="lg" />
      <div className="flex max-w-md flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-ink-primary">Algo salió mal</h1>
        <p className="text-ink-secondary">La página tuvo un problema inesperado. Recargarla suele resolverlo.</p>
      </div>
      <details className="w-full max-w-md text-left text-sm">
        <summary className="cursor-pointer rounded-sm text-center text-ink-tertiary hover:text-ink-secondary">
          Ver detalle del error
        </summary>
        <p className="mt-2 break-words rounded-md bg-surface-muted px-3 py-2 font-mono text-xs text-ink-secondary">
          {describe(error)}
        </p>
      </details>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button size="lg" onClick={() => window.location.reload()} leftIcon={<RotateCw size={20} strokeWidth={1.5} aria-hidden="true" />}>
          Recargar
        </Button>
        <Link to="/" className={buttonClasses({ variant: 'secondary', size: 'lg' })}>
          <Home size={20} strokeWidth={1.5} aria-hidden="true" />
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
