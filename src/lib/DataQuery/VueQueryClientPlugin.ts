import { inject, type App } from 'vue'
import { QueryClient } from './QueryClient'
import type { IQueryClientConfig } from './types'

const QueryClientSymbol = Symbol('QueryClient')

const defaultQueryConfig: IQueryClientConfig = {
  retry: 0,
  staleTime: 60 * 1000,
}

const VueQueryClientPlugin = {
  install(app: App, config: IQueryClientConfig = defaultQueryConfig) {
    const client = new QueryClient(config)
    app.provide(QueryClientSymbol, client)
  },
}

export default VueQueryClientPlugin

export function useQueryClient(): InstanceType<typeof QueryClient> {
  const client = inject<QueryClient>(QueryClientSymbol)
  if (client === undefined) throw new Error('Query Client Not Installed!!')
  return client
}