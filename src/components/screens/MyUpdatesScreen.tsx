import { Link } from '@tanstack/react-router'
import { Plus, User } from 'lucide-react'
import { EmptyState } from '../layout/EmptyState'
import { PageHeader } from '../layout/PageHeader'
import { Button } from '../ui/Button'

export function MyUpdatesScreen() {
  return (
    <div className="h-full overflow-auto bg-app-canvas">
      <div className="px-8 py-6">
        <PageHeader title="My Updates" description="View and manage your status updates" />

        <EmptyState
          icon={<User className="size-16 text-icon-muted" aria-hidden />}
          title="No updates yet"
          description="You haven't posted any status updates yet. Create your first update to get started."
          action={
            <Link to="/create">
              <Button type="button" className="px-6 py-2">
                <Plus className="size-4" aria-hidden />
                Create Update
              </Button>
            </Link>
          }
        />
      </div>
    </div>
  )
}
