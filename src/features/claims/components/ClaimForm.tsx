import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/shared/components/Button'
import { ErrorMessage } from '@/shared/components/ErrorMessage'
import { Input, TextArea } from '@/shared/components/Input'
import { useCreateClaim } from '../hooks/useCreateClaim'
import { createClaimSchema, type CreateClaimInput } from '../schemas'

export function ClaimForm() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { mutate, isPending, error } = useCreateClaim()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateClaimInput>({
    resolver: zodResolver(createClaimSchema),
    defaultValues: {
      reportId: searchParams.get('reportId') ?? '',
      description: '',
      contactPhone: '',
    },
  })

  return (
    <form onSubmit={handleSubmit((values) => mutate(values))} className="flex flex-col gap-4" noValidate>
      {error && <ErrorMessage message={error.message} />}
      <Input label="ID del reporte" error={errors.reportId?.message} {...register('reportId')} />
      <TextArea label="Descripción" error={errors.description?.message} {...register('description')} />
      <Input
        label="Teléfono de contacto"
        type="tel"
        error={errors.contactPhone?.message}
        {...register('contactPhone')}
      />
      <div className="flex gap-2">
        <Button type="submit" loading={isPending}>
          Enviar reclamo
        </Button>
        <Button variant="secondary" onClick={() => navigate('/claims')}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
