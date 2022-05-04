import { AxiosInstance } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import mockUsers from '@/fixtures/mockUsers.json'

// https://github.com/ctimmerm/axios-mock-adapter

export default function useMockApi(axios: AxiosInstance, fixtures: (mock: MockAdapter) => void = () => ({})): MockAdapter {
  const mock: MockAdapter = new MockAdapter(axios, { delayResponse: 1000 })

  // apply any external mock fixtures
  fixtures(mock)

  /**
   * ======================================
   * Appends mock endpoints in this closure
   * ======================================
   */

  // Matches any request to /api/v1/users
  mock.onGet(/api\/v1\/users$/).reply(() => {
    // For now, always log so it's clear a mocked endpoint is being used.
    console.info('Returning mocked data', mockUsers)

    return [200, mockUsers]
  })

  /**
   * ======================================
   * End of mocks
   * ======================================
   */

  mock.onAny().passThrough()

  return mock
}
