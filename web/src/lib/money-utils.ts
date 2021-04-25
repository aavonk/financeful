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

export const formatMoneyFromCentsToDollars = (cents: number, withDollarSign = true) => {
  const dollars = cents / 100;
  const originalString = dollars.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const isNegative = cents < 0;

  if (withDollarSign) {
    return originalString;
  }

  if (isNegative && !withDollarSign) {
    return originalString.slice(2);
  }

  return originalString.slice(1);
};

export const convertInputAmountToCents = (amount: string) => {
  return parseFloat(amount.replace(/,/g, '')) * 100;
};
