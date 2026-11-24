import { ChevronDown } from 'lucide-react'
import { forwardRef, type SelectHTMLAttributes } from 'react'
import { Field, fieldClasses, fieldIds } from './Field'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  hint?: string | undefined
  error?: string | undefined
  placeholder?: string
}

/** Select nativo (accesible y cómodo en el celular) con el estilo de los demás campos. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, hint, error, id, name, required, placeholder = 'Selecciona una opción', children, className, ...rest },
  ref,
) {
  const inputId = id ?? name ?? label
  const ids = fieldIds(inputId, hint, error)

  return (
    <Field id={inputId} label={label} hint={hint} error={error} required={required} ids={ids}>
      <div className="relative">
        <select
          ref={ref}
          id={inputId}
          name={name}
          required={required}
          aria-invalid={!!error}
          aria-describedby={ids.describedBy}
          className={fieldClasses(!!error, `h-11 cursor-pointer appearance-none pl-3 pr-10 ${className ?? ''}`)}
          {...rest}
        >
          <option value="">{placeholder}</option>
          {children}
        </select>
        <ChevronDown
          size={16}
          strokeWidth={1.5}
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-tertiary"
        />
      </div>
    </Field>
  )
})
