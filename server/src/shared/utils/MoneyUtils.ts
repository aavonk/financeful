export class MoneyUtils {
  public static convertToFloat(amount: number): number {
    return Number((amount / 100).toFixed(2));
  }
}
