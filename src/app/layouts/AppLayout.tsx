import { useQueryClient } from '@tanstack/react-query'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { Button } from '@/shared/components/Button'
import { ROLE_LABELS } from '@/shared/utils/constants'

const navClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm ${isActive ? 'font-semibold text-brand-700' : 'text-gray-600 hover:text-gray-900'}`

export function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  function handleLogout() {
    logout()
    queryClient.clear() // no dejar datos del usuario anterior en caché
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-6">
            <Link to="/" className="font-semibold">
              Perdidos y Encontrados
            </Link>
            <nav className="flex gap-4">
              <NavLink to="/reports" className={navClass}>
                Reportes
              </NavLink>
              <NavLink to="/claims" className={navClass}>
                Reclamos
              </NavLink>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right text-xs leading-tight text-gray-600">
              <div>{user?.email}</div>
              <div>{user ? ROLE_LABELS[user.role] : ''}</div>
            </div>
            <Button variant="secondary" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
