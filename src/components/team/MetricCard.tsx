import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'

export type MetricTone = 'primary' | 'success' | 'danger' | 'warning'

const toneStyles: Record<MetricTone, { icon: string; badge: string }> = {
  primary: {
    icon: 'text-primary-600',
    badge: 'bg-primary-50',
  },
  success: {
    icon: 'text-success-600',
    badge: 'bg-success-50',
  },
  danger: {
    icon: 'text-danger-600',
    badge: 'bg-danger-50',
  },
  warning: {
    icon: 'text-warning-600',
    badge: 'bg-warning-50',
  },
}

export interface MetricCardProps {
  label: string
  value: number
  subLabel: string
  icon: LucideIcon
  tone: MetricTone
}

export function MetricCard({ label, value, subLabel, icon: Icon, tone }: MetricCardProps) {
  const styles = toneStyles[tone]

  return (
    <div className="rounded-lg border border-border bg-surface p-6 transition-all duration-200 hover:shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-foreground-muted">{label}</span>
        <div className={cn('rounded-lg p-2', styles.badge)}>
          <Icon className={cn('size-5', styles.icon)} aria-hidden />
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-semibold text-foreground">{value}</span>
        <span className="text-sm text-foreground-subtle">{subLabel}</span>
      </div>
    </div>
  )
}
