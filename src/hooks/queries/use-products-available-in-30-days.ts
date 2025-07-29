import { useQuery } from '@tanstack/react-query'

import { getProductsAvailableIn30Days } from '@/api/metrics/get-products-available-in-30-days'

export function useProductsAvailableIn30Days() {
  return useQuery({
    queryKey: ['products-available-in-30-days'],
    queryFn: getProductsAvailableIn30Days,
  })
}
