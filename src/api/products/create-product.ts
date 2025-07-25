import { api } from '@/lib/axios'
import { Product } from '@/types/product'

export interface CreateProductBody {
  title: string
  categoryId: string
  description: string
  priceInCents: number
  attachmentsIds: string[]
}

export interface CreateProductResponse {
  product: Product
}

export async function createProduct({
  title,
  categoryId,
  description,
  priceInCents,
  attachmentsIds,
}: CreateProductBody) {
  const response = await api.post<CreateProductResponse>('/products', {
    title,
    categoryId,
    description,
    priceInCents,
    attachmentsIds,
  })
  return response.data
}
