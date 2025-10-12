export interface ServiceMetrics {
  latency: number
  uptime: number
  requests: number
  errors: number
}

export interface Developer {
  id: string
  name: string
  email: string
  avatar: string
}

export interface ServiceVersion {
  id: string
  name: string
  description: string
  developer?: Developer
  updated_at: string
}

export interface Service {
  id: string
  name: string
  description: string
  type: ServiceType
  published: boolean
  configured: boolean
  versions: ServiceVersion[]
  metrics?: ServiceMetrics
}

export type ServiceCatalog = Service[]

export type ServiceType = 'REST' | 'HTTP'

export enum ServiceStatus {
  PUBLISHED = 'published',
  UNPUBLISHED = 'unpublished',
  IN_PROGRESS = 'in_progress',
}

export const ServiceStatusLabel: Record<ServiceStatus, string> = {
  [ServiceStatus.PUBLISHED]: 'Published',
  [ServiceStatus.IN_PROGRESS]: 'In Progress',
  [ServiceStatus.UNPUBLISHED]: 'Unpublished',
} as const

export interface ServiceStatusInfo {
  status: ServiceStatus
  label: string
  icon: string
}

export const ServiceStatusMap: Record<ServiceStatus, { label: string, icon: string }> = {
  [ServiceStatus.PUBLISHED]: { label: ServiceStatusLabel.published, icon: 'IconCheck' },
  [ServiceStatus.IN_PROGRESS]: { label: ServiceStatusLabel.in_progress, icon: 'IconProgress' },
  [ServiceStatus.UNPUBLISHED]: { label: ServiceStatusLabel.unpublished, icon: 'IconCross' },
} as const

