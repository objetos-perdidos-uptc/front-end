import { z } from 'zod'

export const createClaimSchema = z.object({
  reportId: z.string().trim().min(1, 'El ID del reporte es obligatorio'),
  description: z.string().trim().min(5, 'Explica por qué es tuyo (mínimo 5 caracteres)'),
  contactPhone: z
    .string()
    .trim()
    .min(7, 'Teléfono inválido')
    .regex(/^[+\d\s()-]+$/, 'Solo números, espacios, + ( ) -'),
})

export type CreateClaimInput = z.infer<typeof createClaimSchema>
