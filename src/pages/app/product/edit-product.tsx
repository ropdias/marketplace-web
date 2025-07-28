import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft02Icon, Tick02Icon, UnavailableIcon } from 'hugeicons-react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'

import {
  changeProductStatus,
  mapChangeProductStatusErrorMessage,
} from '@/api/products/change-product-status'
import { getProductById } from '@/api/products/get-product-by-id'
import { FormLink } from '@/components/form-link'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'
import { ProductStatus } from '@/types/product'

import { ProductForm } from './product-form'

export function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    data: getProductResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById({ id: id! }),
    enabled: !!id,
    retry: false,
  })

  const { mutateAsync: changeProductStatusFn } = useMutation({
    mutationFn: changeProductStatus,
  })

  useEffect(() => {
    if (isError) {
      toast.error('Produto não encontrado.')
      navigate('/products')
    }
  }, [isError, navigate])

  if (isLoading) return null

  const handleChangeProductStatus = async ({
    id,
    status,
  }: {
    id: string
    status: ProductStatus
  }) => {
    try {
      const response = await changeProductStatusFn({ id, status })
      queryClient.setQueryData(['product', response.product.id], response)
      queryClient.invalidateQueries({
        queryKey: ['products-from-seller'],
        exact: false,
      })
      toast.success('Status do produto alterado com sucesso!')
    } catch (error) {
      const message = mapChangeProductStatusErrorMessage(error)
      if (message) toast.error(message)
    }
  }

  return (
    <>
      <Helmet title="Editar Produto" />
      <div className="flex items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <FormLink
            iconLeft={ArrowLeft02Icon}
            onClick={() => navigate('/products')}
          >
            Voltar
          </FormLink>
          <p className={cn('text-gray-500', getTailwindClass('font-title-md'))}>
            Editar produto
          </p>
          <p className={cn('text-gray-300', getTailwindClass('font-body-sm'))}>
            Gerencie as informações do produto cadastrado
          </p>
        </div>
        <div className="flex items-center gap-4 pr-3">
          {getProductResponse?.product.status === ProductStatus.SOLD && (
            <>
              <FormLink
                iconLeft={Tick02Icon}
                onClick={() => {
                  handleChangeProductStatus({
                    id: getProductResponse?.product.id,
                    status: ProductStatus.AVAILABLE,
                  })
                }}
              >
                Marcar como disponível
              </FormLink>
              <FormLink iconLeft={UnavailableIcon} disabled>
                Produto Vendido
              </FormLink>
            </>
          )}
          {getProductResponse?.product.status === ProductStatus.AVAILABLE && (
            <>
              <FormLink
                iconLeft={Tick02Icon}
                onClick={() => {
                  handleChangeProductStatus({
                    id: getProductResponse?.product.id,
                    status: ProductStatus.SOLD,
                  })
                }}
              >
                Marcar como vendido
              </FormLink>
              <FormLink
                iconLeft={UnavailableIcon}
                onClick={() => {
                  handleChangeProductStatus({
                    id: getProductResponse?.product.id,
                    status: ProductStatus.CANCELLED,
                  })
                }}
              >
                Desativar anúncio
              </FormLink>
            </>
          )}
          {getProductResponse?.product.status === ProductStatus.CANCELLED && (
            <>
              <FormLink iconLeft={Tick02Icon} disabled>
                Produto Desabilitado
              </FormLink>
              <FormLink
                iconLeft={UnavailableIcon}
                onClick={() => {
                  handleChangeProductStatus({
                    id: getProductResponse?.product.id,
                    status: ProductStatus.AVAILABLE,
                  })
                }}
              >
                Reativar anúncio
              </FormLink>
            </>
          )}
        </div>
      </div>

      <ProductForm initialData={getProductResponse?.product} />
    </>
  )
}
