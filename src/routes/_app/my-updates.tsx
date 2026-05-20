import { createFileRoute } from '@tanstack/react-router'
import { MyUpdatesScreen } from '../../components/screens/MyUpdatesScreen'

export const Route = createFileRoute('/_app/my-updates')({
  component: MyUpdatesScreen,
})
