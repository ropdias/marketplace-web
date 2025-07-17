import { Helmet } from 'react-helmet-async'

import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

export function ProductEdit() {
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
      <div className="flex-start flex gap-6"></div>
    </>
  )
}
