import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import { useCategories } from '@/hooks/queries/useCategories'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

import { ProductForm } from './product-form'
import { ProductFormSkeleton } from './product-form-skeleton'

export function CreateProduct() {
  const navigate = useNavigate()

  const {
    data: allCategories,
    isLoading: isLoadingAllCategories,
    isError: isErrorAllCategories,
    error: errorAllCategories,
  } = useCategories()

  useEffect(() => {
    if (isErrorAllCategories && errorAllCategories) {
      toast.error('Erro: Não foi possível acessar as categorias dos produtos.')
      navigate('/products')
    }
  }, [errorAllCategories, isErrorAllCategories, navigate])

  return (
    <>
      <Helmet title="Cadastro de Produto" />
      <div className="flex flex-col gap-2">
        <div className="h-6"></div>
        <p className={cn('text-gray-500', getTailwindClass('font-title-md'))}>
          Novo produto
        </p>
        <p className={cn('text-gray-300', getTailwindClass('font-body-sm'))}>
          Cadastre um produto para venda no marketplace
        </p>
      </div>
      {isLoadingAllCategories ? (
        <ProductFormSkeleton />
      ) : (
        allCategories?.categories && (
          <ProductForm categories={allCategories.categories} />
        )
      )}
    </>
  )
}
