import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiPost } from '../../lib/api-client'
import type { CreateStatusPayload } from '../../types/api'
import type { StatusUpdate } from '../../types/status-update'
import { statusKeys, teamSummaryKeys } from '../query-keys'

export function useCreateStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateStatusPayload) => apiPost<StatusUpdate>('/statuses', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: statusKeys.lists() })
      queryClient.invalidateQueries({ queryKey: teamSummaryKeys.all })
    },
  })
}
