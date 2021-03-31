import { render, fireEvent, waitFor } from '@testing-library/react';

import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import TransactionForm from './index';
import ThemeProvider from '@Context/theme';
import { AlertProvider } from '@Context/alert/alertContext';
import { FetchAccountsAndCategoriesDocument } from '@Generated/graphql';
import { GraphQLError } from 'graphql';
import MockDate from 'mockdate';

beforeEach(() => {
  MockDate.set('3/26/2021');
});

afterEach(() => {
  MockDate.reset();
});

const ACCOUNTS = [
  {
    id: 'ckmje3etuxcds31n1',
    accountName: 'Primary Savings',
  },
  {
    id: 'cknoqsg60fkdk4',
    accountName: 'Credit Card',
  },
  {
    id: 'ckmje312fdd7n',
    accountName: 'Primary Checking',
  },
];

const CATEGORIES = [
  {
    id: 'ckmje3eua0021noqs7iws41ey',
    name: 'Groceries',
  },
  {
    id: 'ckmje3eul0028noqs2poilsqu',
    name: 'Drinks & Snacks',
  },
  {
    id: 'ckmje3eus0035noqsw5noq0rh',
    name: 'Rent',
  },
];

const setup = (mocks: MockedResponse[] | []) => {
  const utils = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ThemeProvider>
        <AlertProvider>
          <TransactionForm />
        </AlertProvider>
      </ThemeProvider>
    </MockedProvider>,
  );

  const openButton = utils.getByRole('button', {
    name: /new transaction/i,
  });

  return {
    openButton,
    ...utils,
  };
};

describe('The new transaction modal', () => {
  it('Shows the button without error', () => {
    const { openButton } = setup([]);

    expect(openButton).toBeInTheDocument();
  });

  it('Should open when the button is clicked', async () => {
    const { findByText, openButton } = setup([]);

    fireEvent.click(openButton);

    // The modal title
    expect(await findByText(/add transaction/i)).toBeVisible();
  });
});

describe('The possible states while fetching accounts & categories', () => {
  const fetchMock: MockedResponse = {
    request: {
      query: FetchAccountsAndCategoriesDocument,
    },
    result: {
      data: {
        getAccounts: ACCOUNTS,
        getCategories: CATEGORIES,
      },
    },
  };
  it('Should show the loading state when fetching accounts/categories', async () => {
    const { getByLabelText, openButton } = setup([fetchMock]);
    fireEvent.click(openButton);
    expect(getByLabelText(/loading/i)).toBeInTheDocument();
  });

  it('Should render the results from the request', async () => {
    const { openButton, getByText } = setup([fetchMock]);

    fireEvent.click(openButton);

    await waitFor(() => {
      expect(getByText(ACCOUNTS[0].accountName)).toBeInTheDocument();
      expect(getByText(ACCOUNTS[1].accountName)).toBeInTheDocument();
      expect(getByText(ACCOUNTS[2].accountName)).toBeInTheDocument();
      expect(getByText(CATEGORIES[0].name)).toBeInTheDocument();
      expect(getByText(CATEGORIES[1].name)).toBeInTheDocument();
      expect(getByText(CATEGORIES[2].name)).toBeInTheDocument();
    });
  });

  it('Should render Error UI When there is a GraphQL Error', async () => {
    const errorMock: MockedResponse = {
      request: {
        query: FetchAccountsAndCategoriesDocument,
      },
      error: new GraphQLError('Uh oh! An error occurred'),
    };

    const { getByText, openButton } = setup([errorMock]);

    fireEvent.click(openButton);

    await waitFor(() => {
      expect(
        getByText(/we ran into trouble loading your accounts/i),
      ).toBeInTheDocument();
    });
  });

  it('Should render the error UI when there is a Network Error', async () => {
    const errorMock: MockedResponse = {
      request: {
        query: FetchAccountsAndCategoriesDocument,
      },
      error: new Error('This is an error 😈'),
    };

    const { openButton, getByText } = setup([errorMock]);

    fireEvent.click(openButton);

    await waitFor(() => {
      expect(
        getByText(/we ran into trouble loading your accounts/i),
      ).toBeInTheDocument();
    });
  });
});

// describe('Add Transaction Mutation', () => {
//   const newTransaction: TransactionInput = {
//     payee: 'payee',
//     date: new Date(),
//     amount: 1212,
//     description: 'hey',
//     categoryId: CATEGORIES[0].id,
//     type: 'EXPENSE',
//     accountId: ACCOUNTS[0].id,
//   };

//   const returnedTransaction: Transaction = {
//     id: 'asdfasdfasfdasfd',
//     userId: 'asdfsdf234sdf',
//     payee: newTransaction.payee,
//     description: newTransaction.description,
//     amount: newTransaction.amount,
//     category: {
//       id: CATEGORIES[0].id,
//       name: CATEGORIES[0].name,
//     },
//     type: newTransaction.type,
//     date: '2021-03-26T05:00:00.000Z',
//     accountId: ACCOUNTS[0].id,
//     account: {
//       accountName: ACCOUNTS[0].accountName,
//       id: ACCOUNTS[0].id,
//     },
//     isCashIn: false,
//     isCashOut: true,
//     isUncategorized: true,
//   };

//   const fetchMock: MockedResponse = {
//     request: {
//       query: FetchAccountsAndCategoriesDocument,
//     },
//     result: {
//       data: {
//         getAccounts: ACCOUNTS,
//         getCategories: CATEGORIES,
//       },
//     },
//   };
//   const mutationMock: MockedResponse = {
//     request: {
//       query: AddTransactionDocument,
//       variables: { input: newTransaction },
//     },
//     result: {
//       data: {
//         createTransaction: returnedTransaction,
//       },
//     },
//   };

//   it('Successfully adds a transaction on submit', async () => {
//     const { getByText, openButton, getByRole, getByLabelText } = setup([
//       fetchMock,
//       mutationMock,
//     ]);

//     fireEvent.click(openButton);

//     await waitFor(() => {
//       expect(getByText(ACCOUNTS[0].accountName)).toBeInTheDocument();
//     });

//     // Accounts and categories query has returned - fill out form

//     const accountSelect = getByLabelText(/Account/);
//     const transactionTypeSelect = getByLabelText(/Type/);
//     const amountInput = getByLabelText(/Amount/);
//     const payeeInput = getByLabelText(/Payee/);
//     const descriptionInput = getByLabelText(/Description/);
//     const categorySelect = getByLabelText(/Category/);

//     userEvent.selectOptions(accountSelect, ACCOUNTS[0].id);
//     userEvent.selectOptions(transactionTypeSelect, newTransaction.type);
//     userEvent.selectOptions(categorySelect, CATEGORIES[0].id);

//     fireEvent.change(payeeInput, {
//       target: { value: newTransaction.payee },
//     });
//     fireEvent.change(descriptionInput, {
//       target: { value: newTransaction.description },
//     });

//     fireEvent.change(amountInput, {
//       target: { value: '12.12' },
//     });

//     screen.debug();
//     const submitButton = getByRole('button', { name: /save/i });
//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       expect(
//         getByRole('alert', { name: /Transaction successfully added/i }),
//       ).toBeInTheDocument();
//     });
//   });
// });
