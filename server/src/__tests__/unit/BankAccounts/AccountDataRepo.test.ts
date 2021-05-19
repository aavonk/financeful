import { AccountDataRepo } from '@Modules/BankAccounts/repos/implementations/accountDataRepo';
import { GetBalanceParams } from '@Modules/BankAccounts/types/accountData.types';
import { prismaMock } from '../../../testSetup';
import MockDate from 'mockdate';

let repo: AccountDataRepo;

describe('AccountDataRepo implements db calls correctly', () => {
  beforeEach(() => {
    //@ts-ignore
    repo = new AccountDataRepo(prismaMock);
  });
  test(' Fetches correct balances', async () => {
    MockDate.set('5/18/2021');
    const testDate = new Date();
    const accountId = 'accountId';
    const userId = 'userId';
    const balances = [
      {
        id: '123',
        userId,
        amount: 30,
        date: testDate,
        accountId,
      },
    ];

    const params: GetBalanceParams = {
      startDate: testDate,
      endDate: testDate,
      accountId: accountId,
    };

    prismaMock.dailyBalances.findMany.mockResolvedValue(balances);
    await expect(repo.getBalances(params, userId)).resolves.toEqual([
      {
        id: '123',
        userId,
        amount: 30,
        accountId,
        date: '5/18/2021',
        balance: 0.3,
      },
    ]);
  });
});
