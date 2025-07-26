import { useQuery } from '@tanstack/react-query'
import { ArrowLeft02Icon, Tick02Icon, UnavailableIcon } from 'hugeicons-react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'

import { getProductById } from '@/api/products/get-product-by-id'
import { FormLink } from '@/components/form-link'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

import { ProductForm } from './product-form'

export function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()

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

  useEffect(() => {
    if (isError) {
      toast.error('Produto não encontrado.')
      navigate('/products')
    }
  }, [isError, navigate])

  if (isLoading) return null

  return (
    <>
      <Helmet title="Editar Produto" />
      <div className="flex items-end justify-between gap-6">
        <div className="flex flex-col gap-2">
          <FormLink to="/products" iconLeft={ArrowLeft02Icon}>
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
          <FormLink to="/products" iconLeft={Tick02Icon}>
            Marcar como vendido
          </FormLink>
          <FormLink to="/products" iconLeft={UnavailableIcon}>
            Desativar anúncio
          </FormLink>
        </div>
      </div>

      <ProductForm initialData={getProductResponse?.product} />
    </>
  )
}
