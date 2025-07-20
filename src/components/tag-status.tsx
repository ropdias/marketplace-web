import { ProductStatus } from '@/types/product'

import { Badge, BadgeColorVariants } from './ui/badge'

interface ProductStatusPresentation {
  label: string
  variant: BadgeColorVariants
}

const productStatusPresentationMap: Record<
  ProductStatus,
  ProductStatusPresentation
> = {
  [ProductStatus.AVAILABLE]: {
    label: 'ANUNCIADO',
    variant: 'available',
  },
  [ProductStatus.SOLD]: {
    label: 'VENDIDO',
    variant: 'sold',
  },
  [ProductStatus.CANCELLED]: {
    label: 'DESATIVADO',
    variant: 'cancelled',
  },
}

interface TagStatusProps {
  status: ProductStatus
}

export function TagStatus({ status }: TagStatusProps) {
  const { label, variant } = productStatusPresentationMap[status]

  return <Badge variant={variant}>{label}</Badge>
}
