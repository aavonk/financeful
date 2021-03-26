import { ReactElement } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Category, Account } from '@Generated/graphql';
import AppThemeProvider from '@Context/theme';
import Form from './Form';

const onFormSubmit = jest.fn();

const categories: Category[] = [
  {
    id: 'asdfkj123kja',
    name: 'Category 1',
  },
  {
    id: 'asdfkjmmm23kja',
    name: 'Category 2',
  },
];

const accounts: Account[] = [
  {
    id: 'sdfsd12213sads',
    accountName: 'Account 1',
  },
  {
    id: 'sdfsd12zzz3sads',
    accountName: 'Account 2',
  },
];

const customRender = (ui: ReactElement) =>
  render(<AppThemeProvider>{ui}</AppThemeProvider>);

const setup = () => {
  const utils = customRender(
    <Form
      onFormSubmit={onFormSubmit}
      categories={categories}
      accounts={accounts}
    />,
  );

  const accountSelect = utils.getByLabelText(/Account/);
  const transactionTypeSelect = utils.getByLabelText(/Type/);
  const amountInput = utils.getByLabelText(/Amount/);
  const submitButton = utils.getByRole('button', { name: /save/i });

  return {
    accountSelect,
    transactionTypeSelect,
    amountInput,
    submitButton,
    ...utils,
  };
};

describe('Form provides error messages', () => {
  test('It should show the error for each required field', async () => {
    const { findByText, submitButton } = setup();

    //Submit the form
    fireEvent.click(submitButton);

    expect(await findByText('Please add a payee')).toBeVisible();
    expect(await findByText('Which account?')).toBeVisible();
    expect(await findByText('Income or Expense?')).toBeVisible();
    expect(await findByText('Must be in $1,000.00 format')).toBeVisible();
  });

  test('Amount must be in the correct format', async () => {
    const { amountInput, submitButton, findByText } = setup();

    fireEvent.change(amountInput, { target: { value: '1200.000' } });
    fireEvent.click(submitButton);

    expect(await findByText('Must be in $1,000.00 format')).toBeVisible();
  });
});
