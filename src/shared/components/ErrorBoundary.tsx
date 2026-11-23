import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  override state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ErrorBoundary:', error, info.componentStack)
  }

  override render(): ReactNode {
    if (this.state.error) {
      return (
        <div className="mx-auto mt-16 max-w-md rounded border border-red-200 bg-red-50 p-6 text-center">
          <h1 className="text-lg font-semibold text-red-800">Algo salió mal</h1>
          <p className="mt-2 text-sm text-red-700">{this.state.error.message}</p>
          <button
            type="button"
            onClick={() => window.location.assign('/')}
            className="mt-4 rounded border border-red-300 bg-white px-4 py-2 text-sm text-red-800 hover:bg-red-100"
          >
            Volver al inicio
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
