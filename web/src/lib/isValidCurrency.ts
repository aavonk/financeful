export const isValidCurrencyFormat = (input: string) => {
  const testCase = Number(input.replace(/,/g, ''));
  const format = /^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?\.\d{1,2}$/gm;

  if (isNaN(testCase)) {
    return false;
  }

  if (!format.test(input)) {
    console.log({ input });
    return false;
  }
  console.log({ testCase });
  console.log({ input });
  return true;
};
