import { useQuery } from '@tanstack/react-query'

import { getProductsSoldIn30Days } from '@/api/metrics/get-products-sold-in-30-days'

export function useProductsSoldIn30Days() {
  return useQuery({
    queryKey: ['products-sold-in-30-days'],
    queryFn: getProductsSoldIn30Days,
    staleTime: 1000 * 60 * 5,
  })
}
