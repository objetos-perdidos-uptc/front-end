import { CheckCircle2, Info, X, XCircle, type LucideIcon } from 'lucide-react'
import { useToastStore, type ToastKind } from '@/shared/hooks/useToast'
import { cn } from './cn'

const styles: Record<ToastKind, { border: string; icon: string; Icon: LucideIcon }> = {
  info: { border: 'border-l-info-text', icon: 'text-info-text', Icon: Info },
  success: { border: 'border-l-success-text', icon: 'text-success-text', Icon: CheckCircle2 },
  error: { border: 'border-l-destructive', icon: 'text-destructive', Icon: XCircle },
}

/** Notificaciones efímeras: arriba a la derecha en desktop, abajo al centro en el celular. */
export function Toaster() {
  const toasts = useToastStore((state) => state.toasts)
  const dismiss = useToastStore((state) => state.dismiss)

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex flex-col items-center gap-2 sm:inset-x-auto sm:bottom-auto sm:right-6 sm:top-20 sm:items-end"
    >
      {toasts.map((t) => {
        const { border, icon, Icon } = styles[t.kind]
        return (
          <div
            key={t.id}
            role={t.kind === 'error' ? 'alert' : 'status'}
            className={cn(
              'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-md border border-l-4 border-border bg-surface-elevated px-4 py-3 text-sm text-ink-primary shadow-md',
              'animate-toast-in-up sm:animate-toast-in-right',
              border,
            )}
          >
            <Icon size={20} strokeWidth={1.5} aria-hidden="true" className={cn('mt-px shrink-0', icon)} />
            <p className="flex-1 leading-snug">{t.message}</p>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Cerrar notificación"
              className="-mr-1 rounded-sm p-0.5 text-ink-tertiary transition duration-150 hover:bg-surface-muted hover:text-ink-primary"
            >
              <X size={16} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
