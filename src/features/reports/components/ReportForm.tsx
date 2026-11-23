import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/components/Button'
import { ErrorMessage } from '@/shared/components/ErrorMessage'
import { Input, TextArea } from '@/shared/components/Input'
import { useCreateReport } from '../hooks/useCreateReport'
import { createReportSchema, type CreateReportInput } from '../schemas'

export function ReportForm() {
  const navigate = useNavigate()
  const { mutate, isPending, error } = useCreateReport()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateReportInput>({
    resolver: zodResolver(createReportSchema),
    defaultValues: {
      name: '',
      description: '',
      categoryId: '',
      campusId: '',
      color: '',
      material: '',
      date: '',
    },
  })

  return (
    <form onSubmit={handleSubmit((values) => mutate(values))} className="flex flex-col gap-4" noValidate>
      {error && <ErrorMessage message={error.message} />}
      <Input label="Nombre del objeto" error={errors.name?.message} {...register('name')} />
      <TextArea label="Descripción" error={errors.description?.message} {...register('description')} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="ID de categoría" error={errors.categoryId?.message} {...register('categoryId')} />
        <Input label="ID de campus" error={errors.campusId?.message} {...register('campusId')} />
        <Input label="Color (opcional)" error={errors.color?.message} {...register('color')} />
        <Input label="Material (opcional)" error={errors.material?.message} {...register('material')} />
      </div>
      <Input label="Fecha" type="date" error={errors.date?.message} {...register('date')} />
      <div className="flex gap-2">
        <Button type="submit" loading={isPending}>
          Crear reporte
        </Button>
        <Button variant="secondary" onClick={() => navigate('/reports')}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
