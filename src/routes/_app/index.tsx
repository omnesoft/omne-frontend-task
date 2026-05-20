import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/')({
  component: StatusFeedStub,
})

function StatusFeedStub() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-foreground">Status Feed</h2>
      <p className="mt-2 text-foreground-muted">Feed screen placeholder.</p>
    </div>
  )
}
