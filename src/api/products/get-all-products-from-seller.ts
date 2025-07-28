import { isAxiosError } from 'axios'

import { api } from '@/lib/axios'
import { Product, ProductStatus } from '@/types/product'

export interface GetAllProductsFromSellerQuery {
  status?: ProductStatus
  search?: string
}

export interface GetAllProductsFromSellerResponse {
  products: Product[]
}

export async function getAllProductsFromSeller({
  status,
  search,
}: GetAllProductsFromSellerQuery) {
  const response = await api.get<GetAllProductsFromSellerResponse>(
    '/products/me',
    {
      params: {
        status,
        search,
      },
    },
  )
  return response.data
}

export function mapGetAllProductsFromSellerErrorMessage(
  error: unknown,
): string {
  if (isAxiosError(error)) {
    const status = error.response?.status

    if (status === 404) return 'O vendedor não foi encontrado.'
  }

  return ''
}
