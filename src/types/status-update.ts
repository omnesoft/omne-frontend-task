import type { StatusSlug } from './status'

export interface StatusUpdate {
  id: string
  authorId: string
  authorName: string
  authorAvatar: string
  teamId: string
  teamName: string
  project: string
  status: StatusSlug
  body: string
  blockers: string | null
  statusDate: string
  createdAt: string
  updatedAt: string
}
