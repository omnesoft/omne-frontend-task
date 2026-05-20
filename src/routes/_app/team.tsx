import { createFileRoute } from '@tanstack/react-router'
import { TeamOverviewScreen } from '../../components/screens/TeamOverviewScreen'

export const Route = createFileRoute('/_app/team')({
  component: TeamOverviewScreen,
})
