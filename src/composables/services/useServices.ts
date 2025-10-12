import { computed, watch } from 'vue'
import axios from 'axios'
import type { Service, ServiceCatalog } from '@/types/services'
import { useQuery } from '@/lib/DataQuery/useQuery'
import type { IQueryCacheEntry } from '@/lib/DataQuery/types'
import useSearchRouteState from '../common/useSearchRouteState'
import useRouteBoundPagination, { type IRouteBoundPagination } from '../common/useRouteBoundPagination'

export default function useServices(): IQueryCacheEntry<ServiceCatalog> & { paginatedData: IRouteBoundPagination<Service> } {
  const searchState = useSearchRouteState()
  const fetcher = (): Promise<ServiceCatalog> => {
    return axios.get<ServiceCatalog>('/api/services', { params: { 'q': searchState.value } }).then((resp) => resp.data)
  }
  const key = computed(() => searchState.value ? `services-${searchState.value}` : 'services')
  const servicesResp = useQuery<ServiceCatalog>(key, fetcher)

  const paginatedResp = useRouteBoundPagination<Service>(servicesResp.data)

  watch(searchState, () => {
    paginatedResp.resetPage()
  })

  return { ...servicesResp, paginatedData: { ...paginatedResp } }
}