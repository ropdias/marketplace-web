import { Outlet } from 'react-router'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <div>App Header</div>
      <div className="flex flex-1 flex-col gap-10 px-[168px] py-16">
        <Outlet />
      </div>
    </div>
  )
}
