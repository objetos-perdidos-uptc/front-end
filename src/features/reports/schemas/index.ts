import { z } from 'zod'

export const createReportSchema = z.object({
  name: z.string().trim().min(2, 'El nombre es obligatorio'),
  description: z.string().trim().min(5, 'Describe el objeto (mínimo 5 caracteres)'),
  categoryId: z.string().trim().min(1, 'La categoría es obligatoria'),
  campusId: z.string().trim().min(1, 'El campus es obligatorio'),
  color: z.string().trim().optional(),
  material: z.string().trim().optional(),
  date: z.string().min(1, 'La fecha es obligatoria'),
})

export type CreateReportInput = z.infer<typeof createReportSchema>
