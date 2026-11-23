import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'El email es obligatorio').email('Email inválido'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
})

export type LoginInput = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  name: z.string().trim().min(2, 'El nombre es obligatorio'),
  email: z.string().min(1, 'El email es obligatorio').email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  campusId: z.string().trim().min(1, 'Selecciona un campus'),
  universityId: z.string().trim().min(1, 'Selecciona una universidad'),
})

export type RegisterInput = z.infer<typeof registerSchema>