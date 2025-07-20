import { Link } from 'react-router'

import { TagCategory } from '@/components/tag-category'
import { TagStatus } from '@/components/tag-status'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'
import { Product } from '@/types/product'

interface ProductItemProps {
  product: Product
}

export function ProductItem({ product }: ProductItemProps) {
  return (
    <Link
      to={`/product/${product.id}/edit`}
      className="relative flex w-full cursor-pointer flex-col gap-1 rounded-[20px] bg-white p-1 outline-none transition-shadow hover:ring-2 hover:ring-blue-base focus-visible:ring-2 focus-visible:ring-blue-base"
    >
      <img
        src={product.attachments[0].url}
        alt={`Imagem do ${product.title}`}
        className="h-full w-full rounded-[16px] object-cover"
      />
      <div className="flex flex-col gap-2 px-3 pb-4 pt-3">
        <div className="flex items-center justify-between">
          <span
            className={cn('text-gray-400', getTailwindClass('font-subtitle'))}
          >
            {product.title}
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
              }).format(product.priceInCents / 100)}
            </span>
          </div>
        </div>
        <p
          className={cn(
            'line-clamp-2 text-gray-300',
            getTailwindClass('font-body-sm'),
          )}
        >
          {product.description}
        </p>
      </div>
      <div className="absolute right-3 top-3 flex gap-1">
        <TagStatus status={product.status} />
        <TagCategory category={product.category.title} />
      </div>
    </Link>
  )
}
