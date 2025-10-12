import useRouteState from '@/lib/RouteState/useRouteState'

export default function useSearchRouteState() {
  return useRouteState('q', '', { omitEmpty: true, replace: true })
}