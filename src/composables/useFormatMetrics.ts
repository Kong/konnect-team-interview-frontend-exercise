import { computed } from 'vue'
import { ServiceDetails } from '@/interfaces/service-details.interface'

export default function useFormatMetrics(service: ServiceDetails): any {
  const uptimeFormatted = computed(() => {
    if (service.metrics?.uptime) {
      return service.metrics.uptime.toFixed(2)
    }
    return 0
  })

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

  const errorsFormatted = computed(() => {
    if (service.metrics?.errors) {
      return service.metrics.errors.toFixed(2)
    }
    return 0
  })

  return { uptimeFormatted, requestsFormatted, errorsFormatted }
}
