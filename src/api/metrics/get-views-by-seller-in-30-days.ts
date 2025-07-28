import { isAxiosError } from 'axios'

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

export function mapGetViewsBySellerIn30DaysErrorMessage(
  error: unknown,
): string {
  if (isAxiosError(error)) {
    const status = error.response?.status

    if (status === 404) return 'O vendedor não foi encontrado.'
  }

  return ''
}
