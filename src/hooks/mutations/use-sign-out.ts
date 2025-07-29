import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { signOut } from '@/api/sessions/sign-out'

export function useSignOut() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      toast.success('Logout realizado com sucesso.')
    },
    onError: () => {
      toast.error('Não foi possível realizar o logout no servidor.')
    },
    onSettled: () => {
      queryClient.clear()
    },
  })
}
