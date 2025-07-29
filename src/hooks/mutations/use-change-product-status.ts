import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  changeProductStatus,
  mapChangeProductStatusErrorMessage,
} from '@/api/products/change-product-status'
import { GetAllProductsFromSellerResponse } from '@/api/products/get-all-products-from-seller'
import { GetProductByIdResponse } from '@/api/products/get-product-by-id'
import { Product } from '@/types/product'

export function useChangeProductStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: changeProductStatus,
    onMutate: async ({ id: productId, status: newStatus }) => {
      await queryClient.cancelQueries({
        queryKey: ['products-from-seller'],
        exact: false,
      })
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

      const previousProductLists =
        queryClient.getQueriesData<GetAllProductsFromSellerResponse>({
          queryKey: ['products-from-seller'],
          exact: false,
        })

      if (previousProductLists) {
        queryClient.setQueriesData(
          { queryKey: ['products-from-seller'], exact: false },
          (old: GetAllProductsFromSellerResponse) => {
            if (!old || !old.products) return old
            return {
              ...old,
              products: old.products.map((p: Product) =>
                p.id === productId ? { ...p, status: newStatus } : p,
              ),
            }
          },
        )
      }

      return { previousProduct, previousProductLists }
    },
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

      // Rollback getAllProductsFromSeller
      if (context?.previousProductLists) {
        context.previousProductLists.forEach(([key, data]) => {
          queryClient.setQueryData(key, data)
        })
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products-sold-in-30-days'] })
      queryClient.invalidateQueries({
        queryKey: ['products-available-in-30-days'],
      })
    },
  })
}
