import { isRef, ref, shallowRef, watch, type Ref } from 'vue'
import type { IQueryCacheEntry, IUseQueryResult, QueryFn } from './types'
import { useQueryClient } from './VueQueryClientPlugin'
import { executeFetch } from './utils'

export function useQuery<T>(queryKey: string | Ref<string>, queryFn: QueryFn<T>): IUseQueryResult<T> {
  const client = useQueryClient()
  const { staleTime, retry: retryLimt } = client.getDefaultConfig()

  const result: IUseQueryResult<T> = {
    data: shallowRef(null),
    isPending: ref(false),
    isError: ref(false),
    error: ref<Error | null>(null),
    updatedAt: ref(0),
    inFlight: undefined,
  }

  const syncToResult = (cacheEntry: IQueryCacheEntry<T>):IUseQueryResult<T> => {
    result.data.value = cacheEntry.data
    result.isPending.value = cacheEntry.isPending
    result.isError.value = cacheEntry.isError
    result.error.value = cacheEntry.error
    result.updatedAt.value = cacheEntry.updatedAt
    result.inFlight = cacheEntry.inFlight
    return result
  }

  const fetchForKey = (key: string) => {
    const cacheEntry = client.getOrCreateEntry<T>(key)
    const isStale = client.isStaleEntry(cacheEntry, staleTime)
    if (!cacheEntry.data || isStale) {
      execute(cacheEntry, queryFn, retryLimt, () => syncToResult(cacheEntry))
    }
    syncToResult(cacheEntry)
  }

  const qKeyValue = isRef<string>(queryKey) ? queryKey.value : queryKey
  fetchForKey(qKeyValue)

  if (isRef<string>(queryKey)) {
    watch(queryKey, (newKey) => {
      fetchForKey(newKey)
    })
  }
  return result
}
function execute<T>(
  entry: IQueryCacheEntry<T>,
  queryFn: QueryFn<T>,
  retryLimit: number,
  onUpdate?: () => void,
) {
  entry.isPending = true
  onUpdate?.()

  entry.inFlight = executeFetch(queryFn, retryLimit)
    .then((data: T) => {
      entry.isError = false
      entry.error = null
      entry.data = data
      entry.updatedAt = Date.now()
      onUpdate?.()
      return data
    })
    .catch((err: Error) => {
      entry.error = err
      entry.isError = true
      entry.data = null
    })
    .finally(() => {
      entry.inFlight = undefined
      entry.isPending = false
      onUpdate?.()
    })
}
