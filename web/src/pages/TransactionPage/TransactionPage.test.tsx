import { render, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import TransactionPage from './index';
import ThemeProvider from '@Context/theme';
import { GetTransactionsDocument, Transaction } from '@Generated/graphql';
import { GraphQLError } from 'graphql';

const TRANSACTIONS: Transaction[] = [
  {
    id: '5',
    category: {
      id: 'asdfa',
      name: 'Category',
    },
    date: '2020-01-01T06:00:00.000Z',
    description: 'Good food',
    amount: 50000,
    payee: 'Some Restaurant',
    userId: '1000001',
    type: 'EXPENSE',
    accountId: 'asdfsdfsasdf',
  },
];

test('Renders the table loading state', async () => {
  const component = (
    <MockedProvider mocks={[]} addTypename={false}>
      <ThemeProvider>
        <TransactionPage />
      </ThemeProvider>
    </MockedProvider>
  );

  const { getByLabelText } = render(component);

  expect(getByLabelText(/loading transactions/i)).toBeInTheDocument();
});

test('Successfully fetches and displays transactions', async () => {
  const transactionsMock: MockedResponse = {
    request: {
      query: GetTransactionsDocument,
    },
    result: {
      data: {
        getTransactions: TRANSACTIONS,
      },
    },
  };
  const component = (
    <MockedProvider mocks={[transactionsMock]} addTypename={false}>
      <ThemeProvider>
        <TransactionPage />
      </ThemeProvider>
    </MockedProvider>
  );

  const { getByText } = render(component);

  waitFor(() => expect(getByText(/good food/i)).toBeInTheDocument());
});

test('Component catches GraphQlError error and displays error UI', async () => {
  const errorMock: MockedResponse = {
    request: {
      query: GetTransactionsDocument,
    },
    error: new GraphQLError('An error occurred'),
  };

  const component = (
    <MockedProvider mocks={[errorMock]} addTypename={false}>
      <ThemeProvider>
        <TransactionPage />
      </ThemeProvider>
    </MockedProvider>
  );
  const { getByText } = render(component);

  waitFor(() =>
    expect(
      getByText(/we ran into trouble loading transactions/i),
    ).toBeInTheDocument(),
  );
});

test('Component catches Network error and displays error UI', async () => {
  const errorMock: MockedResponse = {
    request: {
      query: GetTransactionsDocument,
    },
    error: new Error('An error occurred'),
  };

  const component = (
    <MockedProvider mocks={[errorMock]} addTypename={false}>
      <ThemeProvider>
        <TransactionPage />
      </ThemeProvider>
    </MockedProvider>
  );
  const { getByText } = render(component);

  waitFor(() =>
    expect(
      getByText(/we ran into trouble loading transactions/i),
    ).toBeInTheDocument(),
  );
});
