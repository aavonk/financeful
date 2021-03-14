import { Resolver, Query, Authorized, Ctx } from 'type-graphql';
import { User } from '../../types/User';
import { Context } from '../../types/Context';

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
