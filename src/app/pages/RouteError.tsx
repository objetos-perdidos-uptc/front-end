import { Link, useRouteError } from 'react-router-dom'

export function RouteError() {
  const error = useRouteError()
  const message = error instanceof Error ? error.message : 'Error inesperado'

  return (
    <main className="mx-auto mt-16 max-w-md rounded border border-red-200 bg-red-50 p-6 text-center">
      <h1 className="text-lg font-semibold text-red-800">Algo salió mal</h1>
      <p className="mt-2 text-sm text-red-700">{message}</p>
      <Link to="/" className="mt-4 inline-block text-sm text-brand-600 hover:underline">
        Volver al inicio
      </Link>
    </main>
  )
}
