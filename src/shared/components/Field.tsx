import type { ReactNode } from 'react'
import { cn } from './cn'

/** Clases comunes de Input, TextArea y Select. */
export function fieldClasses(hasError: boolean, extra?: string) {
  return cn(
    'w-full rounded-md border bg-surface text-base text-ink-primary shadow-sm transition duration-150 ease-out sm:text-sm',
    'placeholder:text-ink-tertiary disabled:cursor-not-allowed disabled:bg-surface-muted',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    hasError ? 'border-destructive' : 'border-border-strong hover:border-ink-tertiary',
    extra,
  )
}

export interface FieldIds {
  hintId: string | undefined
  errorId: string | undefined
  describedBy: string | undefined
}

/** Ids para aria-describedby: el hint y el error quedan asociados al control. */
export function fieldIds(id: string, hint?: string, error?: string): FieldIds {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  return { hintId, errorId, describedBy }
}

interface FieldProps {
  id: string
  label: string
  hint?: string | undefined
  error?: string | undefined
  required?: boolean | undefined
  ids: FieldIds
  children: ReactNode
}

/** Label arriba, control, hint y error debajo. */
export function Field({ id, label, hint, error, required, ids, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink-primary">
        {label}
        {required && (
          <span className="ml-0.5 text-destructive" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={ids.hintId} className="text-xs text-ink-tertiary">
          {hint}
        </p>
      )}
      <div aria-live="polite">
        {error && (
          <p id={ids.errorId} className="text-xs font-medium text-destructive">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
