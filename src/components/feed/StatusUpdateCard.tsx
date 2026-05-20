import { Link } from '@tanstack/react-router'
import { formatRelativeTime } from '../../lib/format-relative-time'
import type { StatusUpdate } from '../../types/status-update'
import { StatusChip } from '../status/StatusChip'

export interface StatusUpdateCardProps {
  update: StatusUpdate
}

export function StatusUpdateCard({ update }: StatusUpdateCardProps) {
  return (
    <article className="rounded-lg border border-border bg-surface p-6 transition-all duration-200 hover:shadow-md">
      <div className="flex items-start gap-4">
        <img
          src={update.authorAvatar}
          alt={update.authorName}
          className="size-10 shrink-0 rounded-full"
        />
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-3">
            <span className="font-medium text-foreground">{update.authorName}</span>
            <span className="text-foreground-muted">·</span>
            <span className="text-sm text-foreground-muted">{update.teamName}</span>
            <span className="text-sm text-foreground-subtle">
              {formatRelativeTime(update.createdAt)}
            </span>
            <Link
              to="/create/$statusId"
              params={{ statusId: update.id }}
              className="ml-auto text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
            >
              Edit
            </Link>
          </div>
          <div className="mb-3">
            <StatusChip status={update.status} />
          </div>
          <p className="leading-relaxed text-foreground-muted">{update.body}</p>
          {update.project ? (
            <p className="mt-3 text-sm text-foreground-subtle">Project: {update.project}</p>
          ) : null}
        </div>
      </div>
    </article>
  )
}
