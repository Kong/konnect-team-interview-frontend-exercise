import { mount } from 'cypress/vue'
import RoundPill from './RoundPill.vue'

describe('RoundPill', () => {
  it('shows pill component of appropriate color', () => {
    mount(RoundPill, { slots: { default: () => 'Pill Label' }, props: { sentiment: 'danger' } })

    cy.get('.pill').should('have.text', 'Pill Label').should('have.css', 'background-color').and('eq', 'rgb(254, 226, 226)')
  })
})
