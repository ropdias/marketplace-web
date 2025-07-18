import { AlertCircleIcon } from 'hugeicons-react'
import * as React from 'react'

import { getTailwindClass } from '@/lib/tailwindUtils'
import { cn } from '@/lib/utils'

import { Label } from './label'

interface TextAreaProps extends React.ComponentProps<'textarea'> {
  labelText?: string
  errorMessage?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, labelText, errorMessage, ...props }, ref) => {
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
        <textarea
          className={cn(
            'flex h-[6.625rem] w-full resize-none items-start border-b border-gray-100 bg-transparent px-0.5 py-3 text-gray-400 caret-orange-base outline-none placeholder:text-gray-200 disabled:cursor-not-allowed disabled:opacity-50 group-focus-within:border-gray-400',
            getTailwindClass('font-body-md'),
            className,
          )}
          ref={ref}
          {...props}
        />
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
Textarea.displayName = 'Textarea'

export { Textarea }
