import { useToastStore, type ToastKind } from '@/shared/hooks/useToast'

const styles: Record<ToastKind, string> = {
  info: 'border-gray-300 bg-white text-gray-800',
  success: 'border-green-300 bg-green-50 text-green-800',
  error: 'border-red-300 bg-red-50 text-red-800',
}

export function Toaster() {
  const toasts = useToastStore((state) => state.toasts)
  const dismiss = useToastStore((state) => state.dismiss)

  return (
    <div className="fixed right-4 top-4 z-50 flex w-80 flex-col gap-2" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={`flex items-start justify-between gap-2 rounded border px-3 py-2 text-sm shadow ${styles[t.kind]}`}
        >
          <span>{t.message}</span>
          <button
            type="button"
            onClick={() => dismiss(t.id)}
            aria-label="Cerrar notificación"
            className="text-gray-500 hover:text-gray-800"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
