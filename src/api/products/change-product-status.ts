import { isAxiosError } from 'axios'

import { api } from '@/lib/axios'
import { Product, ProductStatus } from '@/types/product'

export interface ChangeProductPathParams {
  id: string
  status: ProductStatus
}

export interface ChangeProductResponse {
  product: Product
}

export async function changeProductStatus({
  id,
  status,
}: ChangeProductPathParams) {
  const response = await api.patch<ChangeProductResponse>(
    `/products/${id}/${status}`,
  )
  return response.data
}

export function mapChangeProductStatusErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const status = error.response?.status

    if (status === 403)
      return 'Erro: O produto não pertence ao vendedor ou está com o mesmo status.'

    if (status === 404) return 'Erro: O produto não foi encontrado.'
  }

  return ''
}
