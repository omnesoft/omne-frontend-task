import type { StatusSlug } from './status'

export interface Team {
  id: string
  name: string
  memberCount: number
}

export interface TeamMember {
  id: string
  name: string
  teamName: string
  lastUpdate: string | null
  lastStatus: StatusSlug | null
}

export interface TeamSummary {
  totalUpdatesThisWeek: number
  onTrackCount: number
  blockedCount: number
  needsReviewCount: number
  members: TeamMember[]
}
