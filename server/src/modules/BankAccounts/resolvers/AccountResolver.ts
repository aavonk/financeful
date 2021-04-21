import {
  Resolver,
  Authorized,
  Ctx,
  Arg,
  Query,
  Mutation,
  ID,
} from 'type-graphql';
import { Account, Context } from '@Shared/types';
import {
  CreateAccountInput,
  EditAccountInput,
  AccountQueryFilters,
} from '../types/account.types';

@Resolver()
export class AccountResolver {
  @Authorized()
  @Query(() => [Account])
  async getAccounts(
    @Ctx() { user, accountRepo }: Context,
    @Arg('filter', { nullable: true }) filter?: AccountQueryFilters,
  ): Promise<Account[]> {
    const accounts = await accountRepo.getAccounts(user.id);

    if (filter?.isInactive) {
      return accounts.filter(
        (account: Account) => account.isInactive === false,
      );
    }
    return accounts;
  }

  @Authorized()
  @Mutation(() => Account)
  async createAccount(
    @Arg('input') input: CreateAccountInput,
    @Ctx() { accountRepo, user }: Context,
  ): Promise<Account> {
    return await accountRepo.createAccount(user.id, input);
  }

  @Authorized()
  @Mutation(() => Account)
  async editAccount(
    @Arg('input') input: EditAccountInput,
    @Arg('accountId') accountId: string,
    @Ctx() { accountRepo, user }: Context,
  ): Promise<Account> {
    return await accountRepo.editAccount(user.id, accountId, input);
  }

  @Authorized()
  @Mutation(() => Account)
  async toggleAccountActiveStatus(
    @Arg('accountId') accountId: string,
    @Ctx() { user, accountRepo }: Context,
  ): Promise<Account> {
    return await accountRepo.toggleAccountActiveStatus(user.id, accountId);
  }

  @Authorized()
  @Mutation(() => ID)
  async deleteAccount(
    @Arg('accountId') accountId: string,
    @Ctx() { user, accountRepo }: Context,
  ): Promise<string> {
    await accountRepo.deleteAccount(user.id, accountId);

    return 'Successfully deleted account.';
  }
}
