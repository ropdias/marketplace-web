import { isAxiosError } from 'axios'

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

export function mapEditProductErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const status = error.response?.status

    if (status === 403)
      return 'Erro: Você não é o vendedor do produto ou o produto já foi vendido.'

    if (status === 404) return 'Erro: O produto não foi encontrado.'
  }

  return ''
}
