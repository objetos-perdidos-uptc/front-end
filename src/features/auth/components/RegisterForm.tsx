import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button } from '@/shared/components/Button'
import { ErrorMessage } from '@/shared/components/ErrorMessage'
import { Input } from '@/shared/components/Input'
import { Select } from '@/shared/components/Select'
import { CAMPUSES, UNIVERSITIES } from '@/shared/constants/campuses'
import { useRegister } from '../hooks/useRegister'
import { registerSchema, type RegisterInput } from '../schemas'

export function RegisterForm() {
  const { mutate, isPending, error } = useRegister()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', campusId: '', universityId: '' },
  })

  return (
    <form onSubmit={handleSubmit((values) => mutate(values))} className="flex flex-col gap-4" noValidate>
      {error && <ErrorMessage message={error.message} />}
      <Input label="Nombre" autoComplete="name" error={errors.name?.message} {...register('name')} />
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label="Contraseña"
        type="password"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Select
        label="Campus"
        placeholder="Selecciona tu campus"
        error={errors.campusId?.message}
        {...register('campusId')}
      >
        {CAMPUSES.map((c) => (
          <option key={c.id} value={c.id}>
            {c.label}
          </option>
        ))}
      </Select>
      <Select
        label="Universidad"
        placeholder="Selecciona tu universidad"
        error={errors.universityId?.message}
        {...register('universityId')}
      >
        {UNIVERSITIES.map((u) => (
          <option key={u.id} value={u.id}>
            {u.label}
          </option>
        ))}
      </Select>
      <Button type="submit" loading={isPending}>
        Crear cuenta
      </Button>
      <p className="text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="text-brand-600 hover:underline">
          Inicia sesión
        </Link>
      </p>
    </form>
  )
}