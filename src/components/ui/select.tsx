import * as SelectPrimitive from '@radix-ui/react-select'
import {
  AlertCircleIcon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  Cancel01Icon,
  Tick02Icon,
} from 'hugeicons-react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import * as React from 'react'

import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  labelText?: string
  iconLeft?: React.ElementType
  onClear?: () => void
  selectedValue: string
  errorMessage?: string
}

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(
  (
    {
      className,
      children,
      labelText,
      iconLeft: IconLeft,
      onClear,
      selectedValue,
      errorMessage,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="relative">
        <SelectPrimitive.Trigger
          ref={ref}
          className={cn(
            'group flex w-full flex-col items-start bg-transparent outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-orange-base focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
            className,
          )}
          {...props}
        >
          {labelText && (
            <div
              className={cn(
                'flex w-full items-start text-gray-300 group-focus-visible:text-orange-base group-data-[state=open]:text-orange-base',
                getTailwindClass('font-label-md'),
              )}
            >
              {labelText}
            </div>
          )}

          <div className="relative flex h-12 w-full items-center gap-2 border-b border-gray-100 px-0.5 py-3.5 group-data-[state=open]:border-gray-400">
            {IconLeft && (
              <IconLeft
                size={24}
                className="h-6 w-6 shrink-0 text-orange-base group-data-[placeholder]:text-gray-200 group-data-[state=open]:text-orange-base"
              />
            )}
            <div
              className={cn(
                'flex-1 text-left text-gray-400 group-data-[placeholder]:text-gray-200',
                getTailwindClass('font-body-md'),
              )}
            >
              {children}
            </div>
            <SelectPrimitive.Icon asChild>
              <div className="shrink-0">
                <ArrowDown01Icon className="h-6 w-6 text-gray-300 group-data-[state=open]:hidden" />
                <ArrowUp01Icon className="hidden h-6 w-6 text-gray-300 group-data-[state=open]:block" />
              </div>
            </SelectPrimitive.Icon>
          </div>
          {errorMessage && (
            <div className="flex h-7 items-center gap-1 py-1.5">
              <AlertCircleIcon
                size={16}
                className="flex-shrink-0 text-danger"
              />
              <span
                className={cn('text-danger', getTailwindClass('font-body-xs'))}
              >
                {errorMessage}
              </span>
            </div>
          )}
        </SelectPrimitive.Trigger>
        {selectedValue && (
          <button
            onClick={() => {
              if (onClear) onClear()
            }}
            className="absolute bottom-3 right-[2.125rem] z-40 block h-6 w-6 rounded-full bg-shape p-1 text-gray-300 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-orange-base focus-visible:ring-offset-2"
          >
            <Cancel01Icon className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  },
)
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-[8px] border border-shape bg-white text-popover-foreground shadow-[0px_2px_24px_theme(colors.shape)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'py-2',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'flex w-full cursor-pointer select-none items-center justify-between gap-2 p-4 text-gray-300 outline-none focus:text-orange-dark data-[disabled]:pointer-events-none data-[state=checked]:text-orange-base data-[disabled]:opacity-50',
      getTailwindClass('font-body-sm'),
      className,
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <span className="flex h-6 w-6 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Tick02Icon className="h-6 w-6" />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
