import { Transaction } from '../../shared/types';

// The sum of each transaction type from the transactions below
export const TRANSACTION_TOTALS = {
  income: 520600,
  expense: -356100,
  transfer: 0,
  incomeFloat: 5206,
  expenseFloat: 3561,
  transferFloat: 0,
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'ckooygs8s2461pgqs840bo6m5',
    userId: 'ckooygr520011pgqsvek5fv5d',
    payee: 'Amanda Osinski',
    description:
      'invoice transaction at Dickens - Botsford using card ending with ***2712 for NIO 358.77 in account ***14109409',
    amount: -43700,
    category: {
      id: 'ckooygr7v0153pgqs0hvjj93h',
      name: 'Utilities',
    },
    type: 'EXPENSE',
    date: new Date('2021-05-07T21:22:24.176Z'),
    accountId: 'ckooygr620044pgqs3xeknqjb',
    account: {
      accountName: 'Primary Savings',
      id: 'ckooygr620044pgqs3xeknqjb',
    },

    isCashIn: false,
    isCashOut: true,
    isUncategorized: false,
    isTransfer: false,
    transferId: null,
  },
  {
    id: 'ckooygsfg2923pgqsx70k5l26',
    payee: 'Shelly Monahan IV',
    userId: 'ckooygr520011pgqsvek5fv5d',
    description:
      'withdrawal transaction at Green, Dickens and Keeling using card ending with ***9477 for TTD 64.28 in account ***36067983',
    amount: 166900,
    category: {
      id: 'ckooygr8a0179pgqs2bqzo9de',
      name: 'Transfers',
    },
    type: 'INCOME',
    date: new Date('2021-05-07T10:14:11.804Z'),
    accountId: 'ckooygr5x0038pgqsj0rtw8wm',
    account: {
      accountName: 'Primary Checking',
      id: 'ckooygr5x0038pgqsj0rtw8wm',
    },
    isCashIn: true,
    isCashOut: false,
    isUncategorized: false,
    isTransfer: false,
    transferId: null,
  },
  {
    id: 'ckooygsdq2801pgqsju6lrnlt',
    userId: 'ckooygr520011pgqsvek5fv5d',
    payee: 'Gilberto Lubowitz',
    description:
      'withdrawal transaction at Stoltenberg - DuBuque using card ending with ***0845 for SHP 874.86 in account ***89366069',
    amount: -11200,
    category: {
      id: 'ckooygr8a0179pgqs2bqzo9de',
      name: 'Transfers',
    },
    type: 'EXPENSE',
    date: new Date('2021-05-05T00:54:49.082Z'),
    accountId: 'ckooygr620044pgqs3xeknqjb',
    account: {
      accountName: 'Primary Savings',
      id: 'ckooygr620044pgqs3xeknqjb',
    },
    isCashIn: false,
    isCashOut: true,
    isUncategorized: false,
    isTransfer: false,
    transferId: null,
  },
  {
    id: 'ckooygsa12548pgqs7625u0zt',
    userId: 'ckooygr520011pgqsvek5fv5d',
    payee: 'Jerald Batz',
    description:
      'payment transaction at Erdman Group using card ending with ***0455 for JPY 387.59 in account ***12681707',
    amount: -54900,
    category: {
      id: 'ckooygr7v0153pgqs0hvjj93h',
      name: 'Utilities',
    },
    type: 'EXPENSE',
    date: new Date('2021-05-03T23:54:51.943Z'),
    accountId: 'ckooygr620044pgqs3xeknqjb',
    account: {
      accountName: 'Primary Savings',
      id: 'ckooygr620044pgqs3xeknqjb',
    },
    isCashIn: false,
    isCashOut: true,
    isUncategorized: false,
    isTransfer: false,
    transferId: null,
  },
  {
    id: 'ckooygsaj2578pgqsbwqdkly5',
    userId: 'ckooygr520011pgqsvek5fv5d',
    payee: 'Preston Paucek',
    description:
      'payment transaction at Prosacco Inc using card ending with ***9197 for BWP 749.63 in account ***10900618',
    amount: -147900,
    category: {
      id: 'ckooygr8a0179pgqs2bqzo9de',
      name: 'Transfers',
    },
    type: 'EXPENSE',
    date: new Date('2021-05-02T18:31:52.813Z'),
    accountId: 'ckooygr5x0038pgqsj0rtw8wm',
    account: {
      accountName: 'Primary Checking',
      id: 'ckooygr5x0038pgqsj0rtw8wm',
    },
    isCashIn: false,
    isCashOut: true,
    isUncategorized: false,
    isTransfer: false,
    transferId: null,
  },
  {
    id: 'ckooygs8y2474pgqs7nahcw9q',
    userId: 'ckooygr520011pgqsvek5fv5d',
    payee: 'Jackie Crist',
    description:
      'invoice transaction at Wunsch - Kertzmann using card ending with ***3359 for SRD 658.23 in account ***59499498',
    amount: 63300,
    category: {
      id: 'ckooygr7n0139pgqswmhy4ums',
      name: 'Drinks & Snacks',
    },
    type: 'INCOME',
    date: new Date('2021-05-01T14:23:56.192Z'),
    accountId: 'ckooygr620044pgqs3xeknqjb',
    account: {
      accountName: 'Primary Savings',
      id: 'ckooygr620044pgqs3xeknqjb',
    },
    isCashIn: true,
    isCashOut: false,
    isUncategorized: false,
    isTransfer: false,
    transferId: null,
  },
  {
    id: 'ckooygsed2846pgqsvm3mo3ia',
    userId: 'ckooygr520011pgqsvek5fv5d',
    payee: 'Kimberly Connelly',
    description:
      'invoice transaction at Smitham, Robel and Gerlach using card ending with ***0984 for KYD 228.06 in account ***62118011',
    amount: 290400,
    category: {
      id: 'ckooygr860172pgqs9sy8yj2f',
      name: 'Electronics',
    },
    type: 'INCOME',
    date: new Date('2021-04-30T12:39:44.126Z'),
    accountId: 'ckooygr620044pgqs3xeknqjb',
    account: {
      accountName: 'Primary Savings',
      id: 'ckooygr620044pgqs3xeknqjb',
    },
    isCashIn: true,
    isCashOut: false,
    isUncategorized: false,
    isTransfer: false,
    transferId: null,
  },
  {
    id: 'ckooygs9r2529pgqsa5frgilt',
    userId: 'ckooygr520011pgqsvek5fv5d',
    payee: 'Mr. Adam McGlynn',
    description:
      'withdrawal transaction at Prohaska, Lind and Kassulke using card ending with ***4888 for ILS 579.20 in account ***42930496',
    amount: -98400,
    category: {
      id: 'ckooygr8h0192pgqs99eoc9ke',
      name: 'Paycheck',
    },
    type: 'EXPENSE',
    date: new Date('2021-04-29T05:47:30.384Z'),
    accountId: 'ckooygr5x0038pgqsj0rtw8wm',
    account: {
      accountName: 'Primary Checking',
      id: 'ckooygr5x0038pgqsj0rtw8wm',
    },
    isCashIn: false,
    isCashOut: true,
    isUncategorized: false,
    isTransfer: false,
    transferId: null,
  },
];
