import { useQuery } from '@tanstack/react-query'
import { Store04Icon } from 'hugeicons-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

import {
  getProductsAvailableIn30Days,
  mapGetProductsAvailableIn30DaysErrorMessage,
} from '@/api/metrics/get-products-available-in-30-days'

import { DashboardItem } from './dashboard-item'

export function DashboardProductsAvailable() {
  const {
    data: productsAvailableIn30Days,
    error: productsAvailableIn30DaysError,
    isError: productsAvailableIn30DaysIsError,
    isLoading,
  } = useQuery({
    queryKey: ['products-available-in-30-days'],
    queryFn: getProductsAvailableIn30Days,
  })

  useEffect(() => {
    if (productsAvailableIn30DaysIsError && productsAvailableIn30DaysError) {
      const message = mapGetProductsAvailableIn30DaysErrorMessage(
        productsAvailableIn30DaysError,
      )
      toast.error(message)
    }
  }, [productsAvailableIn30DaysError, productsAvailableIn30DaysIsError])

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
