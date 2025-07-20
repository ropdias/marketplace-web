import { z } from 'zod'

export const productFormSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.type.startsWith('image/'), {
      message: 'O arquivo precisa ser uma imagem',
    })
    .refine((file) => file.size < 5 * 1024 * 1024, {
      message: 'A imagem deve ter menos de 5MB',
    })
    .optional(),
  title: z.string().min(3, 'O título deve ter no mínimo 3 caracteres'),
  priceInCents: z.string().refine((val) => val.trim() !== '', {
    message: 'Informe um valor',
  }),
  description: z.string().min(3, 'A descrição deve ter no mínimo 3 caracteres'),
  categoryId: z.string().uuid({ message: 'Categoria inválida' }),
})

export type productFormInputs = z.infer<typeof productFormSchema>
