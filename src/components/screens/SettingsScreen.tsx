import type { LucideIcon } from 'lucide-react'
import { Bell, Globe, Lock, User } from 'lucide-react'
import { PageHeader } from '../layout/PageHeader'

interface SettingsItem {
  icon: LucideIcon
  title: string
  description: string
}

const settingsItems: SettingsItem[] = [
  {
    icon: User,
    title: 'Profile Settings',
    description: 'Update your personal information',
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Configure notification preferences',
  },
  {
    icon: Lock,
    title: 'Privacy',
    description: 'Manage privacy and security settings',
  },
  {
    icon: Globe,
    title: 'Language & Region',
    description: 'Set your language and timezone',
  },
]

function SettingsRow({ icon: Icon, title, description }: SettingsItem) {
  return (
    <div className="cursor-pointer rounded-lg border border-border bg-surface p-6 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-surface-raised p-3">
          <Icon className="size-6 text-icon-muted" aria-hidden />
        </div>
        <div>
          <h3 className="mb-1 font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-foreground-muted">{description}</p>
        </div>
      </div>
    </div>
  )
}

export function SettingsScreen() {
  return (
    <div className="h-full overflow-auto bg-app-canvas">
      <div className="px-8 py-6">
        <PageHeader title="Settings" description="Manage your account and preferences" />

        <div className="max-w-2xl space-y-4">
          {settingsItems.map((item) => (
            <SettingsRow key={item.title} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}
