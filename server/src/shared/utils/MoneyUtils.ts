export class MoneyUtils {
  public static convertToFloat(amount: number): number {
    return Number((amount / 100).toFixed(2));
  }
  /**
   * @name formatCurrency
   * @description
   * Returns a an amount formatted in US Currency
   *
   *
   * @param {Number} amount - the amount of minutes to be added. Must be a FLOAT.
   * @returns {String} the new date with the minutes added
   *
   * @example
   * const result = formatCurrency(1250.21)
   * //=> $1,250.21
   * const result = formatCurrency(1000)
   * //=> $1,000.00
   */
  public static formatCurrency(amount: number) {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }
}
