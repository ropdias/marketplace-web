import { zodResolver } from '@hookform/resolvers/zod'
import { SaleTag02Icon, Search01Icon } from 'hugeicons-react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'

import { mapGetAllProductsFromSellerErrorMessage } from '@/api/products/get-all-products-from-seller'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAllProductsFromSeller } from '@/hooks/queries/use-all-products-from-seller'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'
import { ProductStatus } from '@/types/product'

import { ProductItem } from './product-item'
import { ProductItemSkeleton } from './product-item-skeleton'

const filterFormSchema = z.object({
  search: z
    .string()
    .optional()
    .transform((val) => val || undefined),
  status: z
    .union([z.nativeEnum(ProductStatus), z.literal('')])
    .transform((val) => (val === '' ? undefined : val))
    .optional(),
})

type FilterFormInputs = z.infer<typeof filterFormSchema>

const statusParamSchema = z.nativeEnum(ProductStatus)

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams()

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FilterFormInputs>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      search: '',
      status: undefined,
    },
  })

  async function handleFilterFormSubmit(data: FilterFormInputs) {
    setSearchParams(() => {
      const newParams = new URLSearchParams()

      if (data.status) newParams.set('status', data.status)
      if (data.search) newParams.set('search', data.search)

      return newParams
    })
  }

  const parsedStatus = statusParamSchema.safeParse(searchParams.get('status'))
  const status = parsedStatus.success ? parsedStatus.data : undefined

  const search = searchParams.get('search') ?? undefined

  const {
    data: result,
    isError,
    error,
    isLoading,
  } = useAllProductsFromSeller({ status, search })

  useEffect(() => {
    const parsedStatus = statusParamSchema.safeParse(searchParams.get('status'))
    const status = parsedStatus.success ? parsedStatus.data : undefined

    const search = searchParams.get('search') ?? ''

    reset({ status, search })
  }, [searchParams, reset])

  useEffect(() => {
    if (isError && error) {
      const message = mapGetAllProductsFromSellerErrorMessage(error)
      toast.error(message)
    }
  }, [error, isError])

  return (
    <>
      <Helmet title="Produtos" />
      <div className="flex flex-col gap-2">
        <div className="h-6"></div>
        <p className={cn('text-gray-500', getTailwindClass('font-title-md'))}>
          Seus produtos
        </p>
        <p className={cn('text-gray-300', getTailwindClass('font-body-sm'))}>
          Acesse a sua lista de produtos à venda
        </p>
      </div>
      <div className="flex-start flex gap-6">
        <div className="flex h-full w-[20.4375rem] flex-none flex-col gap-6 rounded-[20px] bg-white p-6">
          <p className={cn('text-gray-300', getTailwindClass('font-title-sm'))}>
            Filtrar
          </p>
          <form
            className="flex w-full flex-col gap-10"
            onSubmit={handleSubmit(handleFilterFormSubmit)}
          >
            <div className="flex flex-col gap-5">
              <Input
                id="search"
                isFilled={false}
                placeholder="Pesquisar"
                iconLeft={Search01Icon}
                {...register('search')}
              ></Input>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? ''}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      onClear={() => field.onChange('')}
                      iconLeft={SaleTag02Icon}
                      selectedValue={field.value ?? ''}
                    >
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Anunciado</SelectItem>
                      <SelectItem value="sold">Vendido</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <Button
              size="medium"
              className="justify-center"
              disabled={isSubmitting}
              type="submit"
            >
              Aplicar Filtro
            </Button>
          </form>
        </div>
        <div className="grid w-full grid-cols-2 grid-rows-3 gap-4">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <ProductItemSkeleton key={i} />
              ))
            : result &&
              result.products.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
        </div>
      </div>
    </>
  )
}
