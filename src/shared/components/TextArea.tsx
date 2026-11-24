import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { Field, fieldClasses, fieldIds } from './Field'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  hint?: string | undefined
  error?: string | undefined
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, hint, error, id, name, required, rows = 4, className, ...rest },
  ref,
) {
  const inputId = id ?? name ?? label
  const ids = fieldIds(inputId, hint, error)

  return (
    <Field id={inputId} label={label} hint={hint} error={error} required={required} ids={ids}>
      <textarea
        ref={ref}
        id={inputId}
        name={name}
        rows={rows}
        required={required}
        aria-invalid={!!error}
        aria-describedby={ids.describedBy}
        className={fieldClasses(!!error, `resize-y px-3 py-2.5 ${className ?? ''}`)}
        {...rest}
      />
    </Field>
  )
})
