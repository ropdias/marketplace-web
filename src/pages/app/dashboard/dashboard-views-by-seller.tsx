import { useQuery } from '@tanstack/react-query'
import { UserMultipleIcon } from 'hugeicons-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

import {
  getViewsBySellerIn30Days,
  mapGetViewsBySellerIn30DaysErrorMessage,
} from '@/api/metrics/get-views-by-seller-in-30-days'

import { DashboardItem } from './dashboard-item'

export function DashboardViewsBySeller() {
  const {
    data: viewsBySellerIn30Days,
    error: viewsBySellerIn30DaysError,
    isError: viewsBySellerIn30DaysIsError,
    isLoading,
  } = useQuery({
    queryKey: ['views-by-seller-in-30-days'],
    queryFn: getViewsBySellerIn30Days,
  })

  useEffect(() => {
    if (viewsBySellerIn30DaysIsError && viewsBySellerIn30DaysError) {
      const message = mapGetViewsBySellerIn30DaysErrorMessage(
        viewsBySellerIn30DaysError,
      )
      toast.error(message)
    }
  }, [viewsBySellerIn30DaysError, viewsBySellerIn30DaysIsError])

  return (
    <DashboardItem
      Icon={UserMultipleIcon}
      iconColor="text-gray-300"
      count={viewsBySellerIn30Days?.amount ?? 0}
      label="Pessoas visitantes"
      isLoading={isLoading}
    />
  )
}
