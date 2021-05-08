/// <reference types="../../support" />

describe('Use Cypress to log in', () => {
  context('Utilizing API Request', () => {
    before(() => cy.getAndSetToken());

    it('should validate login status', () => {
      cy.visit('/dashboard');
      cy.contains('Dashboard').should('be.visible');
    });
  });

  context('Utilizing Local Storage', () => {
    before(() => {
      cy.login();
      cy.saveLocalStorage();
    });

    it('should validate login status', () => {
      cy.restoreLocalStorage();
      // cy.visit('/dashboard', { timeout: 60000 });
      cy.contains('Dashboard').should('be.visible');
    });

    it('should not be logged in', () => {
      cy.visit('/dashboard', { timeout: 60000 });
      cy.contains('Dashboard').should('not.be.visible');
    });
  });
});
