import { ref, shallowRef } from 'vue'
import { CacheManager } from './CacheManager'
import type { ICacheManager, IQueryCacheEntry, IQueryClientConfig } from './types'

export class QueryClient {
  private defaultConfig: IQueryClientConfig
  private queryCache: ICacheManager<IQueryCacheEntry<unknown>>

  constructor(config: IQueryClientConfig) {
    this.defaultConfig = config
    this.queryCache = new CacheManager<IQueryCacheEntry<unknown>>()
  }

  private _setEntry<T>(key: string, entry: IQueryCacheEntry<T>) {
    this.queryCache.set(key, entry)
    return entry
  }
  public getDefaultConfig() {
    return this.defaultConfig
  }
  private _createQueryCacheEntry<T>():IQueryCacheEntry<T> {
    return {
      data: null,
      isPending: false,
      isError: false,
      error: null,
      updatedAt: 0,
      inFlight: undefined,
    }
  }
  public getOrCreateEntry<T>(key: string) : IQueryCacheEntry<T> {
    const isEntryExist = this.queryCache.has(key)
    if (!isEntryExist) {
      const newEntry = this._createQueryCacheEntry<T>()
      this._setEntry(key, newEntry)
    }
    const entry = this.queryCache.get(key)
    return entry as IQueryCacheEntry<T>
  }

  public hasEntry(key: string):boolean {
    return this.queryCache.has(key)
  }
  public isStaleEntry<T>(entry: IQueryCacheEntry<T>, staleTime: number) {
    return entry.updatedAt === 0 ? false : Date.now() - entry.updatedAt >= staleTime
  }
}