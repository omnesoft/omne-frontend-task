import { createFileRoute } from '@tanstack/react-router'
import { CreateUpdateScreen } from '../../components/screens/CreateUpdateScreen'

export const Route = createFileRoute('/_app/create')({
  component: CreateStatusRoute,
})

function CreateStatusRoute() {
  return <CreateUpdateScreen mode="create" />
}
