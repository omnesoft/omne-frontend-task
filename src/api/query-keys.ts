/** Filters for GET /api/statuses — omitted API params use sentinel values in the key. */
export interface StatusListFilters {
  page: number
  limit: number
  status: string
  team: string
  search: string
}

export const statusKeys = {
  all: ['statuses'] as const,
  lists: () => [...statusKeys.all, 'list'] as const,
  list: (filters: StatusListFilters) => [...statusKeys.lists(), filters] as const,
  details: () => [...statusKeys.all, 'detail'] as const,
  detail: (id: string) => [...statusKeys.details(), id] as const,
}

export const teamKeys = {
  all: ['teams'] as const,
}

export const teamSummaryKeys = {
  all: ['team-summary'] as const,
}
