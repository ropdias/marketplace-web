import { UserMultipleIcon } from 'hugeicons-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { mapGetViewsBySellerIn30DaysErrorMessage } from '@/api/metrics/get-views-by-seller-in-30-days'
import { useViewsBySellerIn30Days } from '@/hooks/queries/use-views-by-seller-in-30-days'

import { DashboardItem } from './dashboard-item'

export function DashboardViewsBySeller() {
  const {
    data: viewsBySellerIn30Days,
    error,
    isError,
    isLoading,
  } = useViewsBySellerIn30Days()

  useEffect(() => {
    if (isError && error) {
      const message = mapGetViewsBySellerIn30DaysErrorMessage(error)
      toast.error(message)
    }
  }, [error, isError])

  return (
    <DashboardItem
      Icon={UserMultipleIcon}
      iconColor="text-blue-dark"
      count={viewsBySellerIn30Days?.amount ?? 0}
      label="Pessoas visitantes"
      isLoading={isLoading}
    />
  )
}
