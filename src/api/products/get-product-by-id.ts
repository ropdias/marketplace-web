import { isAxiosError } from 'axios'

import { api } from '@/lib/axios'
import { Product } from '@/types/product'

export interface GetProductByIdPathParams {
  id: string
}

export interface GetProductByIdResponse {
  product: Product
}

export async function getProductById({ id }: GetProductByIdPathParams) {
  const response = await api.get<GetProductByIdResponse>(`/products/${id}`)
  return response.data
}

export function mapGetProductByIdErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const status = error.response?.status

    if (status === 404) return 'Erro: O produto não foi encontrado.'
  }

  return ''
}
