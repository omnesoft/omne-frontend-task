import { useQuery } from '@tanstack/react-query'
import { apiGet } from '../../lib/api-client'
import type { TeamSummary } from '../../types/team'
import { teamSummaryKeys } from '../query-keys'

export function teamSummaryQueryOptions() {
  return {
    queryKey: teamSummaryKeys.all,
    queryFn: () => apiGet<TeamSummary>('/team-summary'),
  }
}

export function useTeamSummary() {
  return useQuery(teamSummaryQueryOptions())
}
