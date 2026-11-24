import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from './cn'
import { Field, fieldClasses, fieldIds } from './Field'

export { TextArea } from './TextArea'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label: string
  hint?: string | undefined
  error?: string | undefined
  /** Contenido a la izquierda dentro del campo (p. ej. un icono). */
  prefix?: ReactNode
  /** Contenido a la derecha dentro del campo. */
  suffix?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, prefix, suffix, id, name, required, className, ...rest },
  ref,
) {
  const inputId = id ?? name ?? label
  const ids = fieldIds(inputId, hint, error)

  return (
    <Field id={inputId} label={label} hint={hint} error={error} required={required} ids={ids}>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-ink-tertiary">
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          name={name}
          required={required}
          aria-invalid={!!error}
          aria-describedby={ids.describedBy}
          className={fieldClasses(!!error, cn('h-11 px-3', prefix != null && 'pl-10', suffix != null && 'pr-10', className))}
          {...rest}
        />
        {suffix && (
          <span className="absolute inset-y-0 right-3 flex items-center text-ink-tertiary">{suffix}</span>
        )}
      </div>
    </Field>
  )
})
