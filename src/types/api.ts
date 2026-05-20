import type { StatusSlug } from './status'
import type { StatusUpdate } from './status-update'

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedStatusesResponse {
  data: StatusUpdate[]
  pagination: PaginationMeta
}

/** Error JSON shape from api-spec.md */
export interface ApiErrorBody {
  error: string
  details?: Record<string, string>
}

export interface CreateStatusPayload {
  teamId: string
  project: string
  status: StatusSlug
  body: string
  blockers: string | null
  statusDate: string
}

export type UpdateStatusPayload = Partial<CreateStatusPayload>
