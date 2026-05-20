export interface FeedSearch {
  page: number
  status: string
  team: string
  search: string
}

export const DEFAULT_FEED_SEARCH: FeedSearch = {
  page: 1,
  status: 'all',
  team: 'all',
  search: '',
}

export function parseFeedSearch(search: Record<string, unknown>): FeedSearch {
  const rawPage = Number(search.page)
  const page = Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1

  return {
    page,
    status: typeof search.status === 'string' ? search.status : 'all',
    team: typeof search.team === 'string' ? search.team : 'all',
    search: typeof search.search === 'string' ? search.search : '',
  }
}
