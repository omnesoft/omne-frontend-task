import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/my-updates')({
  component: MyUpdatesStub,
})

function MyUpdatesStub() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-foreground">My Updates</h2>
      <p className="mt-2 text-foreground-muted">My updates screen placeholder.</p>
    </div>
  )
}
