import { isValidCurrencyFormat } from '@Lib/money-utils';

export const transferFormValidations = {
  amount: {
    required: {
      value: true,
      message: 'Please add an amount',
    },
    custom: {
      isValid: (value: string) => isValidCurrencyFormat(value),
      message: 'Must be in $1,000.00 format',
    },
  },
  fromAccount: {
    required: {
      value: true,
      message: 'This field is required',
    },
  },
  toAccount: {
    required: {
      value: true,
      message: 'This field is required',
    },
  },
};

export const paymentFormValidations = {
  date: {
    required: {
      value: true,
      message: 'Required',
    },
  },
  accountId: {
    required: {
      value: true,
      message: 'Which account?',
    },
  },
  type: {
    required: {
      value: true,
      message: 'Income or Expense?',
    },
  },
  payee: {
    required: {
      value: true,
      message: 'Please add a payee',
    },
  },
  amount: {
    required: {
      value: true,
      message: 'Please add an amount',
    },
    custom: {
      isValid: (value: string) => isValidCurrencyFormat(value),
      message: 'Must be in $1,000.00 format',
    },
  },
};
