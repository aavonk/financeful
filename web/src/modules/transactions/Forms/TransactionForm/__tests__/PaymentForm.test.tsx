import { ReactElement } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Category, Account, TransactionInput } from '@Generated/graphql';
import AppThemeProvider from '@Context/theme';
import PaymentForm from '../PaymentForm';
import userEvent from '@testing-library/user-event';
import MockDate from 'mockdate';
beforeEach(() => {
  MockDate.set('3/26/2021');
});

afterEach(() => {
  MockDate.reset();
});

const onFormSubmit = jest.fn();

const CATEGORIES: Category[] = [
  {
    id: 'asdfkj123kja',
    name: 'Category 1',
  },
  {
    id: 'asdfkjmmm23kja',
    name: 'Category 2',
  },
];

const ACCOUNTS: Account[] = [
  {
    id: 'sdfsd12213sads',
    accountName: 'Personal Checking',
  },
  {
    id: 'sdfsd12zzz3sads',
    accountName: 'Personal Savings',
  },
];

const customRender = (ui: ReactElement) =>
  render(<AppThemeProvider>{ui}</AppThemeProvider>);

const setup = () => {
  const utils = customRender(
    <PaymentForm
      onFormSubmit={onFormSubmit}
      categories={CATEGORIES}
      accounts={ACCOUNTS}
      isSubmitting={false}
    />,
  );

  const accountSelect = utils.getByLabelText(/Account/);
  const categorySelect = utils.getByLabelText(/Category/);
  const transactionTypeSelect = utils.getByLabelText(/Type/);
  const amountInput = utils.getByLabelText(/Amount/);
  const payeeInput = utils.getByLabelText(/Payee/);
  const descriptionInput = utils.getByLabelText(/Description/);
  const submitButton = utils.getByRole('button', { name: /save/i });
  return {
    accountSelect,
    transactionTypeSelect,
    categorySelect,
    amountInput,
    payeeInput,
    descriptionInput,
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

  test('Incorrect amount format shows error', async () => {
    const { amountInput, submitButton, findByText } = setup();

    fireEvent.change(amountInput, { target: { value: '1200.000' } });
    fireEvent.click(submitButton);

    expect(await findByText('Must be in $1,000.00 format')).toBeVisible();
  });
});

describe('The form displays the account and categories props', () => {
  test('Accounts are displayed', () => {
    const { getAllByTestId } = setup();

    const accountOptions = getAllByTestId('acct-option');

    expect(accountOptions).toHaveLength(ACCOUNTS.length);
  });

  test('Categories are displayed', () => {
    const { getAllByTestId } = setup();

    const categoryOptions = getAllByTestId('category-option');

    expect(categoryOptions).toHaveLength(CATEGORIES.length);
  });
});

describe('Submit the form', () => {
  test('The form submits with expected values', async () => {
    const {
      accountSelect,
      transactionTypeSelect,
      amountInput,
      submitButton,
      categorySelect,
      payeeInput,
      descriptionInput,
    } = setup();

    userEvent.selectOptions(accountSelect, ACCOUNTS[0].id);
    userEvent.selectOptions(transactionTypeSelect, 'EXPENSE');

    fireEvent.change(transactionTypeSelect, {
      target: { value: 'EXPENSE' },
    });

    fireEvent.change(payeeInput, {
      target: { value: 'Some payee' },
    });
    fireEvent.change(descriptionInput, {
      target: { value: 'Some description' },
    });

    userEvent.selectOptions(categorySelect, CATEGORIES[0].id);

    fireEvent.change(amountInput, {
      target: { value: '100.00' },
    });

    fireEvent.click(submitButton);

    const expectedResult: TransactionInput = {
      date: new Date(),
      payee: 'Some payee',
      description: 'Some description',
      accountId: ACCOUNTS[0].id,
      categoryId: CATEGORIES[0].id,
      type: 'EXPENSE',
      amount: 10000,
    };
    await waitFor(() => {
      expect(onFormSubmit).toHaveBeenCalledWith(expectedResult);
    });
  });
});
