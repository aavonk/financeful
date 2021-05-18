const navigateToAccountPage = (accountName: string) => {
  cy.visit('/my-wallet');
  cy.get('[data-testid="account-item"]').contains(accountName).click();
};

describe('My Wallet Page routes to correct Account', () => {
  beforeEach(() => {
    cy.getAndSetToken();
  });

  afterEach(() => {
    cy.restoreLocalStorage();
  });

  it('Displays the correct account name in the header', () => {
    navigateToAccountPage('Primary Checking');
    cy.contains('Primary Checking').should('be.visible');
  });
});

describe('Empty data / empty views', () => {
  beforeEach(() => {
    cy.getAndSetToken();
  });

  afterEach(() => {
    cy.restoreLocalStorage();
  });

  it('Shows empty states for graph and transactions', () => {
    navigateToAccountPage('Credit Card');
    cy.get('[data-testid="account-history-chart-empty"]').should('be.visible');
    cy.get('[data-testid="empty-transactions"]').should('be.visible');
  });

  it('Shows the insight pills in correct format', () => {
    cy.get('[data-testid="insight-pill-0"]').should('contain.text', '$0.00');
    cy.get('[data-testid="insight-pill-1"]').should('contain.text', '$0.00');
    cy.get('[data-testid="insight-pill-2"]').should('contain.text', '$0.00');
  });
});
