import { ITransactionService } from '../transactionService';
import { ITransactionRepo } from '../../repos/transactionRepo';
import { IAccountRepo } from '@Modules/BankAccounts/repos/accountRepo';
import { Transaction, BalanceUpdateInfo } from '@Shared/types';
import { TransactionInput } from '../../types/transaction.types';
import { RangeParams } from '@Shared/types';

export class TransactionService implements ITransactionService {
  private readonly transactionRepo: ITransactionRepo;
  private readonly accountRepo: IAccountRepo;

  constructor(transactionRepo: ITransactionRepo, accountRepo: IAccountRepo) {
    this.transactionRepo = transactionRepo;
    this.accountRepo = accountRepo;
  }

  public async findMany(userId: string): Promise<Transaction[]> {
    return await this.transactionRepo.findMany(userId);
  }

  public async findOne(id: string, userId: string): Promise<Transaction> {
    const transaction = await this.transactionRepo.findOne(id);

    if (!transaction) {
      throw new Error('No Transaction found');
    }

    if (transaction.userId !== userId) {
      throw new Error('Unauthorized');
    }

    return transaction;
  }

  public async createOne(
    input: TransactionInput,
    userId: string,
  ): Promise<Transaction> {
    const { type, amount, accountId } = input;
    const updateAccountInfo: BalanceUpdateInfo =
      type === 'INCOME' ? { increment: amount } : { decrement: amount };

    const [transaction, updateResuls] = await Promise.all([
      this.transactionRepo.createOne(input, userId),
      this.accountRepo.updateBalance(updateAccountInfo, accountId),
    ]);

    if (!updateResuls.success) {
      throw new Error(updateResuls.message);
    }

    return transaction;
  }

  public async deleteOne(id: string, userId: string): Promise<Transaction> {
    const transaction = await this.transactionRepo.findOne(id);

    if (!transaction) {
      throw new Error('No Transaction found by that ID');
    }

    if (transaction.userId !== userId) {
      throw new Error('Unauthorized');
    }

    const { isCashIn, amount, accountId } = transaction;
    const updateInfo: BalanceUpdateInfo = isCashIn
      ? { decrement: amount }
      : { increment: amount * -1 };

    const [updateResult, deletedTransaction] = await Promise.all([
      this.accountRepo.updateBalance(updateInfo, accountId!),
      this.transactionRepo.deleteOne(id),
    ]);

    if (!updateResult.success) {
      throw new Error(updateResult.message);
    }

    return deletedTransaction;
  }

  public async updateOne(
    input: TransactionInput,
    id: string,
    userId: string,
  ): Promise<Transaction> {
    await this.deleteOne(id, userId);
    const transaction = await this.createOne(input, userId);
    return transaction;
  }

  public async getRange(
    range: RangeParams,
    userId: string,
    accountId?: string,
  ): Promise<Transaction[]> {
    if (accountId) {
      return this.transactionRepo.getRangeForOneAccount(
        range,
        accountId,
        userId,
      );
    }

    return this.transactionRepo.getRangeForAllAccounts(range, userId);
  }
}
