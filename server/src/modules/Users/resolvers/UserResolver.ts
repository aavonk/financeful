import { Resolver, Query, Authorized, Ctx } from 'type-graphql';
import { User, Context } from '@Shared/types';

@Resolver()
export class UserResolver {
  @Authorized()
  @Query(() => User)
  async getCurrentUser(
    @Ctx() { user, userRepo }: Context,
  ): Promise<User | null> {
    const currentUser = await userRepo.findOne(user.id);

    if (!currentUser) {
      throw new Error('No user found by that Id');
    }

    return currentUser;
  }
}
