import { isAxiosError } from 'axios'

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

export function mapGetProductsAvailableIn30DaysErrorMessage(
  error: unknown,
): string {
  if (isAxiosError(error)) {
    const status = error.response?.status

    if (status === 404) return 'O vendedor não foi encontrado.'
  }

  return ''
}
