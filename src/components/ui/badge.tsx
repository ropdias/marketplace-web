import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  cn(
    getTailwindClass('font-label-sm'),
    'inline-flex items-center justify-center rounded-full text-white h-auto py-1 px-2 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  ),
  {
    variants: {
      variant: {
        default: 'bg-gray-400',
        available: 'bg-blue-dark',
        sold: 'bg-success',
        cancelled: 'bg-gray-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type BadgeColorVariants = NonNullable<
  VariantProps<typeof badgeVariants>['variant']
>

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
