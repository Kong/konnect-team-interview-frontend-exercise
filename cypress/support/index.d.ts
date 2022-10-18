import { ComputedOptions } from 'vue'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * @description Custom alias command for cy.get() to select DOM element by data-testid attribute.
       * @param {string} dataTestId
       * @example cy.dataTestId('kong-auth-login-submit')
       */
      getTestId(dataTestId: string): Chainable<Element>

      /**
       * @description Custom alias command for cy.find() to select DOM element by data-testid attribute.
       * @param {string} dataTestId
       * @example cy.findTestId('kong-auth-login-submit')
       */
      findTestId(dataTestId: string): Chainable<Element>

      /**
       * Helper mount function for Vue Components
       * @param component Vue Component or JSX Element to mount
       * @param options Options passed to Vue Test Utils
       */
      mount(component: ComputedOptions, options?: any): Chainable<Element>
    }
  }
}
