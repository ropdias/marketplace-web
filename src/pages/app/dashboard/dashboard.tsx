import { Helmet } from 'react-helmet-async'

import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

import { DashboardChart } from './dashboard-chart'
import { DashboardProductsAvailable } from './dashboard-products-available'
import { DashboardProductsSold } from './dashboard-products-sold'
import { DashboardViewsBySeller } from './dashboard-views-by-seller'

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
        <DashboardProductsSold />
        <DashboardProductsAvailable />
        <DashboardViewsBySeller />
        <DashboardChart />
      </div>
    </>
  )
}
