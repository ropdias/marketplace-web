import { Helmet } from 'react-helmet-async'

import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'
import { parseCurrency } from '@/utils/parse-currency'

import { ProductForm } from './product-form'
import { productFormInputs } from './product-form.schema'

export function ProductEdit() {
  async function handleProductFormSubmit(data: productFormInputs) {
    const parsedPrice = parseCurrency(data.price)
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
        initialData={{
          id: '1',
          title: 'Sofá',
          price: '1200,90',
          description:
            'Sofá revestido em couro legítimo, com estrutura em madeira maciça e pés em metal cromado.',
          category: 'furniture',
          status: 'anunciado',
        }}
      />
    </>
  )
}
