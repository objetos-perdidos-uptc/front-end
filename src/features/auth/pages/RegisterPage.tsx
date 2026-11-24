import { Navigate } from 'react-router-dom'
import { AuthShell } from '../components/AuthShell'
import { RegisterForm } from '../components/RegisterForm'
import { useAuth } from '../hooks/useAuth'

export function RegisterPage() {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/" replace />

  return (
    <AuthShell title="Crea tu cuenta" subtitle="Tu sede define qué objetos ves en el feed.">
      <RegisterForm />
    </AuthShell>
  )
}
