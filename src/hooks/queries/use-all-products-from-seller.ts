import { useQuery } from '@tanstack/react-query'

import { getAllProductsFromSeller } from '@/api/products/get-all-products-from-seller'
import { ProductStatus } from '@/types/product'

interface UseAllProductsFromSellerProps {
  status?: ProductStatus
  search?: string
}

export function useAllProductsFromSeller({
  status,
  search,
}: UseAllProductsFromSellerProps) {
  return useQuery({
    queryKey: ['products-from-seller', status, search],
    queryFn: () =>
      getAllProductsFromSeller({
        status,
        search,
      }),
    staleTime: 1000 * 60 * 5,
  })
}
