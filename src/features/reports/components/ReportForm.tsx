import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, PackageSearch, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/components/Button'
import { cn } from '@/shared/components/cn'
import { ErrorMessage } from '@/shared/components/ErrorMessage'
import { Input, TextArea } from '@/shared/components/Input'
import { Select } from '@/shared/components/Select'
import { useCreateReport } from '../hooks/useCreateReport'
import { useCategories } from '../hooks/useMyReports'
import { createReportSchema, type CreateReportInput } from '../schemas'

function Section({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-4 border-t border-border pt-6 first:border-t-0 first:pt-0">
      <legend className="sr-only">{title}</legend>
      <div aria-hidden="true">
        <h2 className="text-base font-semibold text-ink-primary">{title}</h2>
        {description && <p className="text-sm text-ink-secondary">{description}</p>}
      </div>
      {children}
    </fieldset>
  )
}

const TYPE_OPTIONS = [
  { value: 'LOST', label: 'Lo perdí', help: 'Busco un objeto mío', Icon: PackageSearch },
  { value: 'FOUND', label: 'Lo encontré', help: 'Quiero devolverlo', Icon: Sparkles },
] as const

export function ReportForm() {
  const navigate = useNavigate()
  const { mutate, isPending, error } = useCreateReport()
  const categories = useCategories()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateReportInput>({
    resolver: zodResolver(createReportSchema),
    defaultValues: {
      type: 'LOST',
      name: '',
      description: '',
      categoryId: '',
      color: '',
      material: '',
      place: '',
      privateFeature: '',
      reward: '',
      custodyLocation: '',
      date: '',
    },
  })
  const isLost = watch('type') === 'LOST'

  return (
    <form onSubmit={handleSubmit((values) => mutate(values))} className="flex flex-col gap-6" noValidate>
      {error && <ErrorMessage message={error.message} />}

      <Section title="Información del objeto" description="Lo que cualquiera puede ver en el feed de tu sede.">
        <div role="radiogroup" aria-label="Tipo de reporte" className="grid grid-cols-2 gap-3">
          {TYPE_OPTIONS.map(({ value, label, help, Icon }) => (
            <label
              key={value}
              className={cn(
                'flex cursor-pointer items-start gap-3 rounded-md border p-3 transition duration-150',
                'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary has-[:focus-visible]:ring-offset-2',
                watch('type') === value
                  ? 'border-primary bg-primary-soft'
                  : 'border-border-strong bg-surface hover:border-ink-tertiary',
              )}
            >
              <input type="radio" value={value} aria-label={label} className="sr-only" {...register('type')} />
              <Icon size={20} strokeWidth={1.5} aria-hidden="true" className="mt-0.5 shrink-0 text-primary" />
              <span className="flex flex-col">
                <span className="text-sm font-medium text-ink-primary">{label}</span>
                <span className="text-xs text-ink-secondary">{help}</span>
              </span>
            </label>
          ))}
        </div>
        <Input
          label="¿Qué objeto es?"
          placeholder="Ej. Mochila azul con llavero"
          required
          error={errors.name?.message}
          {...register('name')}
        />
        <TextArea
          label="Descripción"
          placeholder="Marca, tamaño, estado, qué contiene…"
          hint="No incluyas aquí el detalle privado; ese va más abajo."
          required
          error={errors.description?.message}
          {...register('description')}
        />
        <Select
          label="Categoría"
          placeholder={categories.isPending ? 'Cargando categorías…' : 'Elige una categoría'}
          required
          disabled={categories.isPending}
          hint={categories.error ? 'No se pudieron cargar las categorías. Recarga la página.' : undefined}
          error={errors.categoryId?.message}
          {...register('categoryId')}
        >
          {categories.data?.map((c) => (
            <option key={c.categoryId} value={c.categoryId}>
              {c.name}
            </option>
          ))}
        </Select>
      </Section>

      <Section title="Detalles" description="Ayudan al sistema a encontrar coincidencias.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Color" placeholder="Ej. azul" error={errors.color?.message} {...register('color')} />
          <Input label="Material" placeholder="Ej. tela, cuero" error={errors.material?.message} {...register('material')} />
        </div>
        <Input
          label={isLost ? '¿Dónde lo perdiste?' : '¿Dónde lo encontraste?'}
          placeholder="Ej. Biblioteca central, segundo piso"
          error={errors.place?.message}
          {...register('place')}
        />
        {isLost ? (
          <Input
            label="Recompensa (opcional)"
            inputMode="decimal"
            placeholder="Ej. 20000"
            prefix={<span className="text-sm">$</span>}
            error={errors.reward?.message}
            {...register('reward')}
          />
        ) : (
          <Input
            label="¿Dónde queda en custodia? (opcional)"
            placeholder="Ej. Portería principal"
            error={errors.custodyLocation?.message}
            {...register('custodyLocation')}
          />
        )}
        <Input
          label={isLost ? 'Característica privada' : 'Característica privada (opcional)'}
          placeholder="Un detalle que solo el dueño conoce"
          hint="Nunca se publica. Sirve para comprobar quién es el dueño cuando alguien reclame."
          required={isLost}
          prefix={<Lock size={16} strokeWidth={1.5} aria-hidden="true" />}
          error={errors.privateFeature?.message}
          {...register('privateFeature')}
        />
      </Section>

      <Section title="Fecha">
        <Input
          label={isLost ? '¿Cuándo lo perdiste?' : '¿Cuándo lo encontraste?'}
          type="date"
          required
          max={new Date().toISOString().slice(0, 10)}
          error={errors.date?.message}
          {...register('date')}
        />
      </Section>

      <div className="flex flex-col-reverse gap-2 border-t border-border pt-6 sm:flex-row sm:justify-end">
        <Button variant="ghost" onClick={() => navigate('/reports')}>
          Cancelar
        </Button>
        <Button type="submit" loading={isPending}>
          Crear reporte
        </Button>
      </div>
    </form>
  )
}
