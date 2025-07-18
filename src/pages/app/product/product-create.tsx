import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'
import { currencyApplyMask } from '@/utils/currency-apply-mask'
import { parseCurrency } from '@/utils/parse-currency'

import { ProductImageUploader } from './product-image-uploader'

const createProductFormSchema = z.object({
  productImage: z
    .instanceof(File)
    .refine((file) => file.type.startsWith('image/'), {
      message: 'O arquivo precisa ser uma imagem',
    })
    .refine((file) => file.size < 5 * 1024 * 1024, {
      message: 'A imagem deve ter menos de 5MB',
    })
    .optional(),
  title: z.string().min(3, 'O título deve ter no mínimo 3 caracteres'),
  price: z.string().refine((val) => val.trim() !== '', {
    message: 'Informe um valor',
  }),
  description: z.string().min(3, 'A descrição deve ter no mínimo 3 caracteres'),
  category: z
    .string()
    .refine(
      (val) =>
        [
          'Brinquedo',
          'Móvel',
          'Papelaria',
          'Saúde & Beleza',
          'Utensílio',
          'Vestuário',
        ].includes(val),
      {
        message: 'Selecione uma opção válida',
      },
    ),
})

type CreateProductFormInputs = z.infer<typeof createProductFormSchema>

export function ProductCreate() {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CreateProductFormInputs>({
    resolver: zodResolver(createProductFormSchema),
  })

  async function handleCreateProduct(data: CreateProductFormInputs) {
    const parsedPrice = parseCurrency(data.price)
  }

  return (
    <>
      <Helmet title="Cadastro de Produto" />
      <div className="flex flex-col gap-2">
        <p className={cn('text-gray-500', getTailwindClass('font-title-md'))}>
          Novo produto
        </p>
        <p className={cn('text-gray-300', getTailwindClass('font-body-sm'))}>
          Cadastre um produto para venda no marketplace
        </p>
      </div>
      <div className="flex-start flex gap-6">
        <div className="flex-shrink-0">
          <ProductImageUploader />
        </div>
        <div className="flex w-full flex-col gap-8 rounded-[20px] bg-white p-8">
          <p className={cn('text-gray-300', getTailwindClass('font-title-sm'))}>
            Dados do produto
          </p>
          <form
            className="flex flex-col gap-10"
            onSubmit={handleSubmit(handleCreateProduct)}
          >
            <div className="flex flex-col gap-5">
              <div className="flex gap-5">
                <div className="w-full">
                  <Input
                    id="title"
                    placeholder="Nome do produto"
                    labelText="Título"
                    {...register('title')}
                    {...(errors.title && {
                      errorMessage: errors.title.message,
                    })}
                  />
                </div>
                <div className="w-[12.5rem] flex-shrink-0">
                  <Controller
                    control={control}
                    name="price"
                    defaultValue=""
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          inputMode="numeric"
                          id="price"
                          placeholder="0,00"
                          labelText="Valor"
                          iconLeft="R$"
                          isFilled={!!field.value}
                          {...(errors.price && {
                            errorMessage: errors.price.message,
                          })}
                          value={field.value || ''}
                          onChange={(e) =>
                            field.onChange(currencyApplyMask(e.target.value))
                          }
                        />
                      )
                    }}
                  />
                </div>
              </div>
              <Textarea
                id="description"
                placeholder="Escreva detalhes sobre o produto, tamanho, características"
                labelText="Descrição"
                {...register('description')}
                {...(errors.description && {
                  errorMessage: errors.description.message,
                })}
              />
              <div>Categoria aqui</div>
            </div>
            <div className="flex gap-3">
              <Button
                asChild
                variant="outline"
                className="h-12 flex-1 justify-center"
              >
                <Link to="/">Cancelar</Link>
              </Button>
              <Button
                className="h-12 flex-1 justify-center"
                type="submit"
                disabled={isSubmitting}
              >
                Salvar e publicar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
