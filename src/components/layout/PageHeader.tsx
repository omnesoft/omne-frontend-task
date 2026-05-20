import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export interface PageHeaderProps {
  title: string
  description?: string
  children?: ReactNode
  className?: string
}

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-8', className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
          {description ? <p className="mt-2 text-foreground-muted">{description}</p> : null}
        </div>
        {children ? <div className="shrink-0">{children}</div> : null}
      </div>
    </div>
  )
}
