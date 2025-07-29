import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { mapSignInErrorMessage, signIn } from '@/api/sessions/sign-in'

export function useSignIn() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      toast.success('Autenticado com sucesso!')
    },
    onError: (error) => {
      const message = mapSignInErrorMessage(error)
      if (message) toast.error(message)
    },
    onSettled: () => {
      queryClient.clear() // clear all queries
    },
  })
}
