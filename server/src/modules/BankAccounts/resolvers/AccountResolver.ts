import { Resolver, Authorized, Ctx, Arg, Query, Mutation } from 'type-graphql';
import { Account, Context } from '@Shared/types';
import { CreateAccountInput, EditAccountInput } from '../types/account.types';

@Resolver()
export class AccountResolver {
  @Authorized()
  @Query(() => [Account])
  async getAccounts(@Ctx() { user, accountRepo }: Context): Promise<Account[]> {
    const accounts = accountRepo.getAccounts(user.id);
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
}
