import { useQuery } from '@tanstack/react-query'

import { getAllCategories } from '@/api/categories/get-all-categories'

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  })
}
