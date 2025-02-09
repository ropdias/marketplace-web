import { Outlet } from 'react-router'

import { Header } from '@/components/header'

export function AppLayout() {
  return (
    <div className="flex min-h-screen min-w-[66.875rem] flex-col gap-16 antialiased">
      <Header />
      <Outlet />
    </div>
  )
}
