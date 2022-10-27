import { ref } from 'vue'

export default function usePagination(): any {
  const allServices = ref<any[]>([])
  const paginatedServices = ref<any[]>([])
  const paginationOffset = ref(0)

  const paginateResult = (services: any[]) => {
    paginationOffset.value = 0
    allServices.value = services
    setPaginatedResult()
  }

  const setPaginatedResult = () => {
    // use copy of allServices to avoid unwanted mutations
    paginatedServices.value = [...allServices.value].splice(paginationOffset.value, 9)
  }

  const setPagination = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      paginationOffset.value += 9
    }
    if (direction === 'previous') {
      paginationOffset.value -= 9
    }
    setPaginatedResult()
  }

  return { paginatedServices, paginateResult, paginationOffset, setPagination }
}
