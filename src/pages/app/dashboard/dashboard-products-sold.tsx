import { useQuery } from '@tanstack/react-query'
import { SaleTag02Icon } from 'hugeicons-react'
import { useEffect } from 'react'
import { toast } from 'sonner'

import {
  getProductsSoldIn30Days,
  mapGetProductsSoldIn30DaysErrorMessage,
} from '@/api/metrics/get-products-sold-in-30-days'

import { DashboardItem } from './dashboard-item'

export function DashboardProductsSold() {
  const {
    data: productsSoldIn30Days,
    error: productsSoldIn30DaysError,
    isError: productsSoldIn30DaysIsError,
    isLoading,
  } = useQuery({
    queryKey: ['products-sold-in-30-days'],
    queryFn: getProductsSoldIn30Days,
  })

  useEffect(() => {
    if (productsSoldIn30DaysIsError && productsSoldIn30DaysError) {
      const message = mapGetProductsSoldIn30DaysErrorMessage(
        productsSoldIn30DaysError,
      )
      toast.error(message)
    }
  }, [productsSoldIn30DaysError, productsSoldIn30DaysIsError])

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
