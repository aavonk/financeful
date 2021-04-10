import { Resolver, Authorized, Ctx, Query } from 'type-graphql';
import { Account, Context } from '@Shared/types';

@Resolver()
export class AccountResolver {
  @Authorized()
  @Query(() => [Account])
  async getAccounts(@Ctx() { user, accountRepo }: Context): Promise<Account[]> {
    const accounts = accountRepo.getAccounts(user.id);
    return accounts;
  }
}
