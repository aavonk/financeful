import { Resolver, Mutation, Arg, Ctx, InputType, Field } from 'type-graphql';
import { UserInputError } from 'apollo-server-express';
import { User } from '../types/User';
import { Context } from '../types/Context';
import { hashpashword, generateToken, validatePassword } from '../lib/auth';
import { validateLoginInput, validateRegisterFields } from '../lib/validators';

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
    @Ctx() { prisma }: Context,
  ): Promise<User> {
    const { errors, valid } = validateLoginInput(email, password);

    if (!valid) {
      throw new UserInputError('Invalid Errors', { errors });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new Error('No account found by that email');
    }

    const match = validatePassword(password, user.password);

    if (!match) {
      throw new UserInputError('Invalid Credentials', {
        errors: {
          general: 'Invalid Credentials',
        },
      });
    }

    const token = generateToken(user);

    return {
      ...user,
      token,
    };
  }

  @Mutation(() => User)
  async register(
    @Arg('data') data: RegisterInput,
    @Ctx() { prisma }: Context,
  ): Promise<User> {
    const { errors, valid } = validateRegisterFields(
      data.displayName,
      data.email,
      data.password,
      data.passwordConfirmation,
    );

    if (!valid) {
      throw new UserInputError('Invalid Data Provided', { errors });
    }
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
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

    const hashedPassword = await hashpashword(data.password);
    const firstName = data.displayName.split(' ')[0];

    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        displayName: data.displayName,
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
