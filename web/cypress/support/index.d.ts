/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace Cypress {
  interface Chainable<Subject> {
    getAndSetToken(): Chainable<any>;
    login(): Chainable<any>;
    saveLocalStorage(): Chainable<any>;
    restoreLocalStorage(): Chainable<any>;
  }
}
