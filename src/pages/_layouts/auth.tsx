import { Outlet } from 'react-router'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen antialiased">
      <div className="flex h-full w-[755px] min-w-[347px] flex-1 flex-col gap-[51px]">
        <div className="flex gap-5 px-10 pt-10">
          <img src="/logo.svg" alt="Logo" className="h-[69px] w-[90px]" />
          <div className="flex flex-col justify-center gap-1">
            <span className="font-title-md">Marketplace</span>
            <span className="font-body-md">Painel do Vendedor</span>
          </div>
        </div>
        <img
          src="/background.png"
          alt="Background"
          className="max-h-[496px] max-w-[755px] object-contain"
        />
      </div>
      <div className="min-w-[611px] flex-shrink-0">
        <Outlet />
      </div>
    </div>
  )
}
