import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
  createSeller,
  mapCreateSellerErrorMessage,
} from '@/api/sellers/create-seller'

export function useCreateSeller() {
  return useMutation({
    mutationFn: createSeller,
    onSuccess: () => {
      toast.success('Cadastro realizado com sucesso!')
    },
    onError: (error) => {
      const message = mapCreateSellerErrorMessage(error)
      if (message) toast.error(message)
    },
  })
}
