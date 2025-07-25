import { api } from '@/lib/axios'
import { Category } from '@/types/product'

export interface GetAllCategoriesResponse {
  categories: Category[]
}

export async function getAllCategories() {
  const response = await api.get<GetAllCategoriesResponse>('/categories')
  return response.data
}
