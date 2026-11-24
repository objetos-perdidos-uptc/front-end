import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface PageHeaderProps {
  title: string
  subtitle?: string | undefined
  actions?: ReactNode
  /** Enlace de regreso opcional, arriba del título. */
  back?: { to: string; label: string }
}

export function PageHeader({ title, subtitle, actions, back }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4">
      {back && (
        <Link
          to={back.to}
          className="inline-flex w-fit items-center gap-1.5 rounded-sm text-sm font-medium text-ink-secondary transition duration-150 hover:text-primary"
        >
          <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
          {back.label}
        </Link>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-ink-primary sm:text-3xl">{title}</h1>
          {subtitle && <p className="text-sm text-ink-secondary sm:text-base">{subtitle}</p>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
      </div>
    </header>
  )
}
