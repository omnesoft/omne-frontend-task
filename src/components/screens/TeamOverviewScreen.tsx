import { Link } from '@tanstack/react-router'
import { AlertCircle, Clock, FileText, TrendingUp } from 'lucide-react'
import { useTeamSummary } from '../../api/hooks/use-team-summary'
import { DEFAULT_FEED_SEARCH } from '../../lib/feed-search'
import { formatRelativeTime } from '../../lib/format-relative-time'
import type { TeamSummary } from '../../types/team'
import { QueryState } from '../feedback/QueryState'
import { EmptyState } from '../layout/EmptyState'
import { PageHeader } from '../layout/PageHeader'
import { StatusChip } from '../status/StatusChip'
import { MetricCard } from '../team/MetricCard'
import { Button } from '../ui/Button'

const metrics = [
  {
    label: 'Total Updates',
    field: 'totalUpdatesThisWeek' as const,
    subLabel: 'this week',
    icon: FileText,
    tone: 'primary' as const,
  },
  {
    label: 'On Track',
    field: 'onTrackCount' as const,
    subLabel: 'projects',
    icon: TrendingUp,
    tone: 'success' as const,
  },
  {
    label: 'Blocked',
    field: 'blockedCount' as const,
    subLabel: 'projects',
    icon: AlertCircle,
    tone: 'danger' as const,
  },
  {
    label: 'Needs Review',
    field: 'needsReviewCount' as const,
    subLabel: 'projects',
    icon: Clock,
    tone: 'warning' as const,
  },
]

function MetricsSkeleton() {
  return (
    <div className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-4" aria-hidden>
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="h-28 animate-pulse rounded-lg bg-surface-raised" />
      ))}
    </div>
  )
}

function TableSkeleton() {
  return <div className="h-64 animate-pulse rounded-lg bg-surface-raised" aria-hidden />
}

export function TeamOverviewScreen() {
  const summaryQuery = useTeamSummary()

  return (
    <div className="h-full overflow-auto">
      <div className="px-4 py-6 md:px-8">
        <PageHeader title="Team Overview" description="Track team progress at a glance" />

        <QueryState
          isPending={summaryQuery.isPending}
          isError={summaryQuery.isError}
          error={summaryQuery.error}
          refetch={() => void summaryQuery.refetch()}
          loadingFallback={
            <>
              <MetricsSkeleton />
              <TableSkeleton />
            </>
          }
        >
          {summaryQuery.data ? <TeamOverviewContent summary={summaryQuery.data} /> : null}
        </QueryState>
      </div>
    </div>
  )
}

function isTeamSummaryEmpty(summary: TeamSummary): boolean {
  return (
    summary.totalUpdatesThisWeek === 0 &&
    summary.members.every((member) => member.lastUpdate == null)
  )
}

function TeamOverviewContent({ summary }: { summary: TeamSummary }) {
  if (isTeamSummaryEmpty(summary)) {
    return (
      <EmptyState
        icon={<FileText className="size-16 text-icon-muted" aria-hidden />}
        title="No updates yet"
        description="Your team hasn't posted any status updates yet. Be the first to share your progress!"
        action={
          <Link to="/create">
            <Button type="button" className="px-6 py-2">
              Create First Update
            </Button>
          </Link>
        }
      />
    )
  }

  return (
    <>
      <div className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={summary[metric.field]}
            subLabel={metric.subLabel}
            icon={metric.icon}
            tone={metric.tone}
          />
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface-raised">
                <th className="px-6 py-3.5 text-left text-sm font-medium text-foreground-muted">
                  Name
                </th>
                <th className="px-6 py-3.5 text-left text-sm font-medium text-foreground-muted">
                  Team
                </th>
                <th className="px-6 py-3.5 text-left text-sm font-medium text-foreground-muted">
                  Last Update
                </th>
                <th className="px-6 py-3.5 text-left text-sm font-medium text-foreground-muted">
                  Status
                </th>
                <th className="px-6 py-3.5 text-left text-sm font-medium text-foreground-muted">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {summary.members.map((member, index) => (
                <tr
                  key={member.id}
                  className={
                    index !== summary.members.length - 1
                      ? 'border-b border-border transition-colors hover:bg-surface-raised'
                      : 'transition-colors hover:bg-surface-raised'
                  }
                >
                  <td className="px-6 py-4">
                    <span className="font-medium text-foreground">{member.name}</span>
                  </td>
                  <td className="px-6 py-4 text-foreground-muted">{member.teamName}</td>
                  <td className="px-6 py-4 text-sm text-foreground-muted">
                    {member.lastUpdate ? formatRelativeTime(member.lastUpdate) : 'No updates'}
                  </td>
                  <td className="px-6 py-4">
                    {member.lastStatus ? (
                      <StatusChip status={member.lastStatus} />
                    ) : (
                      <span className="text-sm text-foreground-subtle">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to="/"
                      search={DEFAULT_FEED_SEARCH}
                      className="text-sm text-primary-600 transition-colors hover:text-primary-700"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        <Link
          to="/create"
          className="text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
        >
          Create status update
        </Link>
      </div>
    </>
  )
}
