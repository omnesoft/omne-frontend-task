import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error = false, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'w-full cursor-pointer appearance-none rounded-lg border bg-surface px-4 py-2 text-foreground transition-colors',
          'focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500',
          error ? 'border-danger-300 bg-danger-50' : 'border-border hover:border-neutral-300',
          className,
        )}
        {...props}
      >
        {children}
      </select>
    )
  },
)

Select.displayName = 'Select'
