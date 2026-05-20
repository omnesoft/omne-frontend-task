export const MIN_UPDATE_BODY_LENGTH = 10
export const MAX_UPDATE_BODY_LENGTH = 500

export type StatusFormField = 'project' | 'teamId' | 'body'

export type StatusFormFieldErrors = Partial<Record<StatusFormField, string>>

export function validateStatusForm(fields: {
  project: string
  teamId: string
  body: string
}): StatusFormFieldErrors {
  const errors: StatusFormFieldErrors = {}
  const trimmedBody = fields.body.trim()

  if (!fields.project) {
    errors.project = 'Please select a project'
  }
  if (!fields.teamId) {
    errors.teamId = 'Please select a team'
  }
  if (trimmedBody.length < MIN_UPDATE_BODY_LENGTH) {
    errors.body = 'Update must be at least 10 characters'
  } else if (trimmedBody.length > MAX_UPDATE_BODY_LENGTH) {
    errors.body = 'Update must be 500 characters or fewer'
  }

  return errors
}
