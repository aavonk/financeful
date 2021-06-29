import { MoneyUtils } from '@Shared/utils/MoneyUtils';

describe('MoneyUtils static methods', () => {
  it('Converts a number to a float', () => {
    expect(MoneyUtils.convertToFloat(1000)).toBe(10);
    expect(MoneyUtils.convertToFloat(1234)).toBe(12.34);
    expect(MoneyUtils.convertToFloat(12000045)).toBe(120000.45);
    expect(MoneyUtils.convertToFloat(1234)).toBe(12.34);
    expect(MoneyUtils.convertToFloat(4536910)).toBe(45369.1);
  });

  it('formats a number into a string representing currency (e.g. $100.00)', () => {
    expect(MoneyUtils.formatCurrency(1000)).toBe('$1,000.00');
    expect(MoneyUtils.formatCurrency(1000.42)).toBe('$1,000.42');
    expect(MoneyUtils.formatCurrency(1)).toBe('$1.00');
  });
});
