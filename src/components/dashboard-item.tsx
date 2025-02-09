import { HugeiconsProps } from 'hugeicons-react'
import { FC, RefAttributes } from 'react'

import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

interface DashboardItemProps {
  Icon: FC<Omit<HugeiconsProps, 'ref'> & RefAttributes<SVGSVGElement>>
  iconColor?: string
  count?: number
  label?: string
}

export function DashboardItem({
  Icon,
  iconColor,
  count,
  label,
}: DashboardItemProps) {
  return (
    <div className="flex items-center justify-center gap-4 rounded-[20px] bg-white pl-3 pr-7">
      <div className="flex h-[5.375rem] w-[5rem] items-center justify-center rounded-[12px] bg-blue-light">
        <Icon size={40} className={iconColor} />
      </div>
      <div className="flex-1">
        <p className={cn('text-gray-400', getTailwindClass('font-title-lg'))}>
          {count}
        </p>
        <p className={cn('text-gray-300', getTailwindClass('font-body-xs'))}>
          {label}
        </p>
      </div>
    </div>
  )
}
