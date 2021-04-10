import { Resolver, Mutation, Arg, Ctx, InputType, Field } from 'type-graphql';
import { UserInputError } from 'apollo-server-express';
import { User, Context } from '@Shared/types';
import { hashpashword, generateToken, validatePassword } from '@Lib/auth';
import { validateLoginInput, validateRegisterFields } from '@Lib/validators';

@InputType()
class RegisterInput {
  @Field(() => String)
  displayName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  passwordConfirmation: string;
}

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
    @Ctx() { prisma }: Context,
  ): Promise<User> {
    const { errors, valid } = validateRegisterFields(
      input.displayName,
      input.email,
      input.password,
      input.passwordConfirmation,
    );

    if (!valid) {
      throw new UserInputError('Invalid Data Provided', { errors });
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        email: input.email,
      },
    });

    if (existingUser) {
      throw new UserInputError(
        'There is already an account associated with this email address',
        {
          errors: {
            email: 'This email has an account',
          },
        },
      );
    }

    const hashedPassword = await hashpashword(input.password);
    const firstName = input.displayName.split(' ')[0];

    const newUser = await prisma.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
        displayName: input.displayName,
        firstName: firstName,
      },
    });

    const token = generateToken(newUser);

    return {
      ...newUser,
      token,
    };
  }
}
