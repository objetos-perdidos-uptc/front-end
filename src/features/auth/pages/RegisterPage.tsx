import { Navigate } from 'react-router-dom'
import { Card } from '@/shared/components/Card'
import { RegisterForm } from '../components/RegisterForm'
import { useAuth } from '../hooks/useAuth'

export function RegisterPage() {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/" replace />

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4 py-8">
      <h1 className="mb-6 text-center text-2xl font-semibold">Objetos perdidos y encontrados</h1>
      <Card>
        <h2 className="mb-4 text-lg font-medium">Crear cuenta</h2>
        <RegisterForm />
      </Card>
    </main>
  )
}
