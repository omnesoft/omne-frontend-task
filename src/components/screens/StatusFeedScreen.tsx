import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { FEED_PAGE_SIZE, useStatuses } from '../../api/hooks/use-statuses'
import { useTeams } from '../../api/hooks/use-teams'
import type { StatusListFilters } from '../../api/query-keys'
import type { FeedSearch } from '../../lib/feed-search'
import { Route } from '../../routes/_app/index'
import { FeedPagination } from '../feed/FeedPagination'
import { FeedToolbar } from '../feed/FeedToolbar'
import { StatusUpdateCard } from '../feed/StatusUpdateCard'
import { QueryState } from '../feedback/QueryState'
import { Button } from '../ui/Button'

function FeedListSkeleton() {
  return (
    <div className="space-y-4" aria-hidden>
      {Array.from({ length: 3 }, (_, i) => (
        <div key={i} className="h-32 animate-pulse rounded-lg bg-surface-raised" />
      ))}
    </div>
  )
}

export function StatusFeedScreen() {
  const { page, status, team, search } = Route.useSearch()
  const navigate = Route.useNavigate()

  const filters: StatusListFilters = {
    page,
    limit: FEED_PAGE_SIZE,
    status,
    team,
    search,
  }

  const statusesQuery = useStatuses(filters)
  const teamsQuery = useTeams()

  const setSearch = (next: Partial<FeedSearch>) => {
    navigate({
      search: (prev) => ({
        page: next.page ?? prev.page,
        status: next.status ?? prev.status,
        team: next.team ?? prev.team,
        search: next.search ?? prev.search,
      }),
    })
  }

  const handleSearchChange = (value: string) => {
    setSearch({ search: value, page: 1 })
  }

  const handleStatusFilterChange = (value: string) => {
    setSearch({ status: value, page: 1 })
  }

  const handleTeamFilterChange = (value: string) => {
    setSearch({ team: value, page: 1 })
  }

  const handlePageChange = (nextPage: number) => {
    setSearch({ page: nextPage })
  }

  const pagination = statusesQuery.data?.pagination
  const updates = statusesQuery.data?.data ?? []

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border bg-surface px-4 py-6 md:px-8">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold text-foreground">Status Feed</h2>
          <Link to="/create">
            <Button type="button" className="px-4 py-2">
              <Plus className="size-4" aria-hidden />
              New Update
            </Button>
          </Link>
        </div>

        <QueryState
          isPending={teamsQuery.isPending}
          isError={teamsQuery.isError}
          error={teamsQuery.error}
          refetch={() => void teamsQuery.refetch()}
          loadingFallback={
            <div className="h-10 animate-pulse rounded-lg bg-surface-raised" aria-hidden />
          }
        >
          <FeedToolbar
            search={search}
            statusFilter={status}
            teamFilter={team}
            teams={teamsQuery.data ?? []}
            onSearchChange={handleSearchChange}
            onStatusFilterChange={handleStatusFilterChange}
            onTeamFilterChange={handleTeamFilterChange}
          />
        </QueryState>
      </div>

      <div className="flex-1 overflow-auto px-4 py-6 md:px-8">
        <div className="mx-auto max-w-4xl">
          <QueryState
            isPending={statusesQuery.isPending}
            isError={statusesQuery.isError}
            error={statusesQuery.error}
            refetch={() => void statusesQuery.refetch()}
            loadingFallback={<FeedListSkeleton />}
          >
            <div className="space-y-4">
              {updates.map((update) => (
                <StatusUpdateCard key={update.id} update={update} />
              ))}
            </div>
          </QueryState>
        </div>
      </div>

      {pagination ? (
        <div className="border-t border-border bg-surface px-4 py-4 md:px-8">
          <FeedPagination
            className="mx-auto max-w-4xl"
            page={pagination.page}
            totalPages={pagination.totalPages}
            totalItems={pagination.total}
            pageSize={pagination.limit}
            onPageChange={handlePageChange}
          />
        </div>
      ) : null}
    </div>
  )
}
