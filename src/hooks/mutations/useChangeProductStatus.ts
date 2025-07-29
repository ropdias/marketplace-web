import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  changeProductStatus,
  mapChangeProductStatusErrorMessage,
} from '@/api/products/change-product-status'

export function useChangeProductStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: changeProductStatus,
    onSuccess: (response) => {
      queryClient.setQueryData(['product', response.product.id], response)
      queryClient.invalidateQueries({
        queryKey: ['products-from-seller'],
        exact: false,
      })
      toast.success('Status do produto alterado com sucesso!')
    },
    onError: (error) => {
      const message = mapChangeProductStatusErrorMessage(error)
      if (message) toast.error(message)
    },
  })
}
