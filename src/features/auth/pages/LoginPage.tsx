import { Navigate } from 'react-router-dom'
import { Card } from '@/shared/components/Card'
import { LoginForm } from '../components/LoginForm'
import { useAuth } from '../hooks/useAuth'

export function LoginPage() {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/" replace />

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
      <h1 className="mb-6 text-center text-2xl font-semibold">Objetos perdidos y encontrados</h1>
      <Card>
        <h2 className="mb-4 text-lg font-medium">Iniciar sesión</h2>
        <LoginForm />
      </Card>
    </main>
  )
}
