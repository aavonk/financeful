/* eslint-disable @typescript-eslint/no-non-null-assertion */
// This test will render the Accounts section of the MyWalet page and test the
// UI updates, and network states.

import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import {
  getAccountsSuccess,
  getAccountsError,
  getAccountsGQLError,
  ACCOUNTS,
} from './__mocks__/queries';
import { AlertProvider } from '@Context/alert/alertContext';
import ThemeProvider from '@Context/theme';
import { ConfirmationProvider } from '@Context/confirmation/confirmationContext';
import AccountActionsController from '@Modules/wallet/AccountActionsController';

//TODO: Add tests for edit and delete mutations

const setup = (mocks: MockedResponse[]) => {
  const utils = render(
    <MockedProvider
      mocks={mocks}
      addTypename={true}
      defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' } }}
    >
      <ThemeProvider>
        <AlertProvider>
          <ConfirmationProvider>
            <AccountActionsController />
          </ConfirmationProvider>
        </AlertProvider>
      </ThemeProvider>
    </MockedProvider>,
  );

  return { ...utils };
};

describe('Different views based on the getAccounts query', () => {
  test('[Loading State] It shows the skeleton loader when fetching accounts', () => {
    const { getByLabelText } = setup([getAccountsSuccess]);

    expect(getByLabelText(/loading/i)).toBeInTheDocument();
  });

  test('[Success State] It fetches accounts and displays them', async () => {
    const { getByText } = setup([getAccountsSuccess]);

    await waitFor(() => {
      ACCOUNTS.forEach((account) => {
        expect(getByText(account.accountName!)).toBeInTheDocument();
      });
    });
  });

  test('[Network Error] It displays <AccountListError /> on error', async () => {
    const { getByText } = setup([getAccountsError]);

    await waitFor(() => {
      expect(getByText(/we ran into trouble/i)).toBeInTheDocument();
    });
  });

  test('[GraphQL Error] It displays <AccountListError /> on graphql error', async () => {
    const { getByText } = setup([getAccountsGQLError]);

    await waitFor(() => {
      expect(getByText(/we ran into trouble/i)).toBeInTheDocument();
    });
  });
});

describe('Choosing to edit an account', () => {
  test('The Edit form account is displayed with the selected account info', async () => {
    const { getByText, findAllByTestId, getByRole, getByLabelText } = setup([
      getAccountsSuccess,
    ]);

    await waitFor(() => {
      ACCOUNTS.forEach((account) => {
        expect(getByText(account.accountName!)).toBeInTheDocument();
      });
    });

    const actionButton = await findAllByTestId('account-action-button');
    userEvent.click(actionButton[0]);
    userEvent.click(getByRole('menuitem', { name: /edit details/i }));

    const account = ACCOUNTS[0];
    await waitFor(() => {
      expect(getByRole('dialog')).toBeVisible();
      expect(getByLabelText(/account name/i)).toHaveValue(account.accountName);
      expect(getByLabelText(/bank name/i)).toHaveValue(account.bankName);
      expect(getByLabelText(/type/i)).toHaveValue(account.accountType);
      expect(getByLabelText(/classification/i)).toHaveValue(
        account.isAsset ? 'asset' : 'liability',
      );
    });
  });
});
