import { api } from '@/lib/axios'

export interface GetViewsPerDayBySellerIn30DaysResponse {
  viewsPerDay: {
    date: string
    amount: number
  }[]
}

export async function getViewsPerDayBySellerIn30Days() {
  const response = await api.get<GetViewsPerDayBySellerIn30DaysResponse>(
    '/sellers/metrics/views/days',
  )
  return response.data
}
