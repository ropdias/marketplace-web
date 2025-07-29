import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

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
import { useCreateProduct } from '@/hooks/mutations/use-create-product'
import { useEditProduct } from '@/hooks/mutations/use-edit-product'
import { useUploadImages } from '@/hooks/mutations/use-upload-images'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'
import { Category, Product, ProductStatus } from '@/types/product'
import { currencyApplyMask } from '@/utils/currency-apply-mask'
import { unmaskCurrencyToCents } from '@/utils/unmask-currency-to-cents'

import { productFormInputs, productFormSchema } from './product-form.schema'
import { getProductFormDefaultValues } from './product-form.utils'
import { ProductImageUploader } from './product-image-uploader'

interface ProductFormProps {
  initialData?: Product
  categories: Category[]
}

export function ProductForm({ initialData, categories }: ProductFormProps) {
  const navigate = useNavigate()

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<productFormInputs>({
    resolver: zodResolver(productFormSchema),
    values: getProductFormDefaultValues(initialData),
  })

  const { mutateAsync: uploadImagesFn } = useUploadImages()

  const { mutateAsync: createProductFn } = useCreateProduct()

  const { mutateAsync: editProductFn } = useEditProduct()

  async function handleProductFormSubmit(data: productFormInputs) {
    const priceInCents = unmaskCurrencyToCents(data.priceInCents)
    let attachmentsIds: string[] = []

    if (initialData) {
      attachmentsIds = initialData.attachments.map(
        (attachment) => attachment.id,
      )
    }

    if (data.image) {
      const files = new FormData()
      files.append('files', data.image)

      try {
        const uploadImagesResponse = await uploadImagesFn({ files })
        attachmentsIds = uploadImagesResponse.attachments.map(
          (attachment) => attachment.id,
        )
      } catch {
        // Error already handled in onError
        // Return to avoid editing or creating a product without an image
        return
      }
    }

    if (initialData) {
      try {
        await editProductFn({
          pathParams: { id: initialData.id },
          body: {
            title: data.title,
            categoryId: data.categoryId,
            description: data.description,
            priceInCents,
            attachmentsIds,
          },
        })

        navigate(`/products`)
      } catch {
        // Error already handled in onError
      }
    } else {
      try {
        await createProductFn({
          title: data.title,
          categoryId: data.categoryId,
          description: data.description,
          priceInCents,
          attachmentsIds,
        })

        navigate(`/products`)
      } catch {
        // Error already handled in onError
      }
    }
  }

  const isDisabled = () => {
    return (
      initialData?.status === ProductStatus.CANCELLED ||
      initialData?.status === ProductStatus.SOLD ||
      isSubmitting
    )
  }

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
              defaultImageUrl={initialData?.attachments?.[0]?.url}
              {...(errors.image && {
                errorMessage: errors.image.message,
              })}
              disabled={isDisabled()}
            />
          )}
        />
      </div>
      <div className="flex w-full flex-col gap-8 rounded-[20px] bg-white p-8">
        <div className="flex items-center justify-between">
          <p className={cn('text-gray-300', getTailwindClass('font-title-sm'))}>
            Dados do produto
          </p>
          {initialData && <TagStatus status={initialData.status} />}
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
                  disabled={isDisabled()}
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
                        disabled={isDisabled()}
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
              disabled={isDisabled()}
            />
            <Controller
              name="categoryId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isDisabled()}
                >
                  <SelectTrigger
                    onClear={() => field.onChange('')}
                    selectedValue={field.value}
                    labelText="Categoria"
                    {...(errors.categoryId && {
                      errorMessage: errors.categoryId.message,
                    })}
                    disabled={isDisabled()}
                  >
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
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
              variant="outline"
              type="button"
              className="h-12 flex-1 justify-center"
              disabled={isDisabled()}
              onClick={() => navigate('/products')}
            >
              Cancelar
            </Button>
            <Button
              className="h-12 flex-1 justify-center"
              type="submit"
              disabled={isDisabled()}
            >
              {initialData ? 'Salvar e atualizar' : 'Salvar e publicar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
