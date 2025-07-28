import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import { uploadImages } from '@/api/attachments/upload-images'
import { getAllCategories } from '@/api/categories/get-all-categories'
import {
  createProduct,
  mapCreateProductErrorMessage,
} from '@/api/products/create-product'
import {
  editProduct,
  mapEditProductErrorMessage,
} from '@/api/products/edit-product'
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
import { Product, ProductStatus } from '@/types/product'
import { currencyApplyMask } from '@/utils/currency-apply-mask'
import { unmaskCurrencyToCents } from '@/utils/unmask-currency-to-cents'

import { productFormInputs, productFormSchema } from './product-form.schema'
import { getProductFormDefaultValues } from './product-form.utils'
import { ProductImageUploader } from './product-image-uploader'

interface ProductFormProps {
  initialData?: Product
}

export function ProductForm({ initialData }: ProductFormProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<productFormInputs>({
    resolver: zodResolver(productFormSchema),
    values: getProductFormDefaultValues(initialData),
  })

  const {
    data: allCategories,
    isError,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  })

  const { mutateAsync: uploadImagesFn } = useMutation({
    mutationFn: uploadImages,
  })

  const { mutateAsync: createProductFn } = useMutation({
    mutationFn: createProduct,
  })

  const { mutateAsync: editProductFn } = useMutation({
    mutationFn: editProduct,
  })

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
        toast.error('Erro: Não foi possível a enviar imagem do produto.')
        return
      }
    }

    if (initialData) {
      try {
        const response = await editProductFn({
          pathParams: { id: initialData.id },
          body: {
            title: data.title,
            categoryId: data.categoryId,
            description: data.description,
            priceInCents,
            attachmentsIds,
          },
        })

        queryClient.setQueryData(['product', response.product.id], response)
        queryClient.invalidateQueries({
          queryKey: ['products-from-seller'],
          exact: false,
        })
        toast.success('Produto editado com sucesso!')
        navigate(`/products`)
      } catch (error) {
        const message = mapEditProductErrorMessage(error)
        if (message) toast.error(message)
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

        toast.success('Produto cadastrado com sucesso!')
        navigate(`/products`)
      } catch (error) {
        const message = mapCreateProductErrorMessage(error)
        if (message) toast.error(message)
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

  useEffect(() => {
    if (isError && error) {
      toast.error('Erro: Não foi possível acessar as categorias dos produtos.')
      navigate('/products')
    }
  }, [error, isError, navigate])

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
                    {allCategories?.categories.map((category) => (
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
