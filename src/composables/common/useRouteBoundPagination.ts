import { computed, type ComputedRef, type Ref } from 'vue'
import usePaginationRouteState from './usePaginationRouteState'

function clamp(page: number, totalPages: number): number {
  return Math.max(1, Math.min(totalPages, page))
}
export interface IRouteBoundPagination<T> {
  page: Ref<number>
  limit: Ref<number>
  totalPages: ComputedRef<number>
  paginatedItems: ComputedRef<T[]>
  totalItems: Ref<T[] | null>
  hasPreviousPage: ComputedRef<boolean>
  hasNextPage: ComputedRef<boolean>
  nextPage: () => void
  previousPage: () => void
  go: (pageNum: number) => void
  resetPage: () => void
  startOffset: ComputedRef<number>
  endOffset: ComputedRef<number>
}
export default function useRouteBoundPagination<T>(items: Ref<T[] | null>):IRouteBoundPagination<T> {
  const { page, pageLimit } = usePaginationRouteState()
  const totalPages = computed(() => Math.max(1, Math.ceil((items.value?.length ?? 0) / pageLimit.value)))
  const nextPage = () => {
    page.value = clamp(page.value + 1, totalPages.value)
  }
  const previousPage = () => {
    page.value = clamp(page.value - 1, totalPages.value)
  }
  const go = (pageNum: number) => {
    page.value = clamp(pageNum, totalPages.value)
  }
  const resetPage = () => go(1)
  const hasPreviousPage = computed(() => page.value > 1)
  const startOffset = computed(() => ((page.value - 1) * pageLimit.value) + 1)
  const endOffset = computed(() => clamp(((page.value - 1) * pageLimit.value + pageLimit.value) - 1, items.value?.length ?? 0))
  const hasNextPage = computed(() => page.value < totalPages.value)
  const paginatedItems = computed(() => {
    const start = (page.value - 1) * pageLimit.value
    const end = start + pageLimit.value
    return items.value?.slice(start, end) ?? []
  })

  return {
    totalPages,
    page,
    limit: pageLimit,
    nextPage,
    previousPage,
    hasPreviousPage,
    hasNextPage,
    totalItems: items,
    go,
    resetPage,
    paginatedItems,
    startOffset,
    endOffset,
  }
}