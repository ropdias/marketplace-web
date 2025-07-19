import { Helmet } from 'react-helmet-async'

import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'
import { parseCurrency } from '@/utils/parse-currency'

import { ProductForm } from './product-form'
import { productFormInputs } from './product-form.schema'

export function ProductCreate() {
  async function handleProductFormSubmit(data: productFormInputs) {
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
      <ProductForm
        handleProductFormSubmit={handleProductFormSubmit}
        action="create"
      />
    </>
  )
}
