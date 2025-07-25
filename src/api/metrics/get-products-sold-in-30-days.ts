import { api } from '@/lib/axios'

export interface GetProductsSoldIn30DaysResponse {
  amount: number
}

export async function getProductsSoldIn30Days() {
  const response = await api.get<GetProductsSoldIn30DaysResponse>(
    '/sellers/metrics/products/sold',
  )
  return response.data
}
