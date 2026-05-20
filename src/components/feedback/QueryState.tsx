import { AlertCircle, Loader2 } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '../ui/Button'

export interface QueryStateProps {
  isPending: boolean
  isError: boolean
  error: Error | null
  refetch: () => void
  children: ReactNode
  loadingFallback?: ReactNode
  className?: string
}

export function QueryState({
  isPending,
  isError,
  error,
  refetch,
  children,
  loadingFallback,
  className,
}: QueryStateProps) {
  if (isPending) {
    return (
      <div className={className} role="status" aria-live="polite">
        {loadingFallback ?? (
          <div className="flex items-center justify-center gap-2 py-12 text-foreground-muted">
            <Loader2 className="size-5 animate-spin text-primary-600" aria-hidden />
            <span className="text-sm">Loading…</span>
          </div>
        )}
      </div>
    )
  }

  if (isError) {
    const message = error instanceof Error && error.message ? error.message : 'Something went wrong'
    return (
      <div className={className} role="alert">
        <div className="flex flex-col items-center gap-3 rounded-lg border border-danger-200 bg-danger-50 px-6 py-8 text-center">
          <AlertCircle className="size-8 text-danger-600" aria-hidden />
          <p className="text-sm text-danger-800">{message}</p>
          <Button type="button" variant="secondary" onClick={() => refetch()}>
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
