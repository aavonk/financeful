import MockDate from 'mockdate';
import { Context, MockContext, createMockContext } from '../../../testSetup';
import { AggregateAccountData } from '@Modules/BankAccounts/repos/implementations/aggregateAccountData';
import { AssetsAndLiabilitesResponse } from '@Modules/BankAccounts/types/accountData.types';
import { accounts } from '../../__mocks__/fixtures';
let repo: AggregateAccountData;
let mock: MockContext;
let ctx: Context;

beforeEach(() => {
  mock = createMockContext();
  ctx = (mock as unknown) as Context;
  repo = new AggregateAccountData(ctx.prisma);
});

const getAccount = (index: number) => {
  return accounts[index];
};

describe('getAssetsAndLiabilites', () => {
  it('Gets and formats assets & liabilities correctly', async () => {
    const account = getAccount(0);
    mock.prisma.account.findMany.mockResolvedValue(accounts);

    await expect(repo.getAssetsAndLiabilites(account.userId)).resolves.toEqual({
      aggregateBalance: 9654,
      assets: {
        amount: 9854,
      },
      liabilites: {
        amount: 200,
        percentOfAssets: 2,
      },
    });
  });

  it('Handles NaN and Infinite values correctly', async () => {
    // In JS dividing 0 by 0 return NaN
    const asset = accounts.filter((a: any) => a.isAsset && !a.isLiability)[0];
    const liability = accounts.filter(
      (b: any) => b.isLiability && !b.isAsset,
    )[0];

    const account1 = { ...asset, balance: 0 };
    const account2 = { ...liability, balance: 0 };
    const result = [{ ...account1 }, { ...account2 }];

    mock.prisma.account.findMany.mockResolvedValue(result);

    const expectedResult: AssetsAndLiabilitesResponse = {
      aggregateBalance: 0,
      assets: {
        amount: 0,
      },
      liabilites: {
        amount: 0,
        percentOfAssets: 0,
      },
    };
    await expect(repo.getAssetsAndLiabilites(account1.userId)).resolves.toEqual(
      expectedResult,
    );
  });
});

describe('getAggregatedDailyBalances', () => {
  it('Returns an empty array if no balances are found/exist', async () => {
    const account = getAccount(0);
    //@ts-ignore
    mock.prisma.dailyBalances.groupBy.mockResolvedValue([]);

    MockDate.set('5/20/2021');
    const startDate = new Date();

    MockDate.set('5/22/2021');
    const endDate = new Date();

    await expect(
      repo.getAggregatedDailyBalances(account.userId, { startDate, endDate }),
    ).resolves.toEqual([]);
  });

  it('Returns the formatted daily balances', async () => {
    MockDate.set('5/20/2021');
    const startDate = new Date();

    MockDate.set('5/22/2021');
    const endDate = new Date();

    const resolvedMock = [
      {
        date: startDate,
        _sum: { amount: 20000 },
      },
      {
        date: endDate,
        _sum: { amount: 25000 },
      },
    ];

    //@ts-ignore
    mock.prisma.dailyBalances.groupBy.mockResolvedValue(resolvedMock);

    await expect(
      repo.getAggregatedDailyBalances('userId', { startDate, endDate }),
    ).resolves.toEqual([
      {
        date: '5/20/2021',
        balance: 200,
      },
      {
        date: '5/22/2021',
        balance: 250,
      },
    ]);
  });
});
