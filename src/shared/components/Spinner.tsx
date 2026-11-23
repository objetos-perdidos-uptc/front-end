export function Spinner({ label = 'Cargando…' }: { label?: string }) {
  return (
    <div role="status" className="flex items-center gap-2 py-6 text-sm text-gray-500">
      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-brand-600" />
      {label}
    </div>
  )
}
