import { z } from 'zod'

function isNotFuture(value: string): boolean {
  const today = new Date()
  today.setHours(23, 59, 59, 999)
  return new Date(`${value}T12:00:00`) <= today
}

/**
 * Formulario de reporte. Reglas de report-service:
 * - `type` LOST o FOUND.
 * - Un LOST exige característica privada (HU-03); en FOUND es opcional.
 * - La fecha no puede ser futura.
 * - El campus no se envía: report-service lo toma del token.
 */
export const createReportSchema = z
  .object({
    type: z.enum(['LOST', 'FOUND'], { message: 'Elige si lo perdiste o lo encontraste' }),
    name: z.string().trim().min(2, 'El nombre es obligatorio').max(120, 'Máximo 120 caracteres'),
    description: z.string().trim().min(5, 'Describe el objeto (mínimo 5 caracteres)').max(2000, 'Máximo 2000 caracteres'),
    categoryId: z.string().trim().min(1, 'Elige una categoría'),
    color: z.string().trim().max(60, 'Máximo 60 caracteres').optional(),
    material: z.string().trim().max(60, 'Máximo 60 caracteres').optional(),
    place: z.string().trim().max(255, 'Máximo 255 caracteres').optional(),
    privateFeature: z.string().trim().max(255, 'Máximo 255 caracteres').optional(),
    reward: z
      .string()
      .trim()
      .optional()
      .refine((v) => !v || (/^\d+(\.\d+)?$/.test(v) && Number(v) >= 0), 'Debe ser un número positivo'),
    custodyLocation: z.string().trim().max(255, 'Máximo 255 caracteres').optional(),
    date: z.string().min(1, 'La fecha es obligatoria').refine(isNotFuture, 'La fecha no puede ser futura'),
  })
  .superRefine((value, ctx) => {
    if (value.type === 'LOST' && !value.privateFeature) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['privateFeature'],
        message: 'Escribe un detalle que solo el dueño conozca',
      })
    }
  })

export type CreateReportInput = z.infer<typeof createReportSchema>
