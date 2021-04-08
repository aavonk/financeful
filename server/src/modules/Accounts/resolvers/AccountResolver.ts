import { Resolver, Authorized, Ctx, Query } from 'type-graphql';
import { Account, Context } from '@Shared/types';

@Resolver()
export class AccountResolver {
  @Authorized()
  @Query(() => [Account])
  async getAccounts(@Ctx() { prisma, user }: Context): Promise<Account[]> {
    const accounts: Account[] = await prisma.account.findMany({
      where: {
        userId: user.id,
      },
    });

    return accounts;
  }
}
