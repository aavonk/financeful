import { Resolver, Query, Authorized, Ctx } from 'type-graphql';
import { User, Context } from '@Shared/types';

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => User)
  async getCurrentUser(@Ctx() { prisma, user }: Context): Promise<User | null> {
    const currentUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!currentUser) {
      throw new Error('No user found by that Id');
    }

    return currentUser;
  }
}
