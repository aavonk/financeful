export const isValidCurrencyFormat = (input: string) => {
  const testCase = Number(input.replace(/,/g, ''));
  const format = /^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?\.\d{1,2}$/gm;

  if (isNaN(testCase)) {
    return false;
  }

  if (!format.test(input)) {
    return false;
  }

  return true;
};

export const formatTransactionType = (type: string) => {
  // console.log(type);
  const expense = 'EXPENSE';
  const income = 'INCOME';
  if (type === expense || type === income) {
    return type.charAt(0) + type.slice(1).toLowerCase();
  }
};

export const formatMoneyFromCentsToDollars = (
  cents: number,
  withDollarSign = true,
) => {
  const dollars = cents / 100;
  const originalString = dollars.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  if (withDollarSign) {
    return originalString;
  }

  return originalString.slice(1);
};

export const convertInputAmountToCents = (amount: string) => {
  return parseFloat(amount.replace(/,/g, '')) * 100;
};
