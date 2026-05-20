import { Link } from '@tanstack/react-router'
import { AlertCircle, Clock, FileText, TrendingUp } from 'lucide-react'
import { fixtureTeamSummary } from '../../fixtures/team-summary'
import { formatRelativeTime } from '../../lib/format-relative-time'
import { PageHeader } from '../layout/PageHeader'
import { StatusChip } from '../status/StatusChip'
import { MetricCard } from '../team/MetricCard'

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

export function TeamOverviewScreen() {
  const summary = fixtureTeamSummary

  return (
    <div className="h-full overflow-auto">
      <div className="px-8 py-6">
        <PageHeader title="Team Overview" description="Track team progress at a glance" />

        <div className="mb-8 grid grid-cols-4 gap-6">
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
      </div>
    </div>
  )
}
