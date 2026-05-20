import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useCreateStatus } from '../../api/hooks/use-create-status'
import { useStatus } from '../../api/hooks/use-status'
import { useTeams } from '../../api/hooks/use-teams'
import { useUpdateStatus } from '../../api/hooks/use-update-status'
import { fixtureProjects } from '../../fixtures/projects'
import { ApiError } from '../../lib/api-client'
import { cn } from '../../lib/cn'
import { DEFAULT_FEED_SEARCH } from '../../lib/feed-search'
import { validateStatusForm } from '../../lib/status-form-validation'
import { STATUS_LABELS, STATUS_SLUGS, type StatusSlug } from '../../types/status'
import { QueryState } from '../feedback/QueryState'
import { Button } from '../ui/Button'
import { FieldError } from '../ui/FieldError'
import { FieldLabel } from '../ui/FieldLabel'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Textarea } from '../ui/Textarea'

export interface CreateUpdateScreenProps {
  mode: 'create' | 'edit'
  statusId?: string
}

type FieldErrors = Partial<
  Record<'project' | 'teamId' | 'body' | 'status' | 'statusDate' | 'blockers', string>
>

export function CreateUpdateScreen({ mode, statusId }: CreateUpdateScreenProps) {
  const navigate = useNavigate()
  const isEdit = mode === 'edit'
  const teamsQuery = useTeams()
  const statusQuery = useStatus(statusId ?? '')
  const createMutation = useCreateStatus()
  const updateMutation = useUpdateStatus(statusId ?? '')

  const [teamId, setTeamId] = useState('')
  const [project, setProject] = useState('')
  const [status, setStatus] = useState<StatusSlug>('on_track')
  const [updateBody, setUpdateBody] = useState('')
  const [blockers, setBlockers] = useState('')
  const [statusDate, setStatusDate] = useState(() => new Date().toISOString().split('T')[0])
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | undefined>()
  const [hydrated, setHydrated] = useState(!isEdit)

  const pending = createMutation.isPending || updateMutation.isPending

  useEffect(() => {
    if (!isEdit || !statusQuery.data || hydrated) {
      return
    }
    const data = statusQuery.data
    setTeamId(data.teamId)
    setProject(data.project)
    setStatus(data.status)
    setUpdateBody(data.body)
    setBlockers(data.blockers ?? '')
    setStatusDate(data.statusDate)
    setHydrated(true)
  }, [isEdit, statusQuery.data, hydrated])

  const applyApiDetails = (details?: Record<string, string>) => {
    if (!details) {
      return
    }
    const next: FieldErrors = {}
    for (const [key, message] of Object.entries(details)) {
      if (
        key === 'project' ||
        key === 'teamId' ||
        key === 'body' ||
        key === 'status' ||
        key === 'statusDate' ||
        key === 'blockers'
      ) {
        next[key] = message
      }
    }
    setFieldErrors(next)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFieldErrors({})
    setFormError(undefined)

    const clientErrors = validateStatusForm({ project, teamId, body: updateBody })
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors)
      return
    }

    const payload = {
      teamId,
      project,
      status,
      body: updateBody.trim(),
      blockers: blockers.trim() ? blockers.trim() : null,
      statusDate,
    }

    try {
      if (isEdit && statusId) {
        await updateMutation.mutateAsync(payload)
      } else {
        await createMutation.mutateAsync(payload)
      }
      navigate({ to: '/', search: DEFAULT_FEED_SEARCH })
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.details) {
          applyApiDetails(error.details)
        }
        if (error.status >= 500 || !error.details) {
          setFormError(error.error)
        }
        return
      }
      setFormError('Something went wrong. Please try again.')
    }
  }

  const handleCancel = () => {
    navigate({ to: '/', search: DEFAULT_FEED_SEARCH })
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <FieldLabel htmlFor="team" required>
          Team
        </FieldLabel>
        <Select
          id="team"
          value={teamId}
          disabled={pending || teamsQuery.isPending}
          error={Boolean(fieldErrors.teamId)}
          onChange={(e) => {
            setTeamId(e.target.value)
            setFieldErrors((prev) => ({ ...prev, teamId: undefined }))
          }}
        >
          <option value="">Select a team</option>
          {(teamsQuery.data ?? []).map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </Select>
        {fieldErrors.teamId ? <FieldError message={fieldErrors.teamId} /> : null}
      </div>

      <div>
        <FieldLabel htmlFor="project" required>
          Project
        </FieldLabel>
        <Select
          id="project"
          value={project}
          disabled={pending}
          error={Boolean(fieldErrors.project)}
          onChange={(e) => {
            setProject(e.target.value)
            setFieldErrors((prev) => ({ ...prev, project: undefined }))
          }}
        >
          <option value="">Select a project</option>
          {fixtureProjects.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Select>
        {fieldErrors.project ? <FieldError message={fieldErrors.project} /> : null}
      </div>

      <div>
        <FieldLabel required>Status</FieldLabel>
        <div className="grid grid-cols-2 gap-3">
          {STATUS_SLUGS.map((slug) => (
            <label
              key={slug}
              className={cn(
                'flex cursor-pointer items-center justify-center rounded-lg border-2 px-4 py-3 transition-all',
                status === slug
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-border bg-surface hover:border-neutral-300',
                pending && 'pointer-events-none opacity-50',
              )}
            >
              <input
                type="radio"
                name="status"
                value={slug}
                checked={status === slug}
                disabled={pending}
                onChange={() => {
                  setStatus(slug)
                  setFieldErrors((prev) => ({ ...prev, status: undefined }))
                }}
                className="sr-only"
              />
              <span
                className={cn(
                  'text-sm font-medium',
                  status === slug ? 'text-primary-700' : 'text-foreground-muted',
                )}
              >
                {STATUS_LABELS[slug]}
              </span>
            </label>
          ))}
        </div>
        {fieldErrors.status ? <FieldError message={fieldErrors.status} /> : null}
      </div>

      <div>
        <FieldLabel htmlFor="updateBody" required>
          Update
        </FieldLabel>
        <Textarea
          id="updateBody"
          value={updateBody}
          disabled={pending}
          error={Boolean(fieldErrors.body)}
          onChange={(e) => {
            setUpdateBody(e.target.value)
            setFieldErrors((prev) => ({ ...prev, body: undefined }))
          }}
          placeholder="What have you been working on?"
          rows={4}
        />
        {fieldErrors.body ? <FieldError message={fieldErrors.body} /> : null}
      </div>

      <div>
        <FieldLabel htmlFor="blockers" optionalHint="(optional)">
          Blockers
        </FieldLabel>
        <Textarea
          id="blockers"
          value={blockers}
          disabled={pending}
          onChange={(e) => {
            setBlockers(e.target.value)
            setFieldErrors((prev) => ({ ...prev, blockers: undefined }))
          }}
          placeholder="Any blockers or dependencies?"
          rows={3}
        />
        {fieldErrors.blockers ? <FieldError message={fieldErrors.blockers} /> : null}
      </div>

      <div>
        <FieldLabel htmlFor="statusDate">Status Date</FieldLabel>
        <Input
          type="date"
          id="statusDate"
          value={statusDate}
          disabled={pending}
          onChange={(e) => {
            setStatusDate(e.target.value)
            setFieldErrors((prev) => ({ ...prev, statusDate: undefined }))
          }}
        />
        {fieldErrors.statusDate ? <FieldError message={fieldErrors.statusDate} /> : null}
      </div>

      {formError ? (
        <div className="rounded-lg border border-danger-200 bg-danger-50 px-4 py-3 text-sm text-danger-800">
          <p>{formError}</p>
          <Button
            type="button"
            variant="secondary"
            className="mt-3"
            onClick={() => setFormError(undefined)}
          >
            Dismiss
          </Button>
        </div>
      ) : null}

      <div className="flex items-center gap-3 pt-4">
        <Button type="submit" disabled={pending}>
          {pending ? 'Saving…' : isEdit ? 'Save Changes' : 'Submit Update'}
        </Button>
        <Button type="button" variant="secondary" disabled={pending} onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )

  return (
    <div className="h-full overflow-auto bg-app-canvas">
      <div className="mx-auto max-w-2xl px-4 py-12 md:px-8">
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-foreground">
            {isEdit ? 'Edit Status Update' : 'Create Status Update'}
          </h2>
          <p className="text-foreground-muted">Share your progress with the team</p>
        </div>

        <div className="rounded-lg border border-border bg-surface p-8">
          {isEdit ? (
            <QueryState
              isPending={statusQuery.isPending || !hydrated}
              isError={statusQuery.isError}
              error={statusQuery.error}
              refetch={() => void statusQuery.refetch()}
            >
              {formContent}
            </QueryState>
          ) : (
            formContent
          )}
        </div>
      </div>
    </div>
  )
}
