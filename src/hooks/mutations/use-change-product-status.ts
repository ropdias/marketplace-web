import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  changeProductStatus,
  mapChangeProductStatusErrorMessage,
} from '@/api/products/change-product-status'
import { GetProductByIdResponse } from '@/api/products/get-product-by-id'

export function useChangeProductStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: changeProductStatus,
    onMutate: async ({ id: productId, status: newStatus }) => {
      await queryClient.cancelQueries({ queryKey: ['product', productId] })

      const previousProduct = queryClient.getQueryData<GetProductByIdResponse>([
        'product',
        productId,
      ])

      if (previousProduct) {
        queryClient.setQueryData(['product', productId], {
          product: {
            ...previousProduct.product,
            status: newStatus,
          },
        })
      }

      return { previousProduct }
    },
    onSuccess: (response) => {
      queryClient.setQueryData(['product', response.product.id], response)

      toast.success('Status do produto alterado com sucesso!')
    },
    onError: (error, _, context) => {
      const message = mapChangeProductStatusErrorMessage(error)
      if (message) toast.error(message)

      // Rollback getProduct
      if (context?.previousProduct) {
        queryClient.setQueryData(
          ['product', context.previousProduct.product.id],
          context.previousProduct,
        )
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['products-from-seller'],
        exact: false,
      })
      queryClient.invalidateQueries({ queryKey: ['products-sold-in-30-days'] })
      queryClient.invalidateQueries({
        queryKey: ['products-available-in-30-days'],
      })
    },
  })
}
