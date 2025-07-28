import { useQuery, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { toast } from 'sonner'

import { getSellerProfile } from '@/api/sellers/get-seller-profile'
import { Header } from '@/components/header'
import { SpinnerIcon } from '@/components/ui/spinner-icon'
import { api } from '@/lib/axios'

export function AppLayout() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {
    isLoading: isLoadingProfile,
    isError,
    error,
  } = useQuery({
    queryKey: ['seller-profile'],
    queryFn: getSellerProfile,
    staleTime: Infinity,
  })

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
          if (
            error.code === 'ERR_NETWORK' ||
            error.message === 'Network Error'
          ) {
            logoutAndRedirect(
              'Servidor indisponível. Tente novamente mais tarde.',
            )
            return Promise.reject(error)
          }

          const status = error.response?.status
          const message = error.response?.data.message
          if (status === 401 && message === 'Unauthorized') {
            logoutAndRedirect('Acesso não autorizado. Faça login novamente.')
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

  useEffect(() => {
    if (isError && error) {
      toast.error(
        'Erro: Não foi possível pegar os dados do perfil do vendedor.',
      )
    }
  }, [error, isError])

  return (
    <div className="flex min-h-screen min-w-[66.875rem] flex-col gap-8 px-5 antialiased">
      {isLoadingProfile ? (
        <div className="flex h-screen w-full items-center justify-center">
          <SpinnerIcon />
        </div>
      ) : (
        <>
          <Header />
          <div className="m-auto flex w-full max-w-[64.375rem] flex-1 flex-col gap-10 pb-5">
            <Outlet />
          </div>
        </>
      )}
    </div>
  )
}
