import { nanoid } from 'nanoid';
import { Resolver, Authorized, Mutation, Ctx, Arg, Query } from 'type-graphql';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { Transaction, Account, Context } from '@Shared/types';
import { TransferInput } from '../types/transfer.types';
import { Transfer } from '../types/transfer.types';

@Resolver()
export class TransferResolver {
  @Authorized()
  @Mutation(() => [Transaction, Transaction])
  async createTransfer(
    @Arg('input') input: TransferInput,
    @Ctx() { user, prisma }: Context,
  ): Promise<Transaction[]> {
    const accounts: Account[] = await prisma.account.findMany({
      where: {
        userId: user.id,
      },
    });

    const accountLeaving = accounts.filter(
      (account) => account.id === input.fromAccount,
    )[0];
    const accountArriving = accounts.filter(
      (account) => account.id === input.toAccount,
    )[0];

    const transferIdentifier = nanoid();

    const transactionWithMoneyLeaving = prisma.transaction.create({
      data: {
        date: input.date,
        payee: `Transfer to ${accountArriving.accountName}`,
        description: input.description || null,
        amount: input.amount * -1,
        type: 'TRANSFER',
        accountId: accountLeaving.id,
        userId: user.id,
        categoryId: input.categoryId || null,
        isCashIn: false,
        isCashOut: true,
        isTransfer: true,
        isUncategorized: !input.categoryId,
        transferId: transferIdentifier,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        account: {
          select: {
            accountName: true,
            id: true,
          },
        },
      },
    });

    const transactionWithMoneyArriving = prisma.transaction.create({
      data: {
        date: input.date,
        payee: `Transfer from ${accountLeaving.accountName}`,
        description: input.description || null,
        amount: input.amount,
        type: 'TRANSFER',
        accountId: accountArriving.id,
        userId: user.id,
        categoryId: input.categoryId || null,
        isCashIn: true,
        isCashOut: false,
        isTransfer: true,
        isUncategorized: !input.categoryId,
        transferId: transferIdentifier,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        account: {
          select: {
            accountName: true,
            id: true,
          },
        },
      },
    });

    const results = await prisma.$transaction([
      transactionWithMoneyLeaving,
      transactionWithMoneyArriving,
    ]);

    return results;
  }

  @Authorized()
  @Mutation(() => [Transaction, Transaction])
  async updateTransfer(
    @Arg('transferId') transferId: string,
    @Arg('input') input: TransferInput,
    @Ctx() context: Context,
  ): Promise<Transaction[]> {
    //delete the transactions with the incoming transferId and create a new Transfer
    const { prisma } = context;
    await prisma.transaction.deleteMany({
      where: {
        transferId: transferId,
      },
    });

    const transactions = await this.createTransfer(input, context);

    if (!transactions || transactions.length === 0) {
      throw new Error('Unable to create new transfer');
    }

    return transactions;
  }

  @Authorized()
  @Mutation(() => String)
  async deleteTransfer(
    @Arg('transferId') transferId: string,
    @Ctx() { user, transferService }: Context,
  ): Promise<string> {
    const transactions = await transferService.getTransferTransactions(
      transferId,
      user.id,
    );

    if (!transactions || !transactions.length) {
      throw new UserInputError('No transactions found', {
        transferId: 'Not valid',
      });
    }

    const transactionUser = transactions.map(
      (transaction) => transaction.userId,
    )[0];

    if (user.id !== transactionUser) {
      throw new AuthenticationError(
        'You are unauthorized to perform this action',
      );
    }

    await transferService.deleteTransfer(transferId, user.id);

    return 'Successfully Deleted Transfer';
  }

  @Authorized()
  @Query(() => Transfer)
  async getTransfer(
    @Arg('id') id: string,
    @Ctx() { transferService }: Context,
  ): Promise<Transfer> {
    const transfer: Transfer = await transferService.getTransfer(id);

    return transfer;
  }
}
