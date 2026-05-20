import { Link, Outlet } from '@tanstack/react-router'
import { Activity } from 'lucide-react'
import { cn } from '../../lib/cn'
import { DEFAULT_FEED_SEARCH } from '../../lib/feed-search'
import { navItems } from './nav-config'

function AppLogo({ className }: { className?: string }) {
  return (
    <h1 className={cn('flex items-center gap-2 text-xl font-semibold text-foreground', className)}>
      <Activity className="size-6 text-primary-600" />
      <span>Pulse</span>
    </h1>
  )
}

function AppNav({ className }: { className?: string }) {
  return (
    <ul className={cn('space-y-1', className)}>
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
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export function AppLayout() {
  return (
    <div className="flex h-screen flex-col bg-app-canvas md:flex-row">
      <header className="flex shrink-0 flex-col border-b border-sidebar-border bg-sidebar md:hidden">
        <div className="border-b border-sidebar-border px-4 py-4">
          <AppLogo />
        </div>
        <nav className="overflow-x-auto px-2 py-2">
          <AppNav className="flex flex-row gap-1 space-y-0" />
        </nav>
      </header>

      <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        <div className="border-b border-sidebar-border p-6">
          <AppLogo />
        </div>
        <nav className="flex-1 p-4">
          <AppNav />
        </nav>
      </aside>

      <main className="min-h-0 flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
