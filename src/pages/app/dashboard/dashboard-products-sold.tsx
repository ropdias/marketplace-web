import { SaleTag02Icon } from 'hugeicons-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { mapGetProductsSoldIn30DaysErrorMessage } from '@/api/metrics/get-products-sold-in-30-days'
import { useProductsSoldIn30Days } from '@/hooks/queries/use-products-sold-in-30-days'

import { DashboardItem } from './dashboard-item'

export function DashboardProductsSold() {
  const {
    data: productsSoldIn30Days,
    error,
    isError,
    isLoading,
  } = useProductsSoldIn30Days()

  useEffect(() => {
    if (isError && error) {
      const message = mapGetProductsSoldIn30DaysErrorMessage(error)
      toast.error(message)
    }
  }, [error, isError])

  return (
    <DashboardItem
      Icon={SaleTag02Icon}
      iconColor="text-blue-dark"
      count={productsSoldIn30Days?.amount ?? 0}
      label="Produtos vendidos"
      isLoading={isLoading}
    />
  )
}
