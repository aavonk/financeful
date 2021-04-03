import { nanoid } from 'nanoid';
import { Resolver, Authorized, Mutation, Ctx, Arg } from 'type-graphql';
import { Transaction } from '../../types/Transaction';
import { Account } from '../../types/Account';
import { Context } from '../../types/Context';
import { TransferInput } from './transaction.types';

@Resolver()
export class TransferResolver {
  @Authorized()
  @Mutation(() => [Transaction, Transaction])
  // @Mutation(() => [Account])
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
}
