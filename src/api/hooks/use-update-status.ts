import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiPut } from '../../lib/api-client'
import type { UpdateStatusPayload } from '../../types/api'
import type { StatusUpdate } from '../../types/status-update'
import { statusKeys, teamSummaryKeys } from '../query-keys'

export function useUpdateStatus(statusId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateStatusPayload) =>
      apiPut<StatusUpdate>(`/statuses/${statusId}`, payload),
    onSuccess: (data) => {
      queryClient.setQueryData(statusKeys.detail(statusId), data)
      queryClient.invalidateQueries({ queryKey: statusKeys.lists() })
      queryClient.invalidateQueries({ queryKey: teamSummaryKeys.all })
    },
  })
}
