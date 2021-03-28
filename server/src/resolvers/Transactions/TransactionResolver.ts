import { Resolver, Mutation, Authorized, Arg, Ctx, Query } from 'type-graphql';
import { AuthenticationError } from 'apollo-server-express';
import { TransactionInput, Updates } from './transaction.types';
import { Transaction } from '../../types/Transaction';
import { Context } from '../../types/Context';

@Resolver()
export class TransactionResolver {
  // ------ GET MANY TRANSACTIONS ------ //
  //TODO: Pagination
  @Authorized()
  @Query(() => [Transaction], { nullable: true })
  async getTransactions(
    @Ctx() { user, prisma }: Context,
  ): Promise<Transaction[]> {
    return await prisma.transaction.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        date: 'desc',
      },
      include: {
        account: {
          select: {
            accountName: true,
            id: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  // ------ GET ONE TRANSACTION ------ //
  @Authorized()
  @Query(() => Transaction, { nullable: true })
  async getTransaction(
    @Arg('id') id: string,
    @Ctx() { user, prisma }: Context,
  ): Promise<Transaction | null> {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: id,
      },
      include: {
        account: {
          select: {
            accountName: true,
            id: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!transaction) {
      throw new Error('No Transaction found by that ID');
    }

    if (transaction.userId !== user.id) {
      throw new AuthenticationError('Not authorized');
    }

    return transaction;
  }

  // ------ CREATE TRANSACTION ------ //
  @Authorized()
  @Mutation(() => Transaction)
  async createTransaction(
    @Arg('input') input: TransactionInput,
    @Ctx() { prisma, user }: Context,
  ): Promise<Transaction> {
    const account = await prisma.account.update({
      where: {
        id: input.accountId,
      },
      data: {
        balance:
          input.type === 'EXPENSE'
            ? { decrement: input.amount }
            : { increment: input.amount },
        transaction: {
          create: {
            userId: user.id,
            payee: input.payee,
            amount: input.amount,
            description: input.description,
            date: input.date,
            type: input.type,
            categoryId: input.categoryId ? input.categoryId : null,
            isCashIn: input.type === 'INCOME',
            isCashOut: input.type === 'EXPENSE',
            isUncategorized: !input.categoryId,
          },
        },
      },
      select: {
        transaction: {
          where: {
            date: input.date,
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
        },
      },
    });

    return account.transaction[0];
  }

  // ------ DELETE TRANSACTION ------ //
  @Authorized()
  @Mutation(() => String)
  async deleteTransaction(
    @Arg('id') id: string,
    @Ctx() { user, prisma }: Context,
  ): Promise<string> {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: id,
      },
    });

    if (transaction?.userId !== user.id) {
      throw new AuthenticationError('Unauthorized to perform this action');
    }

    const updateAccount = prisma.account.update({
      where: {
        id: transaction.accountId,
      },
      data: {
        balance:
          transaction.type === 'EXPENSE'
            ? { increment: transaction.amount }
            : { decrement: transaction.amount },
      },
    });

    const deleteTransaction = prisma.transaction.delete({
      where: {
        id: transaction.id,
      },
    });

    await prisma.$transaction([updateAccount, deleteTransaction]);
    return 'Successfully removed';
  }

  // ------ UPDATE TRANSACTION ------ //
  @Authorized()
  @Mutation(() => Transaction)
  async updateTransaction(
    @Arg('id') id: string,
    @Arg('input') input: Updates,
    @Ctx() { prisma, user }: Context,
  ): Promise<Transaction> {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: id,
      },
      include: {
        account: {
          select: {
            accountName: true,
            id: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!transaction) {
      throw new Error('Unable to find transaction');
    }

    if (transaction?.userId !== user.id) {
      throw new AuthenticationError('Unauthorized to perform this action');
    }

    //TODO: Check if the amount has changed (e.g. input.amount !== transaction.amount )
    // and if it has changed, then we need to update the account balance accordingly.

    // const updatedAccount = await prisma.account.update({
    //   where: {
    //     id: transaction.accountId
    //   },
    //   data: {
    //     balance: input.amount !== transaction.amount ?
    //   }
    // })

    const updatedTransaction = await prisma.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        ...input,
      },
    });

    return updatedTransaction;
  }
}
