import { Activity, Home, type LucideIcon, Settings, Users } from 'lucide-react'

export type NavItem = {
  to: '/' | '/my-updates' | '/team' | '/settings'
  label: string
  icon: LucideIcon
  exact?: boolean
}

export const navItems: NavItem[] = [
  { to: '/', label: 'Feed', icon: Home, exact: true },
  { to: '/my-updates', label: 'My Updates', icon: Activity },
  { to: '/team', label: 'Team', icon: Users },
  { to: '/settings', label: 'Settings', icon: Settings },
]
