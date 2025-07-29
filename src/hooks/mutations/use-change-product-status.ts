import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  changeProductStatus,
  mapChangeProductStatusErrorMessage,
} from '@/api/products/change-product-status'
import { GetAllProductsFromSellerResponse } from '@/api/products/get-all-products-from-seller'
import { Product } from '@/types/product'

export function useChangeProductStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: changeProductStatus,
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

      queryClient.invalidateQueries({ queryKey: ['products-sold-in-30-days'] })
      queryClient.invalidateQueries({
        queryKey: ['products-available-in-30-days'],
      })

      toast.success('Status do produto alterado com sucesso!')
    },
    onError: (error) => {
      const message = mapChangeProductStatusErrorMessage(error)
      if (message) toast.error(message)
    },
  })
}
