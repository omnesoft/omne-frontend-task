import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/settings')({
  component: SettingsStub,
})

function SettingsStub() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-foreground">Settings</h2>
      <p className="mt-2 text-foreground-muted">Settings screen placeholder.</p>
    </div>
  )
}
