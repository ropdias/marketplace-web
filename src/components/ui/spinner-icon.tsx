import { Loading02Icon } from 'hugeicons-react'

import { cn } from '@/lib/utils'

interface SpinnerIconProps {
  size?: number
  className?: string
}

export function SpinnerIcon({ size = 40, className }: SpinnerIconProps) {
  return (
    <Loading02Icon
      size={size}
      className={cn(`animate-spin text-orange-base`, className)}
    />
  )
}
