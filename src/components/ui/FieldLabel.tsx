import type { LabelHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  optionalHint?: ReactNode
}

export function FieldLabel({
  className,
  children,
  required = false,
  optionalHint,
  ...props
}: FieldLabelProps) {
  return (
    <label className={cn('mb-2 block text-sm font-medium text-foreground', className)} {...props}>
      {children}
      {required ? <span className="text-danger-500"> *</span> : null}
      {optionalHint ? (
        <span className="font-normal text-foreground-subtle"> {optionalHint}</span>
      ) : null}
    </label>
  )
}
