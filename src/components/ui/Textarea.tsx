import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error = false, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full resize-none rounded-lg border bg-surface px-4 py-2 text-foreground transition-colors',
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

Textarea.displayName = 'Textarea'
