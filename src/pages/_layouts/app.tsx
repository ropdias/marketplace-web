import { useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

import { getSellerProfile } from '@/api/sellers/get-seller-profile'
import { Header } from '@/components/header'
import { SpinnerIcon } from '@/components/ui/spinner-icon'
import { api } from '@/lib/axios'

export function AppLayout() {
  const navigate = useNavigate()

  const { isLoading: isLoadingProfile } = useQuery({
    queryKey: ['seller-profile'],
    queryFn: getSellerProfile,
    staleTime: Infinity,
  })

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status
          const message = error.response?.data.message
          if (status === 401 && message === 'Unauthorized') {
            navigate('/sign-in', { replace: true })
          } else {
            throw error
          }
        }
      },
    )

    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])

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
