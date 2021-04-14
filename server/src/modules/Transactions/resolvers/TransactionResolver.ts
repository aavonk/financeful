import { Resolver, Authorized, Mutation, Ctx, Arg, Query } from 'type-graphql';
import { AuthenticationError } from 'apollo-server-express';
import { Context, Transaction } from '@Shared/types';
import { TransactionInput } from '../types/transaction.types';

@Resolver()
export class TransactionResolver {
  // ------ GET MANY TRANSACTIONS ------ //
  //TODO: Pagination
  @Authorized()
  @Query(() => [Transaction], { nullable: true })
  async getTransactions(
    @Ctx() { user, transactionRepo }: Context,
  ): Promise<Transaction[]> {
    return await transactionRepo.findMany(user.id);
  }

  // ------ GET ONE TRANSACTION ------ //
  @Authorized()
  @Query(() => Transaction, { nullable: true })
  async getTransaction(
    @Arg('id') id: string,
    @Ctx() { user, transactionRepo }: Context,
  ): Promise<Transaction | null> {
    const transaction = await transactionRepo.findOne(id);

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
    @Ctx() { user, transactionRepo }: Context,
  ): Promise<Transaction> {
    const transaction = await transactionRepo.createOne(input, user.id);

    return transaction;
  }

  // ------ DELETE TRANSACTION ------ //
  @Authorized()
  @Mutation(() => String)
  async deleteTransaction(
    @Arg('id') id: string,
    @Ctx() { user, transactionRepo }: Context,
  ): Promise<string> {
    await transactionRepo.deleteOne(id, user.id);

    return 'Successfully removed';
  }

  // ------ UPDATE TRANSACTION ------ //
  @Authorized()
  @Mutation(() => Transaction)
  async updateTransaction(
    @Arg('id') id: string,
    @Arg('input') input: TransactionInput,
    @Ctx() { user, transactionRepo }: Context,
  ): Promise<Transaction> {
    await transactionRepo.deleteOne(id, user.id);

    const newTransaction = await transactionRepo.createOne(input, user.id);

    return newTransaction;
  }
}
