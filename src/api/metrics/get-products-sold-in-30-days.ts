import { isAxiosError } from 'axios'

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

export function mapGetProductsSoldIn30DaysErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const status = error.response?.status

    if (status === 404) return 'Erro: O vendedor não foi encontrado.'
  }

  return ''
}
