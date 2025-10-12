import type { CacheEntry, ICacheManager } from './types'

export class CacheManager<T> implements ICacheManager<T> {
  private store = new Map<string, CacheEntry<T>>()

  get(key: string): T | undefined {
    const entry = this.store.get(key)
    return entry?.cacheValue
  }
  set(key: string, value: T) {
    const cacheEntry = { cacheValue: value }
    this.store.set(key, cacheEntry)
  }
  delete(key: string) {
    return this.store.delete(key)
  }
  has(key: string) {
    return this.store.has(key)
  }
  clear() {
    return this.store.clear()
  }
}