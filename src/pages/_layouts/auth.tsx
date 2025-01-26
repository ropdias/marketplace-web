import { Outlet } from 'react-router'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen antialiased">
      <div className="flex h-full w-[755px] min-w-0 flex-1 flex-col">
        <div>Logo do Marketplace</div>
        <div>Imagem do Marketplace</div>
      </div>
      <div className="min-w-[611px] flex-shrink-0">
        <Outlet />
      </div>
    </div>
  )
}
