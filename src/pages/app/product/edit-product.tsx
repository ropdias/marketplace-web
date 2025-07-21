import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router'

import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'
import { mockProducts } from '@/types/product'
import { unmaskCurrencyToCents } from '@/utils/unmask-currency-to-cents'

import { ProductForm } from './product-form'
import { productFormInputs } from './product-form.schema'

export function EditProduct() {
  const { id } = useParams()

  const product = mockProducts.find((product) => product.id === id)

  async function handleProductFormSubmit(data: productFormInputs) {
    const priceInCents = unmaskCurrencyToCents(data.priceInCents)
  }

  return (
    <>
      <Helmet title="Cadastro de Produto" />
      <div className="flex flex-col gap-2">
        <p className={cn('text-gray-500', getTailwindClass('font-title-md'))}>
          Editar produto
        </p>
        <p className={cn('text-gray-300', getTailwindClass('font-body-sm'))}>
          Gerencie as informações do produto cadastrado
        </p>
      </div>
      <ProductForm
        handleProductFormSubmit={handleProductFormSubmit}
        action="edit"
        initialData={product}
      />
    </>
  )
}
