import { Store04Icon } from 'hugeicons-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { mapGetProductsAvailableIn30DaysErrorMessage } from '@/api/metrics/get-products-available-in-30-days'
import { useProductsAvailableIn30Days } from '@/hooks/queries/use-products-available-in-30-days'

import { DashboardItem } from './dashboard-item'

export function DashboardProductsAvailable() {
  const {
    data: productsAvailableIn30Days,
    error,
    isError,
    isLoading,
  } = useProductsAvailableIn30Days()

  useEffect(() => {
    if (isError && error) {
      const message = mapGetProductsAvailableIn30DaysErrorMessage(error)
      toast.error(message)
    }
  }, [error, isError])

  return (
    <DashboardItem
      Icon={Store04Icon}
      iconColor="text-blue-dark"
      count={productsAvailableIn30Days?.amount ?? 0}
      label="Produtos anunciados"
      isLoading={isLoading}
    />
  )
}
