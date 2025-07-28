import { isAxiosError } from 'axios'

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

export function mapGetViewsPerDayBySellerIn30DaysGetViewsBySellerIn30DaysErrorMessage(
  error: unknown,
): string {
  if (isAxiosError(error)) {
    const status = error.response?.status

    if (status === 404) return 'Erro: O vendedor não foi encontrado.'
  }

  return ''
}
