import { Helmet } from 'react-helmet-async'

import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

export function ProductEdit() {
  return (
    <div className="m-auto flex w-full max-w-[66.875rem] flex-1 flex-col gap-10 px-5 pb-5">
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
    </div>
  )
}
