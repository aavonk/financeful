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
    const transaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        payee: input.payee,
        amount: input.amount,
        description: input.description,
        date: new Date(input.date),
        type: input.type,
        accountId: input.accountId,
        categoryId: input.categoryId,
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
    return transaction;
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

    await prisma.transaction.delete({
      where: {
        id: transaction.id,
      },
    });
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
