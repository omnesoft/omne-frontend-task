import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { fixtureProjects } from '../../fixtures/projects'
import { cn } from '../../lib/cn'
import { STATUS_LABELS, STATUS_SLUGS, type StatusSlug } from '../../types/status'
import { Button } from '../ui/Button'
import { FieldError } from '../ui/FieldError'
import { FieldLabel } from '../ui/FieldLabel'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Textarea } from '../ui/Textarea'

export function CreateUpdateScreen() {
  const navigate = useNavigate()
  const [project, setProject] = useState('')
  const [status, setStatus] = useState<StatusSlug>('on_track')
  const [updateBody, setUpdateBody] = useState('')
  const [blockers, setBlockers] = useState('')
  const [statusDate, setStatusDate] = useState(() => new Date().toISOString().split('T')[0])
  const [projectError, setProjectError] = useState<string | undefined>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!project) {
      setProjectError('Please select a project')
      return
    }

    navigate({ to: '/' })
  }

  const handleCancel = () => {
    navigate({ to: '/' })
  }

  return (
    <div className="h-full overflow-auto bg-app-canvas">
      <div className="mx-auto max-w-2xl px-8 py-12">
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-foreground">Create Status Update</h2>
          <p className="text-foreground-muted">Share your progress with the team</p>
        </div>

        <div className="rounded-lg border border-border bg-surface p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <FieldLabel htmlFor="project" required>
                Project
              </FieldLabel>
              <Select
                id="project"
                value={project}
                error={Boolean(projectError)}
                onChange={(e) => {
                  setProject(e.target.value)
                  setProjectError(undefined)
                }}
              >
                <option value="">Select a project</option>
                {fixtureProjects.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </Select>
              {projectError ? <FieldError message={projectError} /> : null}
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
                    )}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={slug}
                      checked={status === slug}
                      onChange={() => setStatus(slug)}
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
            </div>

            <div>
              <FieldLabel htmlFor="updateBody" required>
                Update
              </FieldLabel>
              <Textarea
                id="updateBody"
                value={updateBody}
                onChange={(e) => setUpdateBody(e.target.value)}
                placeholder="What have you been working on?"
                rows={4}
              />
            </div>

            <div>
              <FieldLabel htmlFor="blockers" optionalHint="(optional)">
                Blockers
              </FieldLabel>
              <Textarea
                id="blockers"
                value={blockers}
                onChange={(e) => setBlockers(e.target.value)}
                placeholder="Any blockers or dependencies?"
                rows={3}
              />
            </div>

            <div>
              <FieldLabel htmlFor="statusDate">Status Date</FieldLabel>
              <Input
                type="date"
                id="statusDate"
                value={statusDate}
                onChange={(e) => setStatusDate(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button type="submit">Submit Update</Button>
              <Button type="button" variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
