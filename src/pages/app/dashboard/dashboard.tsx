import { SaleTag02Icon, Store04Icon, UserMultipleIcon } from 'hugeicons-react'
import { Helmet } from 'react-helmet-async'

import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

import { DashboardChart } from './dashboard-chart'
import { DashboardItem } from './dashboard-item'

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-2">
        <div className="h-6"></div>
        <p className={cn('text-gray-500', getTailwindClass('font-title-md'))}>
          Últimos 30 dias
        </p>
        <p className={cn('text-gray-300', getTailwindClass('font-body-sm'))}>
          Confira as estatísticas da sua loja no último mês
        </p>
      </div>
      <div className="grid h-[22.5rem] grid-cols-[239px_1fr] grid-rows-3 gap-x-6 gap-y-[0.9375rem]">
        <DashboardItem
          Icon={SaleTag02Icon}
          iconColor="text-blue-dark"
          count={24}
          label="Produtos vendidos"
        />
        <DashboardItem
          Icon={Store04Icon}
          iconColor="text-blue-dark"
          count={56}
          label="Produtos anunciados"
        />
        <DashboardItem
          Icon={UserMultipleIcon}
          iconColor="text-gray-300"
          count={1.238}
          label="Pessoas visitantes"
        />
        <div className="col-start-2 col-end-3 row-start-1 row-end-4 flex flex-col gap-7 rounded-[20px] bg-white px-6 pb-5 pt-6">
          <div className="flex items-center justify-between">
            <p
              className={cn('text-gray-500', getTailwindClass('font-title-sm'))}
            >
              Visitantes
            </p>
            <p
              className={cn('text-gray-500', getTailwindClass('font-title-sm'))}
            >
              Data Picker aqui
            </p>
          </div>
          <DashboardChart />
        </div>
      </div>
    </>
  )
}
