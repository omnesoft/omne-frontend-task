import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { fixtureStatusUpdates } from '../../fixtures/status-updates'
import { fixtureTeams } from '../../fixtures/teams'
import { FeedPagination } from '../feed/FeedPagination'
import { FeedToolbar } from '../feed/FeedToolbar'
import { StatusUpdateCard } from '../feed/StatusUpdateCard'
import { Button } from '../ui/Button'

const ITEMS_PER_PAGE = 6

export function StatusFeedScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [teamFilter, setTeamFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredUpdates = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return fixtureStatusUpdates.filter((update) => {
      if (statusFilter !== 'all' && update.status !== statusFilter) {
        return false
      }
      if (teamFilter !== 'all' && update.teamId !== teamFilter) {
        return false
      }
      if (!query) {
        return true
      }
      const haystack = [update.authorName, update.teamName, update.body, update.project ?? '']
        .join(' ')
        .toLowerCase()
      return haystack.includes(query)
    })
  }, [searchQuery, statusFilter, teamFilter])

  const totalPages = Math.max(1, Math.ceil(filteredUpdates.length / ITEMS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)

  const pageUpdates = filteredUpdates.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE,
  )

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value)
    setCurrentPage(1)
  }

  const handleTeamFilterChange = (value: string) => {
    setTeamFilter(value)
    setCurrentPage(1)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border bg-surface px-8 py-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">Status Feed</h2>
          <Link to="/create">
            <Button type="button" className="px-4 py-2">
              <Plus className="size-4" aria-hidden />
              New Update
            </Button>
          </Link>
        </div>

        <FeedToolbar
          search={searchQuery}
          statusFilter={statusFilter}
          teamFilter={teamFilter}
          teams={fixtureTeams}
          onSearchChange={handleSearchChange}
          onStatusFilterChange={handleStatusFilterChange}
          onTeamFilterChange={handleTeamFilterChange}
        />
      </div>

      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="mx-auto max-w-4xl space-y-4">
          {pageUpdates.map((update) => (
            <StatusUpdateCard key={update.id} update={update} />
          ))}
        </div>
      </div>

      <div className="border-t border-border bg-surface px-8 py-4">
        <FeedPagination
          className="mx-auto max-w-4xl"
          page={safePage}
          totalPages={totalPages}
          totalItems={filteredUpdates.length}
          pageSize={ITEMS_PER_PAGE}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}
