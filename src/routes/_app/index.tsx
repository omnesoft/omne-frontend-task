import { createFileRoute } from '@tanstack/react-router'
import { StatusFeedScreen } from '../../components/screens/StatusFeedScreen'
import { parseFeedSearch } from '../../lib/feed-search'

export type { FeedSearch } from '../../lib/feed-search'
export { DEFAULT_FEED_SEARCH } from '../../lib/feed-search'

export const Route = createFileRoute('/_app/')({
  validateSearch: parseFeedSearch,
  component: StatusFeedScreen,
})
