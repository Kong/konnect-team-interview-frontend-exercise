interface ServiceMetrics {
  latency: number;
  uptime: number;
  requests: number;
  errors: number;
}

interface DeveloperProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface ServiceVersion {
  id: string;
  name: string;
  description: string;
  developer: DeveloperProfile;
  updated_at: Date;
}

export interface IServiceDetails {
  id: string;
  name: string;
  description: string;
  type: 'HTTP' | 'REST';
  published: boolean;
  configured: boolean;
  versions: ServiceVersion[];
  metrics?: ServiceMetrics;
}
