import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/team')({
  component: TeamOverviewStub,
})

function TeamOverviewStub() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-foreground">Team Overview</h2>
      <p className="mt-2 text-foreground-muted">Team dashboard placeholder.</p>
    </div>
  )
}
