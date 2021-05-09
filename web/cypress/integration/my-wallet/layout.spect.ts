describe('Wallet page is layed out correctly', () => {
  beforeEach(() => {
    cy.getAndSetToken();
  });

  afterEach(() => {
    cy.restoreLocalStorage();
  });

  it('Should render the layout', () => {
    cy.visit('/my-wallet');
    cy.get('[data-testid="networth-chart"]').should('be.visible');
    cy.get('[data-testid="account-list"]').should('be.visible');
    cy.get('[data-testid="balance-overview"]').should('be.visible');
  });
});
