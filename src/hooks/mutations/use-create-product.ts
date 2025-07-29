import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  createProduct,
  mapCreateProductErrorMessage,
} from '@/api/products/create-product'

export function useCreateProduct() {
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success('Produto cadastrado com sucesso!')
    },
    onError: (error) => {
      const message = mapCreateProductErrorMessage(error)
      if (message) toast.error(message)
    },
  })
}
