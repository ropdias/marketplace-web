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
