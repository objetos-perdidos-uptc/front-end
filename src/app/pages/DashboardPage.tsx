import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
  HandHeart,
  PackageSearch,
  Plus,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useMyClaims } from '@/features/claims/hooks/useMyClaims'
import type { Claim } from '@/features/claims/types'
import { ReportCard } from '@/features/reports/components/ReportCard'
import { ReportCardSkeleton } from '@/features/reports/components/ReportList'
import { useFeed, useMyReports } from '@/features/reports/hooks/useMyReports'
import type { Report } from '@/features/reports/types'
import { StatusBadge } from '@/shared/components/Badge'
import { buttonClasses } from '@/shared/components/Button'
import { Card } from '@/shared/components/Card'
import { ErrorState } from '@/shared/components/ErrorState'
import { Skeleton, SkeletonGroup } from '@/shared/components/Skeleton'
import { formatDate } from '@/shared/utils/formatters'

const PENDING_CLAIMS = ['PENDING_OTP', 'PENDING', 'FLAGGED']

/** "juan.reina@uptc.edu.co" → "Juan". El token no trae el nombre, solo el correo. */
function firstName(email: string | undefined): string {
  const local = email?.split('@')[0]?.split(/[._-]/)[0] ?? ''
  return local ? local.charAt(0).toUpperCase() + local.slice(1) : ''
}

function StatCard({ Icon, value, label, loading }: { Icon: LucideIcon; value: number; label: string; loading: boolean }) {
  return (
    <Card className="flex flex-col gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-soft text-primary">
        <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
      </span>
      {loading ? (
        <Skeleton width={48} height={36} />
      ) : (
        <p className="text-3xl font-semibold tracking-tight text-ink-primary">{value}</p>
      )}
      <p className="text-sm text-ink-secondary">{label}</p>
    </Card>
  )
}

function QuickAction({ to, Icon, title, description, cta }: { to: string; Icon: LucideIcon; title: string; description: string; cta: string }) {
  return (
    <Card className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent-text">
        <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div className="flex flex-1 flex-col gap-1">
        <h3 className="font-semibold text-ink-primary">{title}</h3>
        <p className="text-sm text-ink-secondary">{description}</p>
      </div>
      <Link to={to} className={buttonClasses({ variant: 'secondary' })}>
        {cta}
      </Link>
    </Card>
  )
}

type Activity =
  | { kind: 'report'; date: string; report: Report }
  | { kind: 'claim'; date: string; claim: Claim }

function recentActivity(reports: Report[], claims: Claim[]): Activity[] {
  const items: Activity[] = [
    ...reports.map((report): Activity => ({ kind: 'report', date: report.creationDate ?? '', report })),
    ...claims.map((claim): Activity => ({ kind: 'claim', date: claim.createdAt ?? '', claim })),
  ]
  return items.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)
}

function ActivityRow({ item }: { item: Activity }) {
  const isReport = item.kind === 'report'
  const Icon = isReport ? FileText : HandHeart
  const to = isReport ? `/reports/${item.report.reportId}` : '/claims'
  const title = isReport ? item.report.name : `Reclamo sobre el reporte #${String(item.claim.reportId)}`
  const status = isReport ? item.report.status : item.claim.status

  return (
    <li>
      <Link
        to={to}
        className="flex items-center gap-4 rounded-md px-3 py-3 transition duration-150 hover:bg-surface-muted"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-muted text-ink-secondary">
          <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate font-medium text-ink-primary">{title}</span>
          <span className="text-xs text-ink-tertiary">
            {isReport ? 'Reporte' : 'Reclamo'} · {formatDate(item.date)}
          </span>
        </span>
        <StatusBadge status={status} />
      </Link>
    </li>
  )
}

function Onboarding() {
  const steps = [
    { Icon: PackageSearch, title: 'Reporta', text: 'Cuéntanos qué perdiste o encontraste, con un detalle privado.' },
    { Icon: Clock, title: 'Espera la coincidencia', text: 'Comparamos tu reporte con los de tu sede y te avisamos.' },
    { Icon: ShieldCheck, title: 'Reclama con seguridad', text: 'Demuestra que es tuyo y verifica con un código.' },
  ]
  return (
    <Card className="flex flex-col gap-6 bg-gradient-to-br from-primary-soft to-surface">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold tracking-tight text-ink-primary">Empieza en tres pasos</h2>
        <p className="text-sm text-ink-secondary">Aún no tienes actividad. Así funciona seeekr:</p>
      </div>
      <ol className="grid gap-4 md:grid-cols-3">
        {steps.map(({ Icon, title, text }, i) => (
          <li key={title} className="flex gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-ink-inverse">
              {i + 1}
            </span>
            <div className="flex flex-col gap-1">
              <p className="inline-flex items-center gap-1.5 font-medium text-ink-primary">
                <Icon size={16} strokeWidth={1.5} aria-hidden="true" className="text-primary" />
                {title}
              </p>
              <p className="text-sm text-ink-secondary">{text}</p>
            </div>
          </li>
        ))}
      </ol>
      <Link to="/reports/new" className={buttonClasses({ size: 'lg', className: 'w-full sm:w-fit' })}>
        <Plus size={20} strokeWidth={1.5} aria-hidden="true" />
        Crear mi primer reporte
      </Link>
    </Card>
  )
}

export function DashboardPage() {
  const { user } = useAuth()
  const reports = useMyReports()
  const claims = useMyClaims()
  const feed = useFeed()

  const loading = reports.isPending || claims.isPending
  const myReports = reports.data ?? []
  const myClaims = claims.data ?? []
  const pending = myClaims.filter((c) => c.status && PENDING_CLAIMS.includes(c.status)).length
  const resolved =
    myReports.filter((r) => r.status === 'CLOSED').length + myClaims.filter((c) => c.status === 'APPROVED').length
  const isNewUser = !loading && !reports.error && !claims.error && myReports.length === 0 && myClaims.length === 0
  const nearby = (feed.data ?? []).filter((r) => !r.isOwner).slice(0, 3)
  const name = firstName(user?.email)

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-1">
        <h1 className={isNewUser ? 'text-4xl font-semibold tracking-tight text-ink-primary' : 'text-3xl font-semibold tracking-tight text-ink-primary'}>
          Hola{name ? `, ${name}` : ''}
        </h1>
        <p className="text-ink-secondary">
          {isNewUser ? 'Bienvenido a seeekr. Encontremos lo que perdiste.' : 'Aquí está tu actividad reciente.'}
        </p>
      </header>

      {(reports.error || claims.error) && (
        <ErrorState
          message={(reports.error ?? claims.error)?.message}
          onRetry={() => {
            void reports.refetch()
            void claims.refetch()
          }}
          retrying={reports.isRefetching || claims.isRefetching}
        />
      )}

      {isNewUser && <Onboarding />}

      {!isNewUser && (
        <section aria-label="Resumen" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard Icon={FileText} value={myReports.length} label="Mis reportes" loading={loading} />
          <StatCard Icon={HandHeart} value={myClaims.length} label="Reclamos" loading={loading} />
          <StatCard Icon={Clock} value={pending} label="Pendientes" loading={loading} />
          <StatCard Icon={CheckCircle2} value={resolved} label="Resueltos" loading={loading} />
        </section>
      )}

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-ink-primary">Acciones rápidas</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <QuickAction
            to="/reports/new"
            Icon={PackageSearch}
            title="Reportar un objeto"
            description="¿Perdiste o encontraste algo? Publícalo en tu sede."
            cta="Reportar"
          />
          <QuickAction
            to="/claims"
            Icon={HandHeart}
            title="Revisar mis reclamos"
            description="Mira en qué va cada objeto que reclamaste."
            cta="Ver reclamos"
          />
        </div>
      </section>

      {!isNewUser && (
        <section className="flex flex-col gap-4">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-xl font-semibold tracking-tight text-ink-primary">Actividad reciente</h2>
            <Link to="/reports" className="inline-flex items-center gap-1 rounded-sm text-sm font-medium text-primary hover:underline">
              Ver todo
              <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
          <Card flush className="p-2">
            {loading ? (
              <SkeletonGroup label="Cargando actividad…" className="flex flex-col">
                {Array.from({ length: 3 }, (_, i) => (
                  <div key={i} className="flex items-center gap-4 px-3 py-3">
                    <Skeleton variant="avatar" />
                    <div className="flex flex-1 flex-col gap-1.5">
                      <Skeleton width="50%" />
                      <Skeleton width="30%" height={12} />
                    </div>
                  </div>
                ))}
              </SkeletonGroup>
            ) : (
              <ul className="flex flex-col divide-y divide-border">
                {recentActivity(myReports, myClaims).map((item) => (
                  <ActivityRow key={`${item.kind}-${item.kind === 'report' ? item.report.reportId : item.date}`} item={item} />
                ))}
              </ul>
            )}
          </Card>
        </section>
      )}

      {(feed.isPending || nearby.length > 0) && (
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold tracking-tight text-ink-primary">Recién reportados en tu sede</h2>
            <p className="text-sm text-ink-secondary">¿Reconoces alguno? Ábrelo y reclámalo.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {feed.isPending
              ? Array.from({ length: 3 }, (_, i) => <ReportCardSkeleton key={i} />)
              : nearby.map((report) => <ReportCard key={report.reportId} report={report} />)}
          </div>
        </section>
      )}
    </div>
  )
}
