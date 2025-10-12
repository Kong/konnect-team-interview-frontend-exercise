import { ServiceStatus, ServiceStatusMap, type ServiceStatusInfo } from '@/types/services'


export function getServiceStatusInfo(configured: boolean, published: boolean):ServiceStatusInfo {
  const serviceStatus = !configured ? ServiceStatus.IN_PROGRESS : published ? ServiceStatus.PUBLISHED : ServiceStatus.UNPUBLISHED
  return {
    status: serviceStatus,
    ...ServiceStatusMap[serviceStatus],
  }
}

export function pluralize(word: string, count: number) {
  return `${count} ${word}${count > 1 ? 's' : ''}`
}

export function formatRequestes(count: number = 0) {
  if (count == null || isNaN(count)) return '-'
  if (count < 1000) return `${count}`
  if (count < 1_000_000) return `${(count / 1000).toFixed(0)}k`
  if (count < 1_000_000_000) return `${(count / 1_000_000).toFixed(1)}M`
  return `${(count / 1_000_000_000).toFixed(1)}B`
}

export function formatLatency(latency: number) {
  if (latency == null || isNaN(latency)) return '-'
  return `${latency.toFixed(2)}ms`
}

export function formatUptime(uptime: number): string {
  if (uptime == null || isNaN(uptime)) return '-'
  const value = uptime > 1 ? uptime : uptime * 100
  return `${value.toFixed(2)}%`
}

export function formatErrors(errors: number): string {
  if (errors == null || isNaN(errors)) return '-'
  const value = errors > 1 ? errors : errors * 100
  return `${value.toFixed(2)}%`
}

export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()

  const seconds = Math.floor(diffMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}
