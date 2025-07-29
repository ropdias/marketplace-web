import { useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import { api } from '@/lib/axios'

export function useGlobalAxiosInterceptor() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  useEffect(() => {
    const logoutAndRedirect = (message?: string) => {
      if (message) toast.error(message)
      navigate('/sign-in', { replace: true })
      queryClient.clear() // clear all queries
    }

    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status
          const message = error.response?.data?.message

          // Network error
          if (
            error.code === 'ERR_NETWORK' ||
            error.message === 'Network Error'
          ) {
            toast.error('Servidor indisponível. Tente novamente mais tarde.')
            return Promise.reject(error)
          }

          // Timeout
          if (error.code === 'ECONNABORTED') {
            toast.error('Tempo de resposta excedido. Tente novamente.')
            return Promise.reject(error)
          }

          // Unauthorized
          if (status === 401 && message === 'Unauthorized') {
            logoutAndRedirect('Acesso não autorizado. Faça login novamente.')
            return Promise.reject(error)
          }

          // Server Error (500+)
          if (status && status >= 500) {
            toast.error('Erro interno no servidor. Tente novamente mais tarde.')
            return Promise.reject(error)
          }
        }

        return Promise.reject(error)
      },
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate, queryClient])
}
