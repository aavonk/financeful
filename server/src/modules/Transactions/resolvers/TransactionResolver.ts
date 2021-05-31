import {
  Resolver,
  Authorized,
  Mutation,
  Ctx,
  Arg,
  Query,
  Int,
} from 'type-graphql';
import { Context, Transaction } from '@Shared/types';
import { TransactionInput } from '../types/transaction.types';
import { RangeParams } from '@Shared/types';
import { transactionService } from '../services';

@Resolver()
export class TransactionResolver {
  @Authorized()
  @Query(() => [Transaction], { nullable: true })
  async getTransactions(
    @Ctx() { user, services: { transactionService } }: Context,
  ): Promise<Transaction[]> {
    return await transactionService.findMany(user.id);
  }

  @Authorized()
  @Query(() => Transaction, { nullable: true })
  async getTransaction(
    @Arg('id') id: string,
    @Ctx() { user, services: { transactionService } }: Context,
  ): Promise<Transaction> {
    return await transactionService.findOne(id, user.id);
  }

  @Authorized()
  @Mutation(() => Transaction)
  async createTransaction(
    @Arg('input') input: TransactionInput,
    @Ctx() { user, services: { transactionService } }: Context,
  ): Promise<Transaction> {
    const transaction = await transactionService.createOne(input, user.id);

    return transaction;
  }

  @Authorized()
  @Mutation(() => String)
  async deleteTransaction(
    @Arg('id') id: string,
    @Ctx() { user, services: { transactionService } }: Context,
  ): Promise<string> {
    await transactionService.deleteOne(id, user.id);

    return 'Successfully removed';
  }

  @Authorized()
  @Mutation(() => Transaction)
  async updateTransaction(
    @Arg('id') id: string,
    @Arg('input') input: TransactionInput,
    @Ctx() { user, services: { transactionService } }: Context,
  ): Promise<Transaction> {
    return await transactionService.updateOne(input, id, user.id);
  }

  @Authorized()
  @Query(() => [Transaction])
  async getTransactionsRange(
    @Arg('input') input: RangeParams,
    @Arg('accountId', { nullable: true }) accountId: string,
    @Ctx() { user, services: { transactionService } }: Context,
  ): Promise<Transaction[]> {
    return await transactionService.getRange(input, user.id, accountId);
  }

  @Authorized()
  @Query(() => Int)
  async getUncategorizedLength(@Ctx() { user }: Context): Promise<number> {
    return await transactionService.getUncategorizedLength(user.id);
  }
}
