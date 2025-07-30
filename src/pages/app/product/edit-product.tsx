import { ArrowLeft02Icon, Tick02Icon, UnavailableIcon } from 'hugeicons-react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'

import { mapGetProductByIdErrorMessage } from '@/api/products/get-product-by-id'
import { FormLink } from '@/components/form-link'
import { useChangeProductStatus } from '@/hooks/mutations/use-change-product-status'
import { useCategories } from '@/hooks/queries/use-categories'
import { useProduct } from '@/hooks/queries/use-product'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'
import { ProductStatus } from '@/types/product'

import { ProductForm } from './product-form'
import { ProductFormSkeleton } from './product-form-skeleton'

export function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    data: getProductResponse,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
    error: errorProduct,
  } = useProduct({ productId: id })

  const {
    data: allCategories,
    isLoading: isLoadingAllCategories,
    isError: isErrorAllCategories,
    error: errorAllCategories,
  } = useCategories()

  const {
    mutateAsync: changeProductStatusFn,
    isPending: isPendingChangeProductStatus,
  } = useChangeProductStatus()

  useEffect(() => {
    if (isErrorProduct && errorProduct) {
      const message = mapGetProductByIdErrorMessage(errorProduct)
      toast.error(message)
      navigate('/products')
    }
    if (isErrorAllCategories && errorAllCategories) {
      toast.error('Erro: Não foi possível acessar as categorias dos produtos.')
      navigate('/products')
    }
  }, [
    errorAllCategories,
    errorProduct,
    isErrorAllCategories,
    isErrorProduct,
    navigate,
  ])

  const handleChangeProductStatus = async ({
    id,
    status,
  }: {
    id: string
    status: ProductStatus
  }) => {
    try {
      await changeProductStatusFn({ id, status })
    } catch {
      // Error already handled in onError
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
          {!isLoadingProduct &&
            !isLoadingAllCategories &&
            getProductResponse?.product && (
              <>
                <FormLink
                  iconLeft={Tick02Icon}
                  onClick={() => {
                    handleChangeProductStatus({
                      id: getProductResponse?.product.id,
                      status:
                        getProductResponse?.product.status ===
                        ProductStatus.SOLD
                          ? ProductStatus.AVAILABLE
                          : ProductStatus.SOLD,
                    })
                  }}
                  disabled={
                    isLoadingProduct ||
                    isLoadingAllCategories ||
                    isPendingChangeProductStatus ||
                    getProductResponse?.product.status ===
                      ProductStatus.CANCELLED
                  }
                >
                  {getProductResponse?.product.status === ProductStatus.SOLD &&
                    'Marcar como disponível'}
                  {getProductResponse?.product.status ===
                    ProductStatus.AVAILABLE && 'Marcar como vendido'}
                  {getProductResponse?.product.status ===
                    ProductStatus.CANCELLED && 'Produto Desabilitado'}
                </FormLink>
                <FormLink
                  iconLeft={UnavailableIcon}
                  onClick={() => {
                    handleChangeProductStatus({
                      id: getProductResponse?.product.id,
                      status:
                        getProductResponse?.product.status ===
                        ProductStatus.AVAILABLE
                          ? ProductStatus.CANCELLED
                          : ProductStatus.AVAILABLE,
                    })
                  }}
                  disabled={
                    isPendingChangeProductStatus ||
                    getProductResponse?.product.status === ProductStatus.SOLD
                  }
                >
                  {getProductResponse?.product.status === ProductStatus.SOLD &&
                    'Produto Vendido'}
                  {getProductResponse?.product.status ===
                    ProductStatus.AVAILABLE && 'Desativar anúncio'}
                  {getProductResponse?.product.status ===
                    ProductStatus.CANCELLED && 'Reativar anúncio'}
                </FormLink>
              </>
            )}
        </div>
      </div>
      {isLoadingProduct || isLoadingAllCategories ? (
        <ProductFormSkeleton />
      ) : getProductResponse?.product && allCategories?.categories ? (
        <ProductForm
          initialData={getProductResponse.product}
          categories={allCategories.categories}
        />
      ) : null}
    </>
  )
}
