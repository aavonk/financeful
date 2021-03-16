import { Transaction } from '@Generated/graphql';
type Data = Array<Transaction>;

export const data: Data = [
  {
    id: 'asdf',
    userId: 123456,
    payee: 'Walmart',
    description: 'Got groceries',
    amount: 120000,
    category: 'Groceries',
    type: 'EXPENSE',
    date: new Date().toLocaleDateString(),
  },
  {
    id: 'asdssf',
    userId: 123456,
    payee: 'Store',
    description: 'Yay store',
    amount: 12000,
    category: 'Shopping',
    type: 'EXPENSE',
    date: new Date().toLocaleDateString(),
  },
  {
    id: 'asdfsd',
    userId: 123456,
    payee: 'Work',
    description: 'Paycheck',
    amount: 420000,
    category: 'Monthly Income',
    type: 'INCOME',
    date: new Date().toLocaleDateString(),
  },
  {
    id: 'asdf324sd',
    userId: 123456,
    payee: 'Circle C Vet',
    description: 'Vet Expenses',
    amount: 8900,
    category: 'Pets',
    type: 'INCOME',
    date: new Date().toLocaleDateString(),
  },
];
