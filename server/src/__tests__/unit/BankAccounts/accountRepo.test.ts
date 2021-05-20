import { Context, createMockContext, MockContext } from '../../../testSetup';
import { AccountRepo } from '@Modules/BankAccounts/repos/implementations/accountRepo';
import {
  CreateAccountInput,
  AccountClassification,
  EditAccountInput,
} from '@Modules/BankAccounts/types/account.types';
import { accounts } from '../../__mocks__/fixtures/accounts';

let accountRepo: AccountRepo;
let mock: MockContext;
let ctx: Context;

beforeEach(() => {
  mock = createMockContext();
  ctx = (mock as unknown) as Context;
  accountRepo = new AccountRepo(ctx.prisma);
});

const getAccount = () => {
  return accounts[0];
};

const userId = () => {
  return accounts[0].userId;
};

const getEditInput = (): EditAccountInput => ({
  accountName: 'My Account',
  accountType: 'Savings',
  classification: 'ASSET' as AccountClassification.asset,
});

describe('Returns accounts from the db', () => {
  it('Returns a single account', async () => {
    const account = getAccount();

    mock.prisma.account.findFirst.mockResolvedValue(account);
    await expect(
      accountRepo.getOneAccount(account.id, account.userId),
    ).resolves.toEqual(account);
  });

  it('Returns an array of accounts', async () => {
    mock.prisma.account.findMany.mockResolvedValue(accounts);
    await expect(accountRepo.getAccounts(userId())).resolves.toEqual(accounts);
  });
});

describe('Account mutations', () => {
  it('Successfully creates a bank account', async () => {
    const account = getAccount();

    const input: CreateAccountInput = {
      accountName: account.accountName,
      accountType: account.accountType,
      balance: account.balance,
      classification: account.isAsset
        ? ('ASSET' as AccountClassification.asset)
        : ('LIABILITY' as AccountClassification.liability),
      bankName: account.bankName,
    };

    mock.prisma.account.create.mockResolvedValue(account);

    await expect(
      accountRepo.createAccount(account.userId, input),
    ).resolves.toEqual(account);
  });

  it('Successfully edits an account', async () => {
    const input = getEditInput();
    const account = getAccount();

    const expectedResult = {
      ...account,
      ...input,
      bankName: 'Wells Fargo',
      isAsset: true,
      isLiability: false,
    };

    mock.prisma.account.findFirst.mockResolvedValue(account);
    mock.prisma.account.update.mockResolvedValue(expectedResult);
    const result = await accountRepo.editAccount(
      account.userId,
      account.id,
      input,
    );

    expect(result).toEqual(expectedResult);
  });

  it('Throws an error when trying to edit an unauthorized account', async () => {
    const account = getAccount();
    const input = getEditInput();

    // It first finds the account and then will check if the accounts
    // userId is equal to the one being passed in to the request
    mock.prisma.account.findFirst.mockResolvedValue(account);

    await expect(
      accountRepo.editAccount('userId', account.id, input),
    ).rejects.toThrow(new Error('Unauthorized'));
  });

  it('Toggles an account active/inactive status', async () => {
    const account = { ...getAccount(), isInactive: false };

    // Mock the find account call
    mock.prisma.account.findFirst.mockResolvedValue(account);
    mock.prisma.account.update.mockResolvedValue({
      ...account,
      isInactive: true,
    });

    await expect(
      accountRepo.toggleAccountActiveStatus(account.userId, account.id),
    ).resolves.toEqual({
      ...account,
      isInactive: true,
    });
  });

  it('Deletes an account', async () => {
    const account = getAccount();
    mock.prisma.account.findFirst.mockResolvedValue(account);

    // mock.prisma.user.update.mockResolvedValue()
    await expect(
      accountRepo.deleteAccount(account.userId, account.id),
    ).resolves.not.toThrow();
  });
});
