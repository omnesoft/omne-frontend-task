import { useQuery } from '@tanstack/react-query'
import { apiGet } from '../../lib/api-client'
import type { PaginatedStatusesResponse } from '../../types/api'
import { type StatusListFilters, statusKeys } from '../query-keys'

export const FEED_PAGE_SIZE = 6

function buildStatusSearchParams(filters: StatusListFilters): URLSearchParams {
  const params = new URLSearchParams()
  params.set('page', String(filters.page))
  params.set('limit', String(filters.limit))
  if (filters.status !== 'all') {
    params.set('status', filters.status)
  }
  if (filters.team !== 'all') {
    params.set('team', filters.team)
  }
  const search = filters.search.trim()
  if (search) {
    params.set('search', search)
  }
  return params
}

export function statusesQueryOptions(filters: StatusListFilters) {
  return {
    queryKey: statusKeys.list(filters),
    queryFn: () => apiGet<PaginatedStatusesResponse>('/statuses', buildStatusSearchParams(filters)),
  }
}

export function useStatuses(filters: StatusListFilters) {
  return useQuery(statusesQueryOptions(filters))
}
