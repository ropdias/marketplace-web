import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  createProduct,
  mapCreateProductErrorMessage,
} from '@/api/products/create-product'
import { GetAllProductsFromSellerResponse } from '@/api/products/get-all-products-from-seller'

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (response) => {
      queryClient.setQueriesData(
        { queryKey: ['products-from-seller'], exact: false },
        (old: GetAllProductsFromSellerResponse) => {
          if (!old || !old.products) return old
          return {
            ...old,
            products: [...old.products, response.product],
          }
        },
      )

      queryClient.invalidateQueries({
        queryKey: ['products-available-in-30-days'],
      })

      toast.success('Produto cadastrado com sucesso!')
    },
    onError: (error) => {
      const message = mapCreateProductErrorMessage(error)
      if (message) toast.error(message)
    },
  })
}
