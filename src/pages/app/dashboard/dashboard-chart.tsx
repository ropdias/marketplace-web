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
  { day: '1', visitors: 186 },
  { day: '2', visitors: 305 },
  { day: '3', visitors: 237 },
  { day: '4', visitors: 73 },
  { day: '5', visitors: 209 },
  { day: '6', visitors: 214 },
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
          dataKey="day"
          tickLine={false}
          axisLine={false}
          height={40}
          tick={({ x, y, payload }) => {
            return (
              <Text
                x={x}
                y={y + 32}
                width={24}
                textAnchor="middle"
                className={cn(getTailwindClass('font-body-xs'))}
                verticalAnchor="middle"
              >
                {payload.value}
              </Text>
            )
          }}
        />
        <YAxis
          dataKey="visitors"
          width={28}
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
              labelFormatter={(label) => `${label} DE JULHO`}
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
