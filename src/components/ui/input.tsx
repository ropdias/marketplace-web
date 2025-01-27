import * as React from 'react'

import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

interface InputProps extends React.ComponentProps<'input'> {
  iconBefore?: React.ElementType
  iconAfter?: React.ElementType
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, iconBefore: IconBefore, iconAfter: IconAfter, ...props },
    ref,
  ) => {
    return (
      <div className="group flex w-full items-center gap-2 border-b border-gray-100 focus-within:border-gray-400">
        {IconBefore && (
          <IconBefore
            size={24}
            className="text-gray-200 group-focus-within:text-red-500"
          />
        )}
        <input
          type={type}
          className={cn(
            'flex h-12 w-full bg-transparent px-0.5 py-3.5 outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-200 disabled:cursor-not-allowed disabled:opacity-50',
            getTailwindClass('font-body-md'),
            className,
          )}
          ref={ref}
          {...props}
        />
        {IconAfter && <IconAfter size={24} className="text-gray-300" />}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
