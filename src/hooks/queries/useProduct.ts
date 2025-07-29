import { useQuery } from '@tanstack/react-query'

import { getProductById } from '@/api/products/get-product-by-id'

interface UseProductProps {
  productId?: string
}

export function useProduct({ productId }: UseProductProps) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById({ id: productId! }),
    enabled: !!productId,
    retry: false,
  })
}
