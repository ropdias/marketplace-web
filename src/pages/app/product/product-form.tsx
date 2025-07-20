import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router'

import { TagStatus } from '@/components/tag-status'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'
import { mockCategories, Product } from '@/types/product'
import { currencyApplyMask } from '@/utils/currency-apply-mask'

import { productFormInputs, productFormSchema } from './product-form.schema'
import { getProductFormDefaultValues } from './product-form.utils'
import { ProductImageUploader } from './product-image-uploader'

interface ProductFormProps {
  handleProductFormSubmit: (data: productFormInputs) => Promise<void>
  action: 'create' | 'edit'
  initialData?: Product
}

export function ProductForm({
  handleProductFormSubmit,
  action,
  initialData,
}: ProductFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<productFormInputs>({
    resolver: zodResolver(productFormSchema),
    defaultValues: getProductFormDefaultValues(initialData),
  })

  return (
    <div className="flex-start flex gap-6">
      <div className="flex-shrink-0">
        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <ProductImageUploader
              onChange={field.onChange}
              id="image"
              {...(errors.image && {
                errorMessage: errors.image.message,
              })}
            />
          )}
        />
      </div>
      <div className="flex w-full flex-col gap-8 rounded-[20px] bg-white p-8">
        <div className="flex items-center justify-between">
          <p className={cn('text-gray-300', getTailwindClass('font-title-sm'))}>
            Dados do produto
          </p>
          {action === 'edit' && initialData && (
            <TagStatus status={initialData.status} />
          )}
        </div>
        <form
          className="flex flex-col gap-10"
          onSubmit={handleSubmit(handleProductFormSubmit)}
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
                  name="priceInCents"
                  defaultValue=""
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        inputMode="numeric"
                        id="priceInCents"
                        placeholder="0,00"
                        labelText="Valor"
                        iconLeft="R$"
                        isFilled={!!field.value}
                        {...(errors.priceInCents && {
                          errorMessage: errors.priceInCents.message,
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
            <Controller
              name="categoryId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    onClear={() => field.onChange('')}
                    selectedValue={field.value}
                    labelText="Categoria"
                    {...(errors.categoryId && {
                      errorMessage: errors.categoryId.message,
                    })}
                  >
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
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
              {action === 'edit' ? 'Salvar e atualizar' : 'Salvar e publicar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
