import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/create')({
  component: CreateUpdateStub,
})

function CreateUpdateStub() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-foreground">New Update</h2>
      <p className="mt-2 text-foreground-muted">Create update form placeholder.</p>
    </div>
  )
}
