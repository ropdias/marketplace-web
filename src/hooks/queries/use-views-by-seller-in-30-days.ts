import { useQuery } from '@tanstack/react-query'

import { getViewsBySellerIn30Days } from '@/api/metrics/get-views-by-seller-in-30-days'

export function useViewsBySellerIn30Days() {
  return useQuery({
    queryKey: ['views-by-seller-in-30-days'],
    queryFn: getViewsBySellerIn30Days,
  })
}
