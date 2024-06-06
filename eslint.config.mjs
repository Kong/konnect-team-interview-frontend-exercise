import eslintKongUiConfig from '@kong/eslint-config-kong-ui'
import eslintKongUiConfigCypress from '@kong/eslint-config-kong-ui/cypress'

export default [
  ...eslintKongUiConfig,
  ...eslintKongUiConfigCypress.map(config => ({
    ...config,
    files: [
      '**/cypress/**',
      '**/*.cy.{js,ts,jsx,tsx}',
    ],
  })),
]
