import { Link, LinkProps } from 'react-router'

import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

interface FormLinkProps extends LinkProps {
  iconLeft?: React.ElementType
  iconRight?: React.ElementType
}

export function FormLink({
  iconLeft: IconLeft,
  iconRight: IconRight,
  children,
  ...props
}: FormLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        'flex items-center gap-2 whitespace-nowrap p-0.5 text-orange-base transition-colors hover:text-orange-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-base focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
        getTailwindClass('font-action-sm'),
      )}
    >
      {IconLeft && <IconLeft size={20} className={'flex-shrink-0'} />}
      {children}
      {IconRight && <IconRight size={20} className={'flex-shrink-0'} />}
    </Link>
  )
}
