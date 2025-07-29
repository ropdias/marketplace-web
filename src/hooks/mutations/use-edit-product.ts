import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  editProduct,
  mapEditProductErrorMessage,
} from '@/api/products/edit-product'
import { GetAllProductsFromSellerResponse } from '@/api/products/get-all-products-from-seller'
import { Product } from '@/types/product'

export function useEditProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editProduct,
    onSuccess: (response) => {
      queryClient.setQueryData(['product', response.product.id], response)

      queryClient.setQueriesData(
        { queryKey: ['products-from-seller'], exact: false },
        (old: GetAllProductsFromSellerResponse) => {
          if (!old || !old.products) return old
          return {
            ...old,
            products: old.products.map((p: Product) =>
              p.id === response.product.id ? response.product : p,
            ),
          }
        },
      )

      toast.success('Produto editado com sucesso!')
    },
    onError: (error) => {
      const message = mapEditProductErrorMessage(error)
      if (message) toast.error(message)
    },
  })
}
