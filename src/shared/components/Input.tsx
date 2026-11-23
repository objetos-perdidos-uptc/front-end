import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'

const fieldClass =
  'w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none'

interface FieldWrapperProps {
  label: string
  error?: string | undefined
  htmlFor: string
  children: React.ReactNode
}

function FieldWrapper({ label, error, htmlFor, children }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string | undefined
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, id, name, ...rest },
  ref,
) {
  const inputId = id ?? name ?? label
  return (
    <FieldWrapper label={label} error={error} htmlFor={inputId}>
      <input
        ref={ref}
        id={inputId}
        name={name}
        aria-invalid={!!error}
        className={`${fieldClass} ${error ? 'border-red-500' : ''}`}
        {...rest}
      />
    </FieldWrapper>
  )
})

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string | undefined
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, error, id, name, ...rest },
  ref,
) {
  const inputId = id ?? name ?? label
  return (
    <FieldWrapper label={label} error={error} htmlFor={inputId}>
      <textarea
        ref={ref}
        id={inputId}
        name={name}
        rows={4}
        aria-invalid={!!error}
        className={`${fieldClass} ${error ? 'border-red-500' : ''}`}
        {...rest}
      />
    </FieldWrapper>
  )
})
