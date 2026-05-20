import { Link, Outlet } from '@tanstack/react-router'
import { Activity } from 'lucide-react'
import { DEFAULT_FEED_SEARCH } from '../../lib/feed-search'
import { navItems } from './nav-config'

export function AppLayout() {
  return (
    <div className="flex h-screen bg-app-canvas">
      <aside className="flex w-64 flex-col border-r border-sidebar-border bg-sidebar">
        <div className="border-b border-sidebar-border p-6">
          <h1 className="flex items-center gap-2 text-xl font-semibold text-foreground">
            <Activity className="size-6 text-primary-600" />
            <span>Pulse</span>
          </h1>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    {...(item.to === '/' ? { search: DEFAULT_FEED_SEARCH } : {})}
                    activeOptions={{ exact: item.exact }}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-surface-raised"
                    activeProps={{
                      className:
                        'flex items-center gap-3 rounded-lg px-3 py-2 bg-primary-50 text-primary-700 transition-colors',
                    }}
                  >
                    <Icon className="size-5 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
