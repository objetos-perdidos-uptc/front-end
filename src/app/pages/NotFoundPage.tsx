import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col items-center justify-center gap-3 px-4 text-center">
      <p className="text-5xl font-bold text-gray-300">404</p>
      <h1 className="text-lg font-semibold">Página no encontrada</h1>
      <p className="text-sm text-gray-600">La ruta que buscas no existe.</p>
      <Link to="/" className="text-sm text-brand-600 hover:underline">
        Volver al inicio
      </Link>
    </main>
  )
}
