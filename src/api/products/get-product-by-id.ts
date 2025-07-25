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
