import { mount } from 'cypress/vue'
import ServiceDetails from './ServiceDetails.vue'

describe('ServiceDetails', () => {
  it('shows service details component', () => {
    mount(ServiceDetails, {
      props: {
        service: {
          id: 'abc',
          name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Title end.',
          description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Description end.',
          type: 'REST',
          published: false,
          configured: false,
          versions: [],
        },
      },
    })

    cy.get('.status').should('contain.text', 'In Progress')
    cy.get('h3').should('contain.text', 'Title end.')
    cy.get('.service-description').should('contain.text', 'Description end.')
    cy.get('.runtime-not-configured').should('be.visible').should('contain.text', 'Not configured with runtime yet')
  })
})
