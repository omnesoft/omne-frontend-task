import { Filter, Search } from 'lucide-react'
import { cn } from '../../lib/cn'
import { STATUS_LABELS, STATUS_SLUGS } from '../../types/status'
import type { Team } from '../../types/team'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'

export interface FeedToolbarProps {
  search: string
  statusFilter: string
  teamFilter: string
  teams: Team[]
  onSearchChange: (value: string) => void
  onStatusFilterChange: (value: string) => void
  onTeamFilterChange: (value: string) => void
  className?: string
}

export function FeedToolbar({
  search,
  statusFilter,
  teamFilter,
  teams,
  onSearchChange,
  onStatusFilterChange,
  onTeamFilterChange,
  className,
}: FeedToolbarProps) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-icon-muted"
          aria-hidden
        />
        <Input
          type="search"
          placeholder="Search updates..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-surface-raised pl-10"
        />
      </div>

      <div className="relative">
        <Select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="min-w-[10rem] bg-surface-raised pr-10"
        >
          <option value="all">All Statuses</option>
          {STATUS_SLUGS.map((slug) => (
            <option key={slug} value={slug}>
              {STATUS_LABELS[slug]}
            </option>
          ))}
        </Select>
        <Filter
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-icon-muted"
          aria-hidden
        />
      </div>

      <div className="relative">
        <Select
          value={teamFilter}
          onChange={(e) => onTeamFilterChange(e.target.value)}
          className="min-w-[10rem] bg-surface-raised pr-10"
        >
          <option value="all">All Teams</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </Select>
        <Filter
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-icon-muted"
          aria-hidden
        />
      </div>
    </div>
  )
}
