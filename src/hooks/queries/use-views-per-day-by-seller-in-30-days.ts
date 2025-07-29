import { useQuery } from '@tanstack/react-query'

import { getViewsPerDayBySellerIn30Days } from '@/api/metrics/get-views-per-day-by-seller-in-30-days'

export function useViewsPerDayBySellerIn30Days() {
  return useQuery({
    queryKey: ['views-per-day-by-seller-in-30-days'],
    queryFn: getViewsPerDayBySellerIn30Days,
  })
}
