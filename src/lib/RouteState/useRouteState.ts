import { useRoute, useRouter, type LocationQuery } from 'vue-router'
import type { Deserialize, RouteStateOptions, RouteStateValue, Serialize } from './types'
import { computed } from 'vue'

export default function useRouteState<T>(key: string, defaultValue: T, options: RouteStateOptions<T> = {}) {
  const route = useRoute()
  const router = useRouter()

  // Setting up defaults
  const replace = options.replace ?? true
  const omitEmpty = options.omitEmpty ?? true
  const serialize = options.serialize ?? ((value: T) => String(value))
  const deserialize = options.deserialize ?? ((value: RouteStateValue) => value as T)

  const routeState = computed<T>({
    get() {
      return readQuery<T>(route.query, key, { deserialize, defaultValue })
    },
    set(value: T) {
      const updatedQuery = updateQuery<T>(route.query, key, value, { serialize, defaultValue, omitEmpty })
      const method = replace ? router.replace : router.push
      method({ query: updatedQuery })
    },
  })

  return routeState
}

function readQuery<T>(query: LocationQuery, key: string, options: RouteStateOptions<T> & { defaultValue: T, deserialize: Deserialize<T> }) {
  const queryVal:RouteStateValue = query[key]
  return options.deserialize(queryVal, options.defaultValue)
}

function updateQuery<T>(query: LocationQuery, key:string, value: T, options:RouteStateOptions<T> & { defaultValue: T, serialize: Serialize<T> }) {
  const updatedQuery = { ...query }
  const isEmpty = value === '' || value == null
  if (isEmpty && options.omitEmpty) {
    delete updatedQuery[key]
  } else {
    const updatedVal = value == undefined ? options.defaultValue : value
    updatedQuery[key] = options.serialize(updatedVal)
  }
  return updatedQuery
}