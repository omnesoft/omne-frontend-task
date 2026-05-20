import { tv, type VariantProps } from 'tailwind-variants'
import { cn } from '../../lib/cn'
import { STATUS_LABELS, type StatusSlug } from '../../types/status'

const statusChipVariants = tv({
  base: 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
  variants: {
    status: {
      on_track: 'border-status-on-track-border bg-status-on-track-bg text-status-on-track-text',
      blocked: 'border-status-blocked-border bg-status-blocked-bg text-status-blocked-text',
      needs_review:
        'border-status-needs-review-border bg-status-needs-review-bg text-status-needs-review-text',
      done: 'border-status-done-border bg-status-done-bg text-status-done-text',
    },
  },
  defaultVariants: {
    status: 'on_track',
  },
})

export interface StatusChipProps extends VariantProps<typeof statusChipVariants> {
  status: StatusSlug
  className?: string
}

export function StatusChip({ status, className }: StatusChipProps) {
  return (
    <span className={cn(statusChipVariants({ status }), className)}>{STATUS_LABELS[status]}</span>
  )
}
