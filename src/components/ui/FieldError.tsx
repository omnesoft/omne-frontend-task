import { AlertCircle } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface FieldErrorProps {
  message: string
  className?: string
}

export function FieldError({ message, className }: FieldErrorProps) {
  return (
    <div className={cn('mt-2 flex items-center gap-2 text-sm text-danger-600', className)}>
      <AlertCircle className="size-4 shrink-0" aria-hidden />
      <span>{message}</span>
    </div>
  )
}
