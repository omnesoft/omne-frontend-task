import { createFileRoute } from '@tanstack/react-router'
import { statusQueryOptions } from '../../api/hooks/use-status'
import { CreateUpdateScreen } from '../../components/screens/CreateUpdateScreen'

export const Route = createFileRoute('/_app/create/$statusId')({
  loader: ({ context: { queryClient }, params: { statusId } }) =>
    queryClient.ensureQueryData(statusQueryOptions(statusId)),
  component: EditStatusRoute,
})

function EditStatusRoute() {
  const { statusId } = Route.useParams()
  return <CreateUpdateScreen mode="edit" statusId={statusId} />
}
