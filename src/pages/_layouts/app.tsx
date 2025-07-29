import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Outlet } from 'react-router'
import { toast } from 'sonner'

import { getSellerProfile } from '@/api/sellers/get-seller-profile'
import { Header } from '@/components/header'
import { SpinnerIcon } from '@/components/ui/spinner-icon'
import { useGlobalAxiosInterceptor } from '@/hooks/useGlobalAxiosInterceptor'

export function AppLayout() {
  useGlobalAxiosInterceptor()

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
