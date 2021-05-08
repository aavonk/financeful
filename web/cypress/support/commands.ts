// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { gql } from '@apollo/client';

const LOCAL_STORAGE = {};

Cypress.Commands.add('saveLocalStorage', () => {
  Cypress.log({
    message: 'Grabbing local storage and saving to variable.',
    displayName: 'SaveLocalStorage',
  });
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE[key] = localStorage[key];
  });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  Cypress.log({
    message: 'Grabbing local storage variable and setting.',
    displayName: 'SettingLocalStorage',
  });

  Object.keys(LOCAL_STORAGE).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE[key]);
  });
});

const EMAIL = Cypress.env('email');
const PASSWORD = Cypress.env('password');
const API_ENDPOINT = Cypress.env('api');

Cypress.Commands.add('login', () => {
  cy.visit('/login');
  cy.get('[data-testid="email-input"]').type(EMAIL);
  cy.get('[data-testid="password-input"]').type(PASSWORD);
  cy.get('[data-testid="login-submit"]').click();
});

const login = `
  mutation Login {
    login(email: "${EMAIL}", password: "${PASSWORD}"){
      token
    }
  }
`;

Cypress.Commands.add('getAndSetToken', () => {
  Cypress.log({
    message: 'Requests token and sets in local storage',
    displayName: 'GetToken',
  });

  cy.request({
    url: API_ENDPOINT,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      query: login,
    },
    failOnStatusCode: false,
  }).then((response) => {
    const { token } = response.body.data.login;
    localStorage.setItem('token', token);
  });
});
