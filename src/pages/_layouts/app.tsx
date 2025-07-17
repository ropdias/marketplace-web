import { Outlet } from 'react-router'

import { Header } from '@/components/header'

export function AppLayout() {
  return (
    <div className="flex min-h-screen min-w-[66.875rem] flex-col gap-16 px-5 antialiased">
      <Header />
      <div className="m-auto flex w-full max-w-[64.375rem] flex-1 flex-col gap-10 pb-5">
        <Outlet />
      </div>
    </div>
  )
}
