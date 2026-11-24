import { AlertCircle } from 'lucide-react'
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
        <main className="flex min-h-screen items-center justify-center bg-bg px-4">
          <div role="alert" className="flex max-w-md flex-col items-center gap-3 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-error-bg text-error-text">
              <AlertCircle size={24} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <h1 className="text-2xl font-semibold tracking-tight text-ink-primary">Algo salió mal</h1>
            <p className="text-sm text-ink-secondary">{this.state.error.message}</p>
            <button
              type="button"
              onClick={() => window.location.assign('/')}
              className="mt-2 inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-ink-inverse transition duration-150 hover:bg-primary-hover"
            >
              Volver al inicio
            </button>
          </div>
        </main>
      )
    }
    return this.props.children
  }
}
