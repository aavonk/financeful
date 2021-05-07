describe('Wallet view renders', () => {
  beforeEach(() => {
    cy.visit('/my-wallet');
  });

  it('should render correctly', () => {
    cy.get('[data-testid="wallet"]').should('be.visible');
  });
});
