import { createFileRoute } from '@tanstack/react-router'
import { StatusFeedScreen } from '../../components/screens/StatusFeedScreen'

export const Route = createFileRoute('/_app/')({
  component: StatusFeedScreen,
})
