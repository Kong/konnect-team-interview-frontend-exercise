import { mount } from 'cypress/vue'
import ServiceCatalog from './ServiceCatalog.vue'

// Example component test for ServiceCatalog.vue
// Utilizes Cypress Component Test Runner <https://docs.cypress.io/guides/component-testing/introduction>

describe('ServiceCatalog', () => {
  it('shows a search input', () => {
    mount(ServiceCatalog)

    cy.get('.search-input').should('be.visible').invoke('attr', 'placeholder').should('eq', 'Search services')
  })
})
