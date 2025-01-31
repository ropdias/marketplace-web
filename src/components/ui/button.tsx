import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-between whitespace-nowrap rounded-[10px] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        solid: 'bg-orange-base text-white hover:bg-orange-dark',
        outline:
          'border border-orange-base text-orange-base bg-transparent hover:border-orange-dark hover:text-orange-dark hover:bg-background',
      },
      size: {
        medium: cn(
          'h-14 px-5 gap-3 [&_svg]:size-6',
          getTailwindClass('font-action-md'),
        ),
        small: cn(
          'h-10 px-4 gap-2 [&_svg]:size-5',
          getTailwindClass('font-action-sm'),
        ),
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'medium',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
