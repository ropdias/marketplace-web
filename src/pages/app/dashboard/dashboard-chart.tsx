import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { UserMultipleIcon } from 'hugeicons-react'
import { CartesianGrid, Line, LineChart, Text, XAxis, YAxis } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

const chartConfig = {
  amount: {
    label: 'visitantes',
    icon: UserMultipleIcon,
    color: 'hsl(var(--blue-base))',
  },
} satisfies ChartConfig

export interface ChartPoint {
  date: string
  amount: number
}

interface DashboardChartProps {
  chartData: ChartPoint[]
}

export function DashboardChart({ chartData }: DashboardChartProps) {
  return (
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
  )
}
