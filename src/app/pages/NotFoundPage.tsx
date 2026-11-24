import { Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonClasses } from '@/shared/components/Button'
import { Logo } from '@/shared/components/Logo'

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-4 text-center">
      <Logo size="lg" />
      <p className="text-6xl font-bold tracking-tight text-ink-tertiary">404</p>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-ink-primary">Esta página no existe</h1>
        <p className="text-ink-secondary">Puede que el enlace esté mal o que la página se haya movido.</p>
      </div>
      <Link to="/" className={buttonClasses({ size: 'lg' })}>
        <Home size={20} strokeWidth={1.5} aria-hidden="true" />
        Volver al inicio
      </Link>
    </main>
  )
}
