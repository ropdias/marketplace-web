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

export const description = 'A line chart'

const chartData = [
  { date: '2025-06-26T15:30:00.000Z', visitors: 186 },
  { date: '2025-06-27T15:30:00.000Z', visitors: 305 },
  { date: '2025-06-28T15:30:00.000Z', visitors: 237 },
  { date: '2025-06-29T15:30:00.000Z', visitors: 73 },
  { date: '2025-06-30T15:30:00.000Z', visitors: 209 },
  { date: '2025-07-01T15:30:00.000Z', visitors: 500 },
  { date: '2025-07-02T15:30:00.000Z', visitors: 382 },
  { date: '2025-07-03T15:30:00.000Z', visitors: 789 },
  { date: '2025-07-04T15:30:00.000Z', visitors: 1022 },
  { date: '2025-07-05T15:30:00.000Z', visitors: 850 },
  { date: '2025-07-06T15:30:00.000Z', visitors: 1321 },
  { date: '2025-07-07T15:30:00.000Z', visitors: 1774 },
  { date: '2025-07-08T15:30:00.000Z', visitors: 1541 },
  { date: '2025-07-09T15:30:00.000Z', visitors: 1892 },
]

const chartConfig = {
  visitors: {
    label: 'visitantes',
    icon: UserMultipleIcon,
    color: 'hsl(var(--blue-base))',
  },
} satisfies ChartConfig

export function DashboardChart() {
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
          dataKey="visitors"
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
          dataKey="visitors"
          type="natural"
          stroke="var(--color-visitors)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  )
}
