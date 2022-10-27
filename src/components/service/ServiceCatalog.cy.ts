import { mount } from 'cypress/vue'
import ServiceCatalog from './ServiceCatalog.vue'

// Example component test for ServiceCatalog.vue
// Utilizes Cypress Component Test Runner <https://docs.cypress.io/guides/component-testing/introduction>

describe('ServiceCatalog', () => {
  it('shows a search input and CTA button', () => {
    mount(ServiceCatalog)

    cy.get('.search-input > input').should('be.visible').invoke('attr', 'placeholder').should('eq', 'Search')
    cy.get('.cta-button').should('be.visible').click()

    cy.on('window:alert', (text) => {
      expect(text).to.contains('Roses are #ff0000, violets are #0000ff')
    })
  })
})
