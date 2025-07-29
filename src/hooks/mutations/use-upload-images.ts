import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { uploadImages } from '@/api/attachments/upload-images'

export function useUploadImages() {
  return useMutation({
    mutationFn: uploadImages,
    onError: () => {
      toast.error('Erro: Não foi possível enviar as imagens.')
    },
  })
}
