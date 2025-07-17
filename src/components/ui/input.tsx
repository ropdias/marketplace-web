import { AlertCircleIcon } from 'hugeicons-react'
import * as React from 'react'

import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

import { Label } from './label'

interface InputProps extends React.ComponentProps<'input'> {
  labelText?: string
  iconLeft?: React.ElementType
  iconRight?: React.ElementType
  onClickIconRight?: () => void
  isFilled: boolean
  errorMessage?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      iconLeft: IconLeft,
      iconRight: IconRight,
      labelText,
      isFilled = false,
      errorMessage,
      onClickIconRight,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="group flex flex-col">
        {labelText && (
          <Label
            htmlFor={props.id}
            className={cn(
              getTailwindClass('font-label-md'),
              'text-gray-300 group-focus-within:text-orange-base',
            )}
          >
            {labelText}
          </Label>
        )}
        <div className="flex h-auto w-full items-center gap-2 border-b border-gray-100 px-0.5 py-3 group-focus-within:border-gray-400">
          {IconLeft && (
            <IconLeft
              size={24}
              className={cn(
                'flex-shrink-0',
                isFilled ? 'text-orange-base' : 'text-gray-200',
                errorMessage
                  ? 'text-danger'
                  : 'group-focus-within:text-orange-base',
              )}
            />
          )}
          <input
            type={type}
            className={cn(
              'flex w-full bg-transparent text-gray-400 caret-orange-base outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-200 disabled:cursor-not-allowed disabled:opacity-50',
              getTailwindClass('font-body-md'),
              className,
            )}
            ref={ref}
            {...props}
          />
          {IconRight && (
            <button
              onClick={onClickIconRight}
              type="button"
              aria-label="Mostrar ou ocultar senha"
            >
              <IconRight
                size={24}
                className="pointer-events-none flex-shrink-0 text-gray-300"
              />
            </button>
          )}
        </div>
        {errorMessage && (
          <div className="flex h-7 items-center gap-1 py-1.5">
            <AlertCircleIcon size={16} className="flex-shrink-0 text-danger" />
            <span
              className={cn('text-danger', getTailwindClass('font-body-xs'))}
            >
              {errorMessage}
            </span>
          </div>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
