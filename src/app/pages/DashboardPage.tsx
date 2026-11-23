import { Link } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { Card } from '@/shared/components/Card'
import { ROLE_LABELS } from '@/shared/utils/constants'

const shortcuts = [
  { to: '/reports', title: 'Mis reportes', description: 'Objetos que has reportado' },
  { to: '/reports/new', title: 'Nuevo reporte', description: 'Reportar un objeto perdido o encontrado' },
  { to: '/claims', title: 'Mis reclamos', description: 'Reclamos que has enviado' },
  { to: '/claims/new', title: 'Nuevo reclamo', description: 'Reclamar un objeto que es tuyo' },
]

export function DashboardPage() {
  const { user } = useAuth()

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Hola, {user?.email}</h1>
        <p className="text-sm text-gray-600">Rol: {user ? ROLE_LABELS[user.role] : '—'}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {shortcuts.map((item) => (
          <Link key={item.to} to={item.to}>
            <Card className="h-full hover:border-brand-500">
              <h2 className="font-medium">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
