import { FlaskConical } from 'lucide-react'
import { Navigate } from 'react-router-dom'
import { AuthShell } from '../components/AuthShell'
import { LoginForm } from '../components/LoginForm'
import { useAuth } from '../hooks/useAuth'

export function LoginPage() {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/" replace />

  return (
    <AuthShell title="Bienvenido de nuevo" subtitle="Inicia sesión para ver tus reportes y reclamos.">
      <LoginForm />
      {import.meta.env.DEV && (
        <div className="flex items-start gap-3 rounded-md border border-dashed border-border-strong bg-surface p-3 text-xs text-ink-secondary">
          <FlaskConical size={16} strokeWidth={1.5} aria-hidden="true" className="mt-0.5 shrink-0 text-ink-tertiary" />
          <p>
            <span className="font-medium text-ink-primary">Solo en desarrollo.</span> Usuario de prueba:{' '}
            <code className="font-mono">ana@uptc.edu.co</code> / <code className="font-mono">secret123</code>. Si la base
            está vacía, regístralo primero.
          </p>
        </div>
      )}
    </AuthShell>
  )
}
