import { useQuery } from '@tanstack/react-query'
import { apiGet } from '../../lib/api-client'
import type { StatusUpdate } from '../../types/status-update'
import { statusKeys } from '../query-keys'

export function statusQueryOptions(id: string) {
  return {
    queryKey: statusKeys.detail(id),
    queryFn: () => apiGet<StatusUpdate>(`/statuses/${id}`),
  }
}

export function useStatus(id: string) {
  return useQuery({
    ...statusQueryOptions(id),
    enabled: Boolean(id),
  })
}
