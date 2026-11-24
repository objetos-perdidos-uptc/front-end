import { useQueryClient } from '@tanstack/react-query'
import { ChevronDown, FileText, Github, HandHeart, Home, LogOut, Menu, Plus, X, type LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { Avatar } from '@/shared/components/Avatar'
import { buttonClasses } from '@/shared/components/Button'
import { cn } from '@/shared/components/cn'
import { Logo } from '@/shared/components/Logo'
import { ROLE_LABELS } from '@/shared/utils/constants'

const NAV: Array<{ to: string; label: string; Icon: LucideIcon; end?: boolean }> = [
  { to: '/reports', label: 'Reportes', Icon: FileText },
  { to: '/claims', label: 'Reclamos', Icon: HandHeart },
]

const REPO_URL = 'https://github.com/objetos-perdidos-uptc'

/** Cierra con Escape mientras `active` sea true. */
function useEscape(active: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!active) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onEscape()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [active, onEscape])
}

function UserMenu({ email, role, onLogout }: { email: string; role: string; onLogout: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const close = () => {
    setOpen(false)
    buttonRef.current?.focus()
  }
  useEscape(open, close)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Abrir menú de usuario"
        className="flex items-center gap-1.5 rounded-full p-0.5 pr-1.5 transition duration-150 hover:bg-surface-muted"
      >
        <Avatar name={email} size="sm" />
        <ChevronDown size={16} strokeWidth={1.5} aria-hidden="true" className="text-ink-tertiary" />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-64 animate-dropdown-in rounded-md border border-border bg-surface-elevated p-1.5 shadow-md"
        >
          <div className="flex items-center gap-3 px-2.5 py-2">
            <Avatar name={email} size="md" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink-primary">{email}</p>
              <p className="text-xs text-ink-tertiary">{role}</p>
            </div>
          </div>
          <div className="my-1 h-px bg-border" />
          <button
            type="button"
            role="menuitem"
            onClick={onLogout}
            className="flex w-full items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm text-ink-secondary transition duration-150 hover:bg-surface-muted hover:text-destructive"
          >
            <LogOut size={16} strokeWidth={1.5} aria-hidden="true" />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}

function MobileDrawer({
  open,
  onClose,
  email,
  role,
  onLogout,
}: {
  open: boolean
  onClose: () => void
  email: string
  role: string
  onLogout: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEscape(open, onClose)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  if (!open) return null

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'flex items-center gap-3 rounded-md px-3 py-2.5 text-base font-medium transition duration-150',
      isActive ? 'bg-primary-soft text-primary-strong' : 'text-ink-secondary hover:bg-surface-muted hover:text-ink-primary',
    )

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menú de navegación">
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0 animate-fade-in bg-ink-primary/40" />
      <nav className="absolute inset-y-0 left-0 flex w-[min(20rem,85vw)] animate-drawer-in flex-col bg-surface-elevated shadow-md">
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          <Logo size="sm" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú"
            className="rounded-md p-2 text-ink-secondary transition duration-150 hover:bg-surface-muted"
          >
            <X size={24} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
        <div className="flex flex-1 flex-col gap-1 p-3">
          <NavLink to="/" end className={linkClass} onClick={onClose}>
            <Home size={24} strokeWidth={1.5} aria-hidden="true" />
            Inicio
          </NavLink>
          {NAV.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to} end className={linkClass} onClick={onClose}>
              <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
          <Link to="/reports/new" onClick={onClose} className={buttonClasses({ fullWidth: true, className: 'mt-3' })}>
            <Plus size={20} strokeWidth={1.5} aria-hidden="true" />
            Nuevo reporte
          </Link>
        </div>
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-3 px-1 py-2">
            <Avatar name={email} size="md" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink-primary">{email}</p>
              <p className="text-xs text-ink-tertiary">{role}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-base font-medium text-ink-secondary transition duration-150 hover:bg-surface-muted hover:text-destructive"
          >
            <LogOut size={24} strokeWidth={1.5} aria-hidden="true" />
            Cerrar sesión
          </button>
        </div>
      </nav>
    </div>
  )
}

export function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Al cambiar de página: cerrar el drawer y volver arriba.
  useEffect(() => {
    setDrawerOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  function handleLogout() {
    logout()
    queryClient.clear() // no dejar datos del usuario anterior en caché
    navigate('/login', { replace: true })
  }

  const email = user?.email ?? ''
  const role = user ? ROLE_LABELS[user.role] : ''

  const navClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'relative flex h-16 items-center rounded-sm px-1 text-sm font-medium transition duration-150',
      isActive
        ? 'text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-primary'
        : 'text-ink-secondary hover:text-ink-primary',
    )

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary focus:shadow-md"
      >
        Saltar al contenido
      </a>

      <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
        {/* Desktop */}
        <div className="mx-auto hidden h-16 max-w-6xl items-center justify-between gap-6 px-6 lg:flex">
          <div className="flex items-center gap-10">
            <Link to="/" aria-label="Ir al inicio" className="rounded-sm">
              <Logo size="sm" />
            </Link>
            <nav aria-label="Principal" className="flex items-center gap-6">
              {NAV.map(({ to, label }) => (
                <NavLink key={to} to={to} className={navClass}>
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/reports/new" className={buttonClasses({ size: 'sm' })}>
              <Plus size={16} strokeWidth={1.5} aria-hidden="true" />
              Nuevo reporte
            </Link>
            <UserMenu email={email} role={role} onLogout={handleLogout} />
          </div>
        </div>

        {/* Mobile */}
        <div className="grid h-14 grid-cols-[auto_1fr_auto] items-center px-2 lg:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={drawerOpen}
            className="rounded-md p-2 text-ink-secondary transition duration-150 hover:bg-surface-muted"
          >
            <Menu size={24} strokeWidth={1.5} aria-hidden="true" />
          </button>
          <Link to="/" aria-label="Ir al inicio" className="justify-self-center rounded-sm">
            <Logo size="sm" />
          </Link>
          <Link
            to="/reports/new"
            aria-label="Nuevo reporte"
            className="rounded-md p-2 text-primary transition duration-150 hover:bg-primary-soft"
          >
            <Plus size={24} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </header>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        email={email}
        role={role}
        onLogout={handleLogout}
      />

      <main id="contenido" tabIndex={-1} className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 focus:outline-none lg:px-6 lg:py-8">
        <Outlet />
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-ink-tertiary sm:flex-row lg:px-6">
          <p>seeekr · UPTC · 2026</p>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-sm transition duration-150 hover:text-primary"
          >
            <Github size={16} strokeWidth={1.5} aria-hidden="true" />
            Código fuente
          </a>
        </div>
      </footer>
    </div>
  )
}
