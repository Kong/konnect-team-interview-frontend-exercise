import type { RouteStateOptions, RouteStateValue } from '@/lib/RouteState/types'
import useRouteState from '@/lib/RouteState/useRouteState'

const DEFAULT_PAGE_LIMIT = 10
const routeStateOptions: RouteStateOptions<number> = {
  omitEmpty: false,
  replace: false,
  serialize: (value: number) => String(value),
  deserialize: (value: RouteStateValue, defaultVal) => typeof value === 'string' ? Number(value) : defaultVal,
}

export default function usePaginationRouteState() {
  const page = useRouteState<number>('page', 1, routeStateOptions)
  const pageLimit = useRouteState<number>('limit', DEFAULT_PAGE_LIMIT, routeStateOptions)

  return { page, pageLimit }
}