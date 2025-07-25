import { api } from '@/lib/axios'

export interface GetViewsBySellerIn30DaysResponse {
  amount: number
}

export async function getViewsBySellerIn30Days() {
  const response = await api.get<GetViewsBySellerIn30DaysResponse>(
    '/sellers/metrics/views',
  )
  return response.data
}
