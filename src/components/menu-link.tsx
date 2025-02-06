import { Link, LinkProps, useLocation } from 'react-router'

import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

export type MenuLinkProps = LinkProps

export function MenuLink(props: MenuLinkProps) {
  const { pathname } = useLocation()
  const isActive = pathname === props.to

  return (
    <Link
      data-current={isActive}
      className={cn(
        'flex h-10 w-[140px] items-center justify-center gap-2 rounded-[10px] px-4 text-gray-300 hover:text-orange-base',
        isActive && 'bg-shape text-orange-base',
        isActive
          ? getTailwindClass('font-action-sm')
          : getTailwindClass('font-body-sm'),
      )}
      {...props}
    />
  )
}
