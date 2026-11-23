import { zodResolver } from '@hookform/resolvers/zod'
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
    <form onSubmit={handleSubmit((values) => mutate(values))} className="flex flex-col gap-4" noValidate>
      {error && <ErrorMessage message={error.message} />}
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
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Button type="submit" loading={isPending}>
        Iniciar sesión
      </Button>
      <p className="text-center text-sm text-gray-600">
        ¿No tienes cuenta?{' '}
        <Link to="/register" className="text-brand-600 hover:underline">
          Regístrate
        </Link>
      </p>
    </form>
  )
}
