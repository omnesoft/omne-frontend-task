import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full rounded-lg border bg-surface px-4 py-2 text-foreground transition-colors',
          'placeholder:text-foreground-subtle',
          'focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500',
          error ? 'border-danger-300 bg-danger-50' : 'border-border hover:border-neutral-300',
          className,
        )}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'
