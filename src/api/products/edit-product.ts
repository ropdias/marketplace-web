import { api } from '@/lib/axios'
import { Product } from '@/types/product'

export interface EditProductPathParams {
  id: string
}

export interface EditProductBody {
  title: string
  categoryId: string
  description: string
  priceInCents: number
  attachmentsIds: string[]
}

export interface EditProductResponse {
  product: Product
}

export async function editProduct({
  pathParams,
  body,
}: {
  pathParams: EditProductPathParams
  body: EditProductBody
}) {
  const response = await api.put<EditProductResponse>(
    `/products/${pathParams.id}`,
    body,
  )
  return response.data
}
