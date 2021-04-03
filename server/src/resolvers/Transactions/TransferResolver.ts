import { nanoid } from 'nanoid';
import { Resolver, Authorized, Mutation, Ctx, Arg } from 'type-graphql';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { Transaction } from '../../types/Transaction';
import { Account } from '../../types/Account';
import { Context } from '../../types/Context';
import { TransferInput } from './transaction.types';

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
    @Ctx() { user, prisma }: Context,
  ): Promise<string> {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
        transferId,
      },
    });

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

    await prisma.transaction.deleteMany({
      where: {
        userId: user.id,
        transferId,
      },
    });

    return 'Successfully Deleted Transfer';
  }
}
