import { useQuery } from '@tanstack/react-query'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Calendar04Icon,
  SaleTag02Icon,
  Store04Icon,
  UserMultipleIcon,
} from 'hugeicons-react'
import { Helmet } from 'react-helmet-async'

import { getProductsAvailableIn30Days } from '@/api/metrics/get-products-available-in-30-days'
import { getProductsSoldIn30Days } from '@/api/metrics/get-products-sold-in-30-days'
import { getViewsBySellerIn30Days } from '@/api/metrics/get-views-by-seller-in-30-days'
import { getViewsPerDayBySellerIn30Days } from '@/api/metrics/get-views-per-day-by-seller-in-30-days'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

import { ChartPoint, DashboardChart } from './dashboard-chart'
import { DashboardItem } from './dashboard-item'

export function Dashboard() {
  const { data: productsSoldIn30Days } = useQuery({
    queryKey: ['products-sold-in-30-days'],
    queryFn: getProductsSoldIn30Days,
  })

  const { data: productsAvailableIn30Days } = useQuery({
    queryKey: ['products-available-in-30-days'],
    queryFn: getProductsAvailableIn30Days,
  })

  const { data: viewsBySellerIn30Days } = useQuery({
    queryKey: ['views-by-seller-in-30-days'],
    queryFn: getViewsBySellerIn30Days,
  })

  const { data: viewsPerDayBySellerIn30Days } = useQuery({
    queryKey: ['views-per-day-by-seller-in-30-days'],
    queryFn: getViewsPerDayBySellerIn30Days,
  })

  let chartData: ChartPoint[] = []
  let startDate = new Date()
  let endDate = new Date()

  const views = viewsPerDayBySellerIn30Days?.viewsPerDay ?? []
  chartData = views

  if (views?.[0]?.date) {
    startDate = parseISO(views[0].date)
  }

  if (views?.[views.length - 1]?.date) {
    endDate = parseISO(views[views.length - 1].date)
  }

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
          count={productsSoldIn30Days?.amount ?? 0}
          label="Produtos vendidos"
        />
        <DashboardItem
          Icon={Store04Icon}
          iconColor="text-blue-dark"
          count={productsAvailableIn30Days?.amount ?? 0}
          label="Produtos anunciados"
        />
        <DashboardItem
          Icon={UserMultipleIcon}
          iconColor="text-gray-300"
          count={viewsBySellerIn30Days?.amount ?? 0}
          label="Pessoas visitantes"
        />
        <div className="col-start-2 col-end-3 row-start-1 row-end-4 flex flex-col gap-7 rounded-[20px] bg-white px-6 pb-5 pt-6">
          <div className="flex items-center justify-between">
            <p
              className={cn('text-gray-500', getTailwindClass('font-title-sm'))}
            >
              Visitantes
            </p>
            <div className="flex items-center gap-2">
              <Calendar04Icon size={16} className="text-blue-dark" />
              <p
                className={cn(
                  'text-gray-300',
                  getTailwindClass('font-label-sm'),
                )}
              >
                {views?.length
                  ? `${format(startDate, "dd 'de' MMMM", { locale: ptBR })} - ${format(endDate, "dd 'de' MMMM", { locale: ptBR })}`
                  : 'Sem dados para o período'}
              </p>
            </div>
          </div>
          <DashboardChart chartData={chartData} />
        </div>
      </div>
    </>
  )
}
