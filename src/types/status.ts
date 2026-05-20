export type StatusSlug = 'on_track' | 'blocked' | 'needs_review' | 'done'

export const STATUS_SLUGS = [
  'on_track',
  'blocked',
  'needs_review',
  'done',
] as const satisfies readonly StatusSlug[]

export const STATUS_LABELS: Record<StatusSlug, string> = {
  on_track: 'On Track',
  blocked: 'Blocked',
  needs_review: 'Needs Review',
  done: 'Done',
}
