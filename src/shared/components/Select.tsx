import { forwardRef, type SelectHTMLAttributes } from 'react'

const fieldClass =
    'w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string
    error?: string | undefined
    placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
    { label, error, id, name, placeholder = 'Selecciona una opción', children, ...rest },
    ref,
) {
    const inputId = id ?? name ?? label
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                ref={ref}
                id={inputId}
                name={name}
                aria-invalid={!!error}
                aria-describedby={error ? `${inputId}-error` : undefined}
                className={`${fieldClass} ${error ? 'border-red-500' : ''}`}
                {...rest}
            >
                <option value="">{placeholder}</option>
                {children}
            </select>
            {error && (
                <p id={`${inputId}-error`} role="alert" className="text-xs text-red-600">
                    {error}
                </p>
            )}
        </div>
    )
})