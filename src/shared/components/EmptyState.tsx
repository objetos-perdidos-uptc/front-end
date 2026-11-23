import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded border border-dashed border-gray-300 bg-white px-4 py-10 text-center">
      <p className="font-medium text-gray-800">{title}</p>
      {description && <p className="text-sm text-gray-500">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
