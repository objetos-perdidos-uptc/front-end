import { HandHeart, PackageSearch, ShieldCheck } from 'lucide-react'
import type { ReactNode } from 'react'
import { Logo } from '@/shared/components/Logo'

const highlights = [
  { Icon: PackageSearch, text: 'Reporta lo que perdiste o encontraste en segundos.' },
  { Icon: ShieldCheck, text: 'Un detalle privado prueba quién es el dueño.' },
  { Icon: HandHeart, text: 'Te avisamos cuando aparece algo parecido.' },
]

/** Split layout de login y registro: historia de marca a la izquierda, formulario a la derecha. */
export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="relative hidden w-[46%] max-w-2xl overflow-hidden bg-primary-panel text-ink-inverse lg:flex lg:flex-col lg:justify-between lg:p-12">
        {/* Patrón abstracto: círculos concéntricos tipo radar, muy sutiles. */}
        <svg aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] opacity-[0.12]" viewBox="0 0 640 640" fill="none">
          {[300, 240, 180, 120, 60].map((r) => (
            <circle key={r} cx="320" cy="320" r={r} stroke="white" strokeWidth="1.5" />
          ))}
        </svg>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-transparent"
        />
        <Logo size="lg" tone="inverse" className="relative" />
        <div className="relative flex max-w-md flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight">Encuentra lo que perdiste</h2>
            <p className="text-lg text-ink-inverse/80">
              La red de objetos perdidos y encontrados de tu universidad, sede por sede.
            </p>
          </div>
          <ul className="flex flex-col gap-4">
            {highlights.map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white/10">
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="text-ink-inverse/90">{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-sm text-ink-inverse/70">UPTC · 2026</p>
      </aside>

      <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8">
        <div className="flex w-full max-w-sm flex-col gap-8">
          <Logo size="md" className="lg:hidden" />
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight text-ink-primary">{title}</h1>
            <p className="text-sm text-ink-secondary">{subtitle}</p>
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}
