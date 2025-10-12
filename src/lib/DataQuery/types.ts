import type { Ref } from 'vue'

export type CacheEntry<T> = {
  cacheValue: T
}
export interface ICacheManager<T> {
  get: (key: string) => T | undefined
  set: (key: string, value: T) => void
  clear: () => void
  delete: (key: string) => boolean
  has: (key: string) => boolean
}

//  Query Client
export interface IQueryClientConfig {
  retry: number
  staleTime: number
}

export interface IQueryCacheEntry<T> {
  data: Ref<T | null>
  isPending: Ref<boolean>
  isError: Ref<boolean>
  error: Ref<Error | null>
  updatedAt: Ref<number>
  inFlight?: Promise<T | void>
}

// UseQuery Composable

export type QueryFn<T> = () => Promise<T>