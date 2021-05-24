import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import { User, Context } from '@Shared/types';
import { RegisterInput } from './types';

@Resolver()
export class AuthResolver {
  @Mutation(() => User)
  async login(
    @Arg('email', () => String) email: string,
    @Arg('password', () => String) password: string,
    @Ctx() { services: { authService } }: Context,
  ): Promise<User> {
    return await authService.handleLogin(email, password);
  }

  @Mutation(() => User)
  async register(
    @Arg('input') input: RegisterInput,
    @Ctx() { services: { authService } }: Context,
  ): Promise<User> {
    return await authService.handleRegister(input);
  }
}
