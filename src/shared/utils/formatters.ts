export function formatDate(value: string | null | undefined): string {
  if (!value) return '—'
  // "YYYY-MM-DD" se interpreta como UTC y puede mostrar el día anterior: lo fijamos a mediodía local.
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T12:00:00`) : new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function truncate(text: string, max = 120): string {
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text
}

/** El backend puede devolver un array plano o una página ({content|items|data|results}). */
export function toList<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data as T[]
  if (data && typeof data === 'object') {
    for (const key of ['content', 'items', 'data', 'results']) {
      const value = (data as Record<string, unknown>)[key]
      if (Array.isArray(value)) return value as T[]
    }
  }
  return []
}

/** Quita strings vacíos para no enviar "" al backend en campos opcionales. */
export function omitEmpty<T extends object>(input: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== '' && value !== undefined),
  ) as Partial<T>
}
