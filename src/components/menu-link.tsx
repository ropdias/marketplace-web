import { NavLink, NavLinkProps } from 'react-router'

import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

export type MenuLinkProps = NavLinkProps

export function MenuLink(props: MenuLinkProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          'flex h-10 items-center justify-center gap-2 rounded-[10px] px-4 text-gray-300',
          'hover:text-orange-base',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-base focus-visible:ring-offset-2',
          isActive && 'bg-shape text-orange-base',
          isActive
            ? getTailwindClass('font-action-sm')
            : getTailwindClass('font-body-sm'),
        )
      }
      {...props}
    />
  )
}
