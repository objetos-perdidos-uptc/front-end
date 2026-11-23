import type { HTMLAttributes } from 'react'

export function Card({ className = '', children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`rounded border border-gray-200 bg-white p-4 ${className}`} {...rest}>
      {children}
    </div>
  )
}
