import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  editProduct,
  mapEditProductErrorMessage,
} from '@/api/products/edit-product'

export function useEditProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editProduct,
    onSuccess: (response) => {
      queryClient.setQueryData(['product', response.product.id], response)
      queryClient.invalidateQueries({
        queryKey: ['products-from-seller'],
        exact: false,
      })
      toast.success('Produto editado com sucesso!')
    },
    onError: (error) => {
      const message = mapEditProductErrorMessage(error)
      if (message) toast.error(message)
    },
  })
}
