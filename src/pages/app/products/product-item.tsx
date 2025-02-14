import { Link } from 'react-router'

import { TagCategory } from '@/components/tag-category'
import { TagStatus } from '@/components/tag-status'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

interface ProductItemProps {
  id: string
  imgSrc: string
  productName: string
  productPrice: number
  productDescription: string
  category: string
  status: 'anunciado' | 'vendido' | 'desativado'
}

export function ProductItem({
  id,
  imgSrc,
  productName,
  productPrice,
  productDescription,
  status,
  category,
}: ProductItemProps) {
  return (
    <Link
      to={`/product/${id}/edit`}
      className="relative flex w-full cursor-pointer flex-col gap-1 rounded-[20px] border-2 border-transparent bg-white p-1 transition-colors hover:border-blue-base"
    >
      <img
        src={imgSrc}
        alt={`Imagem do ${productName}`}
        className="h-full w-full rounded-[16px] object-cover"
      />
      <div className="flex flex-col gap-2 px-3 pb-4 pt-3">
        <div className="flex items-center justify-between">
          <span
            className={cn('text-gray-400', getTailwindClass('font-subtitle'))}
          >
            {productName}
          </span>
          <div className="flex items-baseline justify-center gap-1">
            <span
              className={cn('text-gray-500', getTailwindClass('font-label-md'))}
            >
              R$
            </span>
            <span
              className={cn('text-gray-500', getTailwindClass('font-title-sm'))}
            >
              {new Intl.NumberFormat('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(productPrice)}
            </span>
          </div>
        </div>
        <p
          className={cn(
            'line-clamp-2 text-gray-300',
            getTailwindClass('font-body-sm'),
          )}
        >
          {productDescription}
        </p>
      </div>
      <div className="absolute right-3 top-3 flex gap-1">
        <TagStatus status={status} />
        <TagCategory category={category} />
      </div>
    </Link>
  )
}
