interface ConstructorProps {
  accountName: string;
  accountType: string;
  balance: number;
  classification: 'ASSET' | 'LIABILITY';
  bankName?: string;
}

export class BankAccount {
  protected name: string;
  protected type: string;
  protected balance: number;
  protected bank: string | undefined;
  protected classification: 'ASSET' | 'LIABILITY';

  constructor(properties: ConstructorProps) {
    this.name = properties.accountName;
    this.type = properties.accountType;
    this.balance = properties.balance;
    this.bank = properties.bankName;
    this.classification = properties.classification;
  }

  get accountName() {
    return this.name;
  }

  get accountType() {
    return this.type;
  }

  get startingBalance() {
    return this.balance;
  }

  get bankName() {
    return this.bank;
  }

  get isAsset() {
    return this.classification === 'ASSET';
  }

  get isLiability() {
    return this.classification === 'LIABILITY';
  }

  toValue() {
    return {
      accountName: this.accountName,
      accountType: this.accountType,
      balance: this.balance,
      bankName: this.bankName,
      isAsset: this.isAsset,
      isLiability: this.isLiability,
    };
  }
}
