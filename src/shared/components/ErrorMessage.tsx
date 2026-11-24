import { AlertCircle } from 'lucide-react'

/** Error de un formulario (p. ej. credenciales inválidas), anunciado por lectores de pantalla. */
export function ErrorMessage({ message }: { message: string }) {
  return (
    <div
      role="alert"
      aria-live="polite"
      className="flex items-start gap-2 rounded-md border border-error-bg bg-error-bg px-3 py-2.5 text-sm text-error-text"
    >
      <AlertCircle size={16} strokeWidth={1.5} aria-hidden="true" className="mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  )
}
