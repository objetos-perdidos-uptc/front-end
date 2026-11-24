import { zodResolver } from '@hookform/resolvers/zod'
import { Lock, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button } from '@/shared/components/Button'
import { ErrorMessage } from '@/shared/components/ErrorMessage'
import { Input } from '@/shared/components/Input'
import { useLogin } from '../hooks/useLogin'
import { loginSchema, type LoginInput } from '../schemas'

export function LoginForm() {
  const { mutate, isPending, error } = useLogin()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  return (
    <form onSubmit={handleSubmit((values) => mutate(values))} className="flex flex-col gap-5" noValidate>
      {error && <ErrorMessage message={error.message} />}
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
        autoComplete="current-password"
        prefix={<Lock size={16} strokeWidth={1.5} aria-hidden="true" />}
        error={errors.password?.message}
        {...register('password')}
      />
      <Button type="submit" size="lg" fullWidth loading={isPending}>
        Iniciar sesión
      </Button>
      <p className="text-center text-sm text-ink-secondary">
        ¿No tienes cuenta?{' '}
        <Link to="/register" className="rounded-sm font-medium text-primary hover:underline">
          Regístrate
        </Link>
      </p>
    </form>
  )
}
