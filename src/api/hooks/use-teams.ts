import { useQuery } from '@tanstack/react-query'
import { apiGet } from '../../lib/api-client'
import type { Team } from '../../types/team'
import { teamKeys } from '../query-keys'

export function teamsQueryOptions() {
  return {
    queryKey: teamKeys.all,
    queryFn: () => apiGet<Team[]>('/teams'),
  }
}

export function useTeams() {
  return useQuery(teamsQueryOptions())
}
