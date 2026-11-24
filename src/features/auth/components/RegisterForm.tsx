import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, Mail, User } from 'lucide-react'
import type { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button } from '@/shared/components/Button'
import { ErrorMessage } from '@/shared/components/ErrorMessage'
import { Input } from '@/shared/components/Input'
import { Select } from '@/shared/components/Select'
import { CAMPUSES, UNIVERSITIES } from '@/shared/constants/campuses'
import { useRegister } from '../hooks/useRegister'
import { registerSchema, type RegisterInput } from '../schemas'

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="mb-1 flex w-full items-center gap-3 text-xs font-semibold uppercase tracking-wide text-ink-tertiary">
        {title}
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </legend>
      {children}
    </fieldset>
  )
}

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
    <form onSubmit={handleSubmit((values) => mutate(values))} className="flex flex-col gap-6" noValidate>
      {error && <ErrorMessage message={error.message} />}
      <Group title="Datos personales">
        <Input
          label="Nombre completo"
          autoComplete="name"
          prefix={<User size={16} strokeWidth={1.5} aria-hidden="true" />}
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Correo institucional"
          type="email"
          autoComplete="email"
          placeholder="tu.nombre@uptc.edu.co"
          prefix={<Mail size={16} strokeWidth={1.5} aria-hidden="true" />}
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Contraseña"
          type="password"
          autoComplete="new-password"
          hint="Mínimo 8 caracteres."
          prefix={<Lock size={16} strokeWidth={1.5} aria-hidden="true" />}
          error={errors.password?.message}
          {...register('password')}
        />
      </Group>
      <Group title="Datos académicos">
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
        <Select
          label="Sede"
          placeholder="Selecciona tu sede"
          hint="Verás los objetos reportados en esta sede."
          error={errors.campusId?.message}
          {...register('campusId')}
        >
          {CAMPUSES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </Select>
      </Group>
      <Button type="submit" size="lg" fullWidth loading={isPending}>
        Crear cuenta
      </Button>
      <p className="text-center text-sm text-ink-secondary">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="rounded-sm font-medium text-primary hover:underline">
          Inicia sesión
        </Link>
      </p>
    </form>
  )
}
