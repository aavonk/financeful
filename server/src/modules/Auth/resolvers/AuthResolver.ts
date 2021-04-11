import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { User, Context } from '@Shared/types';
import { RegisterInput } from './types';

@Resolver()
export class AuthResolver {
  @Mutation(() => User)
  async login(
    @Arg('email', () => String) email: string,
    @Arg('password', () => String) password: string,
    @Ctx() { authRepo }: Context,
  ): Promise<User> {
    return await authRepo.handleLogin(email, password);
  }

  @Mutation(() => User)
  async register(
    @Arg('input') input: RegisterInput,
    @Ctx() { authRepo }: Context,
  ): Promise<User> {
    return await authRepo.handleRegister(input);
  }
}
