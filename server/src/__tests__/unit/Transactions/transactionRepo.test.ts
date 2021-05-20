import { MockContext, Context, createMockContext } from '../../../testSetup';
import { TransactionRepo } from '@Modules/Transactions/repos/implementations/transactionRepo';
import { MOCK_TRANSACTIONS } from '../../__mocks__/fixtures';
import { TransactionInput } from '@Modules/Transactions/types/transaction.types';
import { DateUtils } from '@Shared/utils/DateUtils';
import { Transaction } from '@Shared/types';
let ctx: Context;
let mock: MockContext;
let repo: TransactionRepo;

beforeEach(() => {
  mock = createMockContext();
  ctx = (mock as unknown) as Context;
  repo = new TransactionRepo(ctx.prisma);
});

const getOneTransaction = () => {
  return MOCK_TRANSACTIONS[0];
};

const getDates = (transactions?: Transaction[]) => {
  if (transactions) {
    return transactions.map((a) => a.date);
  }
  return MOCK_TRANSACTIONS.map((a) => a.date);
};

const getMaxDates = (dates: Date[]) => {
  return DateUtils.max(dates);
};

const getMinDates = (dates: Date[]) => {
  return DateUtils.min(dates);
};

const getRange = (dates: Date[]) => {
  return {
    startDate: getMinDates(dates),
    endDate: getMaxDates(dates),
  };
};

test('getRangeForOneAccount', async () => {
  const accountId = getOneTransaction().accountId;
  const userId = getOneTransaction().userId;
  const transactions = MOCK_TRANSACTIONS.filter(
    (a) => a.accountId === accountId,
  );
  const dates = getDates(transactions);
  const minDate = getMinDates(dates);
  const maxDate = getMaxDates(dates);

  const result = transactions.filter(
    (item) => item.date >= minDate && item.date <= maxDate,
  );

  //@ts-ignore
  mock.prisma.transaction.findMany.mockResolvedValue(result);
  const range = { startDate: minDate, endDate: maxDate };
  await expect(
    repo.getRangeForOneAccount(range, accountId!, userId!),
  ).resolves.toEqual(result);
});

test('getRangeForAllAccounts', async () => {
  const dates = getDates();
  const range = getRange(dates);

  //@ts-ignore
  mock.prisma.transaction.findMany.mockResolvedValue(MOCK_TRANSACTIONS);

  await expect(repo.getRangeForAllAccounts(range, 'abc')).resolves.toEqual(
    MOCK_TRANSACTIONS,
  );
});

test('findMany', async () => {
  //@ts-ignore
  mock.prisma.transaction.findMany.mockResolvedValue(MOCK_TRANSACTIONS);
  await expect(repo.findMany('userId')).resolves.toEqual(MOCK_TRANSACTIONS);
});

test('findOne', async () => {
  const transaction = getOneTransaction();
  //@ts-ignore
  mock.prisma.transaction.findUnique.mockResolvedValue(transaction);
  await expect(repo.findOne('userId')).resolves.toEqual(transaction);
});

test('createOne', async () => {
  const transaction = getOneTransaction();

  const input: TransactionInput = {
    accountId: transaction.accountId!,
    amount: transaction.amount,
    date: transaction.date,
    description: transaction.description || undefined,
    payee: transaction.payee,
    type: transaction.type,
  };

  //@ts-ignore
  mock.prisma.transaction.create.mockResolvedValue(transaction);

  await expect(repo.createOne(input, transaction.userId)).resolves.toEqual(
    transaction,
  );
});

test('DeleteOne', async () => {
  const transaction = getOneTransaction();
  //@ts-ignore
  mock.prisma.transaction.delete.mockResolvedValue(transaction);

  await expect(repo.deleteOne(transaction.id)).resolves.toEqual(transaction);
});
