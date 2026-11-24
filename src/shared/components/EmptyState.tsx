import { Inbox, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from './cn'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon: Icon = Inbox, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center rounded-md border border-dashed border-border-strong bg-surface px-6 py-12 text-center',
        className,
      )}
    >
      <div className="mx-auto flex max-w-md flex-col items-center gap-3">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-muted text-ink-tertiary">
          <Icon size={48} strokeWidth={1.5} aria-hidden="true" />
        </span>
        <h2 className="text-lg font-semibold text-ink-primary">{title}</h2>
        {description && <p className="text-sm text-ink-secondary">{description}</p>}
        {action && <div className="mt-2">{action}</div>}
      </div>
    </div>
  )
}
