import { useEffect } from 'react'
import { Outlet } from 'react-router'
import { toast } from 'sonner'

import { Header } from '@/components/header'
import { SpinnerIcon } from '@/components/ui/spinner-icon'
import { useSellerProfile } from '@/hooks/queries/use-seller-profile'
import { useGlobalAxiosInterceptor } from '@/hooks/use-global-axios-interceptor'

export function AppLayout() {
  useGlobalAxiosInterceptor()

  const { isLoading: isLoadingProfile, isError, error } = useSellerProfile()

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
