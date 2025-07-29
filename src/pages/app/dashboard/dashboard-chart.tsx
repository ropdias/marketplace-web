import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar04Icon, UserMultipleIcon } from 'hugeicons-react'
import { useEffect } from 'react'
import { CartesianGrid, Line, LineChart, Text, XAxis, YAxis } from 'recharts'
import { toast } from 'sonner'

import { mapGetViewsPerDayBySellerIn30DaysErrorMessage } from '@/api/metrics/get-views-per-day-by-seller-in-30-days'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Skeleton } from '@/components/ui/skeleton'
import { SpinnerIcon } from '@/components/ui/spinner-icon'
import { useViewsPerDayBySellerIn30Days } from '@/hooks/queries/use-views-per-day-by-seller-in-30-days'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

const chartConfig = {
  amount: {
    label: 'visitantes',
    icon: UserMultipleIcon,
    color: 'hsl(var(--blue-base))',
  },
} satisfies ChartConfig

interface ChartPoint {
  date: string
  amount: number
}

export function DashboardChart() {
  const {
    data: viewsPerDayBySellerIn30Days,
    error,
    isError,
    isLoading,
  } = useViewsPerDayBySellerIn30Days()

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

  useEffect(() => {
    if (isError && error) {
      const message = mapGetViewsPerDayBySellerIn30DaysErrorMessage(error)
      toast.error(message)
    }
  }, [isError, error])

  return (
    <div className="col-start-2 col-end-3 row-start-1 row-end-4 flex flex-col gap-7 rounded-[20px] bg-white px-6 pb-5 pt-6">
      <div className="flex items-center justify-between">
        <p className={cn('text-gray-500', getTailwindClass('font-title-sm'))}>
          Visitantes
        </p>
        <div className="flex items-center gap-2">
          <Calendar04Icon size={16} className="text-blue-dark" />
          {isLoading ? (
            <Skeleton className="h-3 w-32" />
          ) : (
            <p
              className={cn('text-gray-300', getTailwindClass('font-label-sm'))}
            >
              {views?.length
                ? `${format(startDate, "dd 'de' MMMM", { locale: ptBR })} - ${format(endDate, "dd 'de' MMMM", { locale: ptBR })}`
                : 'Sem dados para o período'}
            </p>
          )}
        </div>
      </div>
      {isLoading ? (
        <div className="flex min-h-[266px] w-full items-center justify-center">
          <SpinnerIcon size={30} className="text-blue-base" />
        </div>
      ) : (
        <ChartContainer config={chartConfig} className="min-h-[266px] w-full">
          <LineChart accessibilityLayer data={chartData}>
            <CartesianGrid
              vertical={false}
              strokeDasharray="8 12"
              stroke="hsl(var(--gray-200))"
              strokeOpacity={0.2}
            />
            <XAxis
              dataKey="date"
              interval={0}
              tickLine={false}
              axisLine={false}
              height={40}
              tick={({ x, y, payload, index }) => {
                const isLast = index === chartData.length - 1
                const offset = isLast ? -2 : 0

                return (
                  <Text
                    x={x + offset}
                    y={y + 32}
                    width={24}
                    textAnchor="middle"
                    className={cn(getTailwindClass('font-body-xs'))}
                    verticalAnchor="middle"
                  >
                    {format(parseISO(payload.value), 'dd', { locale: ptBR })}
                  </Text>
                )
              }}
            />
            <YAxis
              dataKey="amount"
              width={40}
              axisLine={false}
              tickLine={false}
              tickCount={4}
              tick={({ x, y, payload, index }) => {
                let adjustedY = y
                if (index === 3) {
                  adjustedY = y - 4
                }
                return (
                  <Text
                    x={x - 14}
                    y={adjustedY}
                    width={24}
                    textAnchor="middle"
                    verticalAnchor="middle"
                    className={cn(getTailwindClass('font-body-xs'))}
                  >
                    {payload.value}
                  </Text>
                )
              }}
              allowDecimals={false}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(label) =>
                    format(parseISO(label), "dd 'de' MMMM", { locale: ptBR })
                  }
                  labelClassName={cn(
                    getTailwindClass('font-label-sm'),
                    'text-gray-400',
                  )}
                />
              }
            />
            <Line
              dataKey="amount"
              type="natural"
              stroke="var(--color-amount)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      )}
    </div>
  )
}
