import { computed } from 'vue'
import { IServiceDetails } from '@/interfaces/service-details.interface'

export default function useFormatMetrics(service: IServiceDetails): any {
  // 2 digits after decimal
  const uptimeFormatted = computed(() => {
    if (service.metrics?.uptime) {
      return service.metrics.uptime.toFixed(2)
    }
    return 0
  })

  // 3 digits
  const requestsFormatted = computed(() => {
    if (service.metrics?.requests) {
      const requests = service.metrics.requests
      if (requests > 1000000) {
        return `${(requests / 1000000).toPrecision(3)}m`
      }
      if (requests > 1000) {
        return `${(requests / 1000).toPrecision(3)}k`
      }
    }
    return 0
  })

  // 2 digits after decimal
  const errorsFormatted = computed(() => {
    if (service.metrics?.errors) {
      return service.metrics.errors.toFixed(2)
    }
    return 0
  })

  return { uptimeFormatted, requestsFormatted, errorsFormatted }
}
