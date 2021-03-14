import { Resolver, Query, Mutation, Authorized, Arg, Ctx } from 'type-graphql';
import { TransactionInput } from './transaction.types';
import { Transaction } from '../../types/Transaction';
import { Context } from '../../types/Context';

@Resolver()
export class TransactionResolver {
  @Authorized()
  @Mutation()
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
      },
    });
  }
}
