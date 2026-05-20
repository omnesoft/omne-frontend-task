import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface FeedPaginationProps {
  page: number
  totalPages: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
  className?: string
}

export function FeedPagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  className,
}: FeedPaginationProps) {
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, totalItems)

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <p className="text-sm text-foreground-muted">
        Showing {start} to {end} of {totalItems} updates
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="rounded-lg border border-border p-2 transition-colors hover:bg-surface-raised disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Previous page"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              className={cn(
                'min-w-10 rounded-lg px-3 py-2 text-sm transition-colors',
                page === pageNumber
                  ? 'bg-primary-600 text-white'
                  : 'text-foreground hover:bg-surface-raised',
              )}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages || totalPages === 0}
          className="rounded-lg border border-border p-2 transition-colors hover:bg-surface-raised disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Next page"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  )
}
