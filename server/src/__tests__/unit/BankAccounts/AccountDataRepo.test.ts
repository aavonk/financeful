import { AccountDataRepo } from '@Modules/BankAccounts/repos/implementations/accountDataRepo';
import { GetBalanceParams } from '@Modules/BankAccounts/types/accountData.types';
import { Context, MockContext, createMockContext } from '../../../testSetup';
import MockDate from 'mockdate';

let repo: AccountDataRepo;
let ctx: Context;
let mockCtx: MockContext;
const accountId = 'accountId';
const userId = 'userId';

describe('AccountDataRepo implements db calls correctly', () => {
  beforeEach(() => {
    mockCtx = createMockContext();
    ctx = (mockCtx as unknown) as Context;

    repo = new AccountDataRepo(ctx.prisma);
  });

  it('Fetches daily balances given a date range', async () => {
    MockDate.set('5/18/2021');
    const startDate = new Date();

    MockDate.set('6/21/2021');
    const endDate = new Date();

    const balances = [
      {
        id: '123',
        userId,
        amount: 30,
        date: startDate,
        accountId,
      },
      {
        id: '456',
        userId,
        amount: 30000,
        date: endDate,
        accountId,
      },
    ];

    const params: GetBalanceParams = {
      startDate,
      endDate,
      accountId: accountId,
    };

    mockCtx.prisma.dailyBalances.findMany.mockResolvedValue(balances);
    await expect(repo.getBalances(params, userId)).resolves.toEqual([
      {
        id: '123',
        userId,
        amount: 30,
        accountId,
        date: '5/18/2021',
        balance: 0.3,
      },
      {
        id: '456',
        userId,
        amount: 30000,
        accountId,
        date: '6/21/2021',
        balance: 300,
      },
    ]);
  });

  it('Returns an empty array when none are found', async () => {
    const date = new Date();

    const params: GetBalanceParams = {
      startDate: date,
      endDate: date,
      accountId,
    };

    mockCtx.prisma.dailyBalances.findMany.mockResolvedValue([]);

    await expect(repo.getBalances(params, userId)).resolves.toEqual([]);
  });
});
