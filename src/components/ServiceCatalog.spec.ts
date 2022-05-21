// Import types for custom commands
/// <reference types="../../cypress/support" />

import { mount } from '@cypress/vue'
import ServiceCatalog from './ServiceCatalog.vue'

// Example test for ServiceCatalog component
// Utilizes Cypress Component Test Runner

describe('ServiceCatalog', () => {
  it('shows a search input', () => {
    mount(ServiceCatalog)

    cy.get('.search-input').should('be.visible').invoke('attr', 'placeholder').should('eq', 'Search services')
  })
})
