import { zodResolver } from '@hookform/resolvers/zod'
import { Hash, Phone } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/components/Button'
import { ErrorMessage } from '@/shared/components/ErrorMessage'
import { Input, TextArea } from '@/shared/components/Input'
import { useCreateClaim } from '../hooks/useCreateClaim'
import { createClaimSchema, type CreateClaimInput } from '../schemas'

export function ClaimForm({ initialReportId = '' }: { initialReportId?: string }) {
  const navigate = useNavigate()
  const { mutate, isPending, error } = useCreateClaim()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClaimInput>({
    resolver: zodResolver(createClaimSchema),
    defaultValues: { reportId: initialReportId, description: '', contactPhone: '' },
  })

  return (
    <form onSubmit={handleSubmit((values) => mutate(values))} className="flex flex-col gap-5" noValidate>
      {error && <ErrorMessage message={error.message} />}
      <Input
        label="Número del reporte"
        inputMode="numeric"
        required
        readOnly={!!initialReportId}
        hint={initialReportId ? 'Tomado del reporte que estás reclamando.' : 'Está en el detalle del reporte (Reporte #…).'}
        prefix={<Hash size={16} strokeWidth={1.5} aria-hidden="true" />}
        error={errors.reportId?.message}
        {...register('reportId')}
      />
      <TextArea
        label="¿Por qué es tuyo?"
        placeholder="Marcas, contenido, rayones, dónde y cuándo lo perdiste…"
        hint="Entre más específico, más rápido se revisa. Las descripciones genéricas se marcan para verificación."
        rows={5}
        required
        error={errors.description?.message}
        {...register('description')}
      />
      <Input
        label="Teléfono de contacto"
        type="tel"
        autoComplete="tel"
        placeholder="Ej. 300 123 4567"
        required
        prefix={<Phone size={16} strokeWidth={1.5} aria-hidden="true" />}
        error={errors.contactPhone?.message}
        {...register('contactPhone')}
      />
      <div className="flex flex-col-reverse gap-2 border-t border-border pt-5 sm:flex-row sm:justify-end">
        <Button variant="ghost" onClick={() => navigate('/claims')}>
          Cancelar
        </Button>
        <Button type="submit" loading={isPending}>
          Enviar reclamo
        </Button>
      </div>
    </form>
  )
}
