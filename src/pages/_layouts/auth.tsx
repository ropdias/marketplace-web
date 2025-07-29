import { Outlet } from 'react-router'

import { useGlobalAxiosInterceptor } from '@/hooks/useGlobalAxiosInterceptor'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

export function AuthLayout() {
  useGlobalAxiosInterceptor()

  return (
    <div className="flex min-h-screen antialiased">
      <div className="flex h-full w-[47.1875rem] shrink-0 flex-col justify-between gap-4">
        <div className="flex gap-5 px-10 pt-10">
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-[4.3125rem] w-[5.625rem]"
          />
          <div className="flex flex-col justify-center gap-1">
            <span
              className={cn(getTailwindClass('font-title-md'), 'text-gray-500')}
            >
              Marketplace
            </span>
            <span
              className={cn(getTailwindClass('font-body-md'), 'text-gray-400')}
            >
              Painel do Vendedor
            </span>
          </div>
        </div>
        <img
          src="/background.png"
          alt="Background"
          className="object-contain"
        />
      </div>
      <div className="min-h-screen min-w-[38.1875rem] grow p-6">
        <Outlet />
      </div>
    </div>
  )
}
