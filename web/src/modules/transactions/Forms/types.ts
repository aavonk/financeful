export interface TransactionFields {
  date: Date;
  accountId: string;
  type: string;
  payee: string;
  description: string;
  amount: string;
  categoryId: string;
}

export interface TransferFormFields {
  amount: string;
  fromAccount: string;
  toAccount: string;
  description: string;
  categoryId: string;
}
