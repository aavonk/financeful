import { Resolver, Authorized, Mutation, Ctx, Arg, Query } from 'type-graphql';
import { AuthenticationError, UserInputError } from 'apollo-server-express';
import { Transaction, Context } from '@Shared/types';
import {
  TransferInput,
  Transfer,
  TransferResult,
} from '../types/transfer.types';

@Resolver()
export class TransferResolver {
  @Authorized()
  @Mutation(() => TransferResult)
  async createTransfer(
    @Arg('input') input: TransferInput,
    @Ctx() { user, transferService }: Context,
  ): Promise<TransferResult> {
    if (!transferService.validateAccounts(input)) {
      return {
        error: {
          message: 'A transfer must be between two different accounts.',
        },
      };
    }
    const transactions = await transferService.createTransfer(input, user.id);
    return { transactions };
  }

  @Authorized()
  @Mutation(() => TransferResult)
  async updateTransfer(
    @Arg('transferId') transferId: string,
    @Arg('input') input: TransferInput,
    @Ctx() { user, transferService }: Context,
  ): Promise<TransferResult> {
    if (!transferService.validateAccounts(input)) {
      return {
        error: {
          message: 'A transfer must be between two different accounts.',
        },
      };
    }

    const transactions = await transferService.updateTransfer(
      input,
      transferId,
      user.id,
    );

    if (!transactions || transactions.length === 0) {
      throw new Error('Unable to create new transfer');
    }

    return { transactions };
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
      (transaction: Transaction) => transaction.userId,
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
