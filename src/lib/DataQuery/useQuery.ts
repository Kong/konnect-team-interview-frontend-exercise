import { isRef, watch, type Ref } from 'vue'
import type { IQueryCacheEntry, QueryFn } from './types'
import { useQueryClient } from './VueQueryClientPlugin'
import type { QueryClient } from './QueryClient'
import { executeFetch } from './utils'

export function useQuery<T>(queryKey: string | Ref<string>, queryFn: QueryFn<T>): IQueryCacheEntry<T> {
  const client = useQueryClient()
  const { staleTime, retry: retryLimt } = client.getDefaultConfig()
  const qKeyValue = isRef<string>(queryKey) ? queryKey.value : queryKey
  const entry = executeIfNeeded<T>(client, qKeyValue, queryFn, staleTime, retryLimt)
  if (isRef<string>(queryKey)) {
    watch(queryKey, () => {
      executeIfNeeded<T>(client, queryKey.value, queryFn, staleTime, retryLimt, entry)
    })
  }
  return entry
}

function executeIfNeeded<T>(client: QueryClient, qKeyVal: string, queryFn: QueryFn<T>, staleTime: number, retryLimt: number, caheEntry?:IQueryCacheEntry<T>): IQueryCacheEntry<T> {
  const hasEntry = client.hasEntry(qKeyVal)
  const entry = caheEntry ?? client.getOrCreateEntry<T>(qKeyVal)
  const isStale = client.isStaleEntry(entry, staleTime)

  if (!hasEntry || isStale || !entry.inFlight) {
    execute(entry, queryFn, retryLimt)
  }
  return entry
}

function execute<T>(entry: IQueryCacheEntry<T>, queryFn: QueryFn<T>, retryLimit: number ) {
  entry.isPending.value = true
  entry.inFlight = executeFetch(queryFn, retryLimit).then((data: T) => {
    entry.isError.value = false
    entry.error.value = null
    entry.data.value = data
    entry.updatedAt.value = Date.now()
    return data
  }).catch((err: Error) => {
    entry.error.value = err
    entry.isError.value = true
    entry.data.value = null
  }).finally(() => {
    entry.inFlight = undefined
    entry.isPending.value = false
  })
}