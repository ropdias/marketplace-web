import { api } from '@/lib/axios'

export interface GetProductsAvailableIn30DaysResponse {
  amount: number
}

export async function getProductsAvailableIn30Days() {
  const response = await api.get<GetProductsAvailableIn30DaysResponse>(
    '/sellers/metrics/products/available',
  )
  return response.data
}
