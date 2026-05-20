import type { TeamSummary } from '../types/team'

export const fixtureTeamSummary: TeamSummary = {
  totalUpdatesThisWeek: 6,
  onTrackCount: 3,
  blockedCount: 1,
  needsReviewCount: 1,
  members: [
    {
      id: 'member-1',
      name: 'Sarah Chen',
      teamName: 'Engineering',
      lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      lastStatus: 'on_track',
    },
    {
      id: 'member-2',
      name: 'Marcus Rodriguez',
      teamName: 'Design',
      lastUpdate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      lastStatus: 'blocked',
    },
    {
      id: 'member-3',
      name: 'Emily Watson',
      teamName: 'Product',
      lastUpdate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      lastStatus: 'needs_review',
    },
    {
      id: 'member-4',
      name: 'James Park',
      teamName: 'Engineering',
      lastUpdate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      lastStatus: 'on_track',
    },
    {
      id: 'member-5',
      name: 'Alicia Thompson',
      teamName: 'Marketing',
      lastUpdate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      lastStatus: 'done',
    },
    {
      id: 'member-6',
      name: 'David Kim',
      teamName: 'Engineering',
      lastUpdate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      lastStatus: 'on_track',
    },
  ],
}
