describe('Networth chart date range filter', () => {
  beforeEach(() => {
    cy.getAndSetToken();
    cy.visit('/my-wallet');
  });

  afterEach(() => {
    cy.restoreLocalStorage();
  });

  it('defaults to 90 days', () => {
    cy.get('[data-testid="date-range-button"]').should('contain', '90 days');
  });

  it('Displays the empty message when theres not enough data', () => {
    cy.get('[data-testid="date-range-button"]').click();
    cy.get('[data-valuetext="Last year"]').click();

    cy.get('[data-testid="networth-chart-empty"]').should('contain', 'Woah there');
  });
});

describe('Account list functionality', () => {
  beforeEach(() => {
    cy.getAndSetToken();
    cy.visit('/my-wallet');
  });

  afterEach(() => {
    cy.restoreLocalStorage();
  });

  it('Lets user create an account', () => {
    cy.get('[data-testid="add-account-button"]').click();
    cy.get('[data-testid="account-name-input"]').type('Test Account!');
    cy.get('[data-testid="bank-name-input"]').type('Bank of Aaron');
    cy.get('[data-testid="add-new-button"]').click();
    cy.get('[data-testid="account-type-input"]').type('Primary Investment Account');
    cy.get('[data-testid="starting-balance-input"]').type('5,000.00');
    cy.get('[data-testid="classification-select"]').select('Asset');
    cy.get('[data-testid="submit-account-button"]').click();

    cy.wait(1000);
    cy.contains('[data-testid="toast-alert"]', 'Successfully').should('be.visible');
    cy.get('[data-testid="close-modal-button"]').click();
    cy.contains('My Wallet').should('be.visible');
    cy.get('[data-testid="account-item"]').first().should('contain', 'Test Account!');
  });

  it('Lets user edit an account', () => {
    cy.get('[data-testid="account-action-menu"]').first().click();
    cy.get('div').contains('Edit details').click();
    cy.get('[data-testid="edit-account-name-input"]').clear().type('Awesome Account');

    cy.get('button').contains('Save').click();

    cy.contains('[data-testid="toast-alert"]', 'Successfully updated account').should(
      'be.visible',
    );

    cy.get('[data-testid="account-item"]').first().should('contain', 'Awesome Account');
  });

  it('Lets a user mark an account inactive', () => {
    cy.get('[data-testid="account-action-menu"]').first().click();
    cy.get('div').contains('Mark inactive').click();
    //confirmation dialog
    cy.contains('Are you sure?').should('be.visible');
    cy.get('[data-testid="confirmation-danger"]').click();

    // Rather than see if the style (color) of the element has changed,
    // Click the Account Actions button again, and what read "Mark inactive" should now read
    // "Mark active"
    cy.get('[data-testid="account-action-menu"]').first().click();
    cy.get('div').contains('Mark active').should('be.visible');
  });

  it('Lets user delete an account', () => {
    cy.get('[data-testid="account-action-menu"]').first().click();
    cy.get('div').contains('Delete account').click();

    //confirmation dialog
    cy.contains('Are you sure?').should('be.visible');
    cy.get('[data-testid="confirmation-danger"]').click();

    cy.contains('[data-testid="toast-alert"]', 'Account deleted').should('be.visible');
    cy.get('[data-testid="account-item"]')
      .first()
      .should('not.contain', 'Awesome Account');
  });

  it('Navigates to account page when account item is clicked', () => {
    cy.get('[data-testid="account-item"]').first().click();
    cy.location().should((location) => {
      expect(location.pathname).to.include('/account');
    });
  });
});
